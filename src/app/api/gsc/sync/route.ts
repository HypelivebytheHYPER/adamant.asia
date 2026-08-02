/**
 * /api/gsc/sync — Daily GSC → Lark "Keyword Daily" sync.
 *
 * Driven by the Lark scheduled workflow (TimerTrigger → HTTPClientAction).
 * Pulls one finalized day of Search Console query data, categorizes each query
 * against the "Keywords" master (auto-adding unknowns as inactive for review),
 * and appends linked rows to the "Keyword Daily" fact table.
 *
 * Auth: header `x-sync-secret` (or `?secret=`) must equal env GSC_SYNC_SECRET.
 *
 * Env:
 *   GSC_SYNC_SECRET        — shared secret with the Lark workflow
 *   GSC_CLIENT_ID/SECRET/REFRESH_TOKEN, GSC_QUOTA_PROJECT, GSC_SITE_URL — see gsc-api.ts
 *   LARK_APP_ID + LARK_APP_SECRET — Lark Base write (app must be a Base collaborator)
 *   GSC_KW_BASE_TOKEN      — Base app token (falls back to LARK_BASE_APP_TOKEN)
 *   GSC_KW_TABLE_ID        — Keywords master table id   (required)
 *   GSC_DAILY_TABLE_ID     — Keyword Daily fact table id (required)
 *   GSC_SITE_URL, GSC_QUOTA_PROJECT — required (no defaults)
 */

import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { authFromEnv, BitableClient, type LarkRecord } from "@/lib/lark-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface SyncConfig {
  baseToken: string;
  kwTable: string;
  dailyTable: string;
  siteUrl: string;
  quotaProject: string;
}

/** Read all config from env. No hardcoded values — throws listing any missing keys. */
function loadConfig(): SyncConfig {
  const missing: string[] = [];
  const get = (name: string, fallbackEnv?: string): string => {
    const v = process.env[name] || (fallbackEnv ? process.env[fallbackEnv] : "") || "";
    if (!v) missing.push(fallbackEnv ? `${name} (or ${fallbackEnv})` : name);
    return v;
  };
  const cfg: SyncConfig = {
    baseToken: get("GSC_KW_BASE_TOKEN", "LARK_BASE_APP_TOKEN"),
    kwTable: get("GSC_KW_TABLE_ID"),
    dailyTable: get("GSC_DAILY_TABLE_ID"),
    siteUrl: get("GSC_SITE_URL"),
    quotaProject: get("GSC_QUOTA_PROJECT"),
  };
  if (missing.length) throw new Error(`Missing required env: ${missing.join(", ")}`);
  return cfg;
}

// ─── GSC: pull one day of query rows ─────────────────────────────────────────
function gscClient() {
  const oauth2 = new google.auth.OAuth2(
    process.env.GSC_CLIENT_ID,
    process.env.GSC_CLIENT_SECRET
  );
  oauth2.setCredentials({ refresh_token: process.env.GSC_REFRESH_TOKEN });
  return google.webmasters({ version: "v3", auth: oauth2 });
}

interface QueryRow {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

async function pullDay(day: string, cfg: SyncConfig): Promise<QueryRow[]> {
  const wm = gscClient();
  const res = await wm.searchanalytics.query(
    {
      siteUrl: cfg.siteUrl,
      requestBody: { startDate: day, endDate: day, dimensions: ["query"], rowLimit: 250 },
    },
    { headers: { "x-goog-user-project": cfg.quotaProject } }
  );
  return (res.data.rows ?? []).map((r) => ({
    query: r.keys?.[0] ?? "",
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: r.ctr ?? 0,
    position: r.position ?? 0,
  }));
}

// ─── Auto-categorization for queries not yet in the master ───────────────────
function categorize(q: string): { category: string; market: string; relevance: string; active: boolean } {
  const k = q.toLowerCase();
  if (/(meaning|malayalam|definition|synonym|antonym|stone|in hindi|in tamil)/.test(k))
    return { category: "Noise", market: "Global", relevance: "Noise", active: false };
  if (/\badamant\b/.test(k) && /(asia|\.asia|project)/.test(k))
    return { category: "Brand-Core", market: "Global", relevance: "Relevant", active: true };
  if (/\badamant\b/.test(k) && /(agency|marketing|build|saas|studio|web|digital)/.test(k))
    return { category: "Brand-Modifier", market: "Global", relevance: "Relevant", active: true };
  if (/^adamant$/.test(k.trim()))
    return { category: "Generic-Ambiguous", market: "Global", relevance: "Ambiguous", active: true };
  const market = /singapore|\bsg\b/.test(k) ? "SG" : /thailand|bangkok|\bth\b/.test(k) ? "TH" : "Global";
  if (/(agency|saas|build|automation|development|app|software|tool|marketing)/.test(k))
    return { category: "Target-Commercial", market, relevance: "Relevant", active: false };
  return { category: "Generic-Ambiguous", market, relevance: "Ambiguous", active: false };
}

const norm = (s: string) => s.trim().toLowerCase();

export async function POST(req: NextRequest) {
  return handle(req);
}
export async function GET(req: NextRequest) {
  return handle(req);
}

async function handle(req: NextRequest) {
  // 1. Auth
  const secret = process.env.GSC_SYNC_SECRET;
  const provided = req.headers.get("x-sync-secret") || req.nextUrl.searchParams.get("secret");
  if (!secret || provided !== secret) {
    return NextResponse.json({ success: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const cfg = loadConfig();

    // 2. Target day: most recent finalized GSC day (≈ today − 3, allows for data lag).
    //    Overridable with ?day=YYYY-MM-DD.
    const override = req.nextUrl.searchParams.get("day");
    const d = new Date(Date.now() - 3 * 86_400_000);
    const day = override || d.toISOString().slice(0, 10);

    // 3. Pull GSC + load Keywords master
    const [rows, auth] = await Promise.all([pullDay(day, cfg), authFromEnv()]);
    const bt = new BitableClient(auth);
    const masters: LarkRecord[] = await bt.listRecords(cfg.baseToken, cfg.kwTable);
    const byKeyword = new Map<string, string>(); // normalized keyword → record_id
    for (const m of masters) {
      const kw = typeof m.fields.Keyword === "string" ? m.fields.Keyword : "";
      if (kw) byKeyword.set(norm(kw), m.record_id);
    }

    // 4. Ensure every query has a master record (auto-add unknowns as inactive)
    const newKeywords: string[] = [];
    for (const r of rows) {
      if (!r.query || byKeyword.has(norm(r.query))) continue;
      const c = categorize(r.query);
      const created = await bt.batchCreateRecords(cfg.baseToken, cfg.kwTable, [
        {
          fields: {
            Keyword: r.query,
            Category: c.category,
            Market: c.market,
            Relevance: c.relevance,
            Active: c.active,
            Notes: `Auto-added by /api/gsc/sync on ${day}`,
          },
        },
      ]);
      byKeyword.set(norm(r.query), created[0].record_id);
      newKeywords.push(r.query);
    }

    // 5. Upsert daily fact rows — idempotent: update existing (day,keyword), create new.
    //    Re-runs/retries for the same day overwrite instead of duplicating.
    const dayMs = Date.parse(`${day}T00:00:00Z`);

    // Rows already recorded for this day (matched on the unique "day · keyword" Snapshot).
    const existing = await bt.searchRecords(cfg.baseToken, cfg.dailyTable, {
      filter: { conjunction: "and", conditions: [{ field_name: "Snapshot", operator: "contains", value: [day] }] },
      field_names: ["Snapshot"],
      page_size: 500,
    });
    const idBySnapshot = new Map<string, string>();
    for (const rec of existing.items ?? []) {
      const snap = typeof rec.fields.Snapshot === "string" ? rec.fields.Snapshot : "";
      if (snap) idBySnapshot.set(snap, rec.record_id);
    }

    const toCreate: Array<{ fields: Record<string, unknown> }> = [];
    const toUpdate: Array<{ record_id: string; fields: Record<string, unknown> }> = [];
    for (const r of rows) {
      if (!r.query || !byKeyword.has(norm(r.query))) continue;
      const snapshot = `${day} · ${r.query}`;
      const fields: Record<string, unknown> = {
        Snapshot: snapshot,
        Date: dayMs,
        Keyword: [byKeyword.get(norm(r.query))!],
        Clicks: r.clicks,
        Impressions: r.impressions,
        CTR: r.ctr,
        Position: Math.round(r.position * 10) / 10,
      };
      const existingId = idBySnapshot.get(snapshot);
      if (existingId) toUpdate.push({ record_id: existingId, fields });
      else toCreate.push({ fields });
    }

    let created = 0;
    for (let i = 0; i < toCreate.length; i += 200) {
      const res = await bt.batchCreateRecords(cfg.baseToken, cfg.dailyTable, toCreate.slice(i, i + 200));
      created += res.length;
    }
    let updated = 0;
    for (let i = 0; i < toUpdate.length; i += 200) {
      const res = await bt.batchUpdateRecords(cfg.baseToken, cfg.dailyTable, toUpdate.slice(i, i + 200));
      updated += res.length;
    }

    return NextResponse.json({
      success: true,
      day,
      queries: rows.length,
      created,
      updated,
      new_keywords: newKeywords,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
