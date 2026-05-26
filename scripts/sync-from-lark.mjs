#!/usr/bin/env node
/**
 * sync-from-lark.mjs — Build-time sync script
 *
 * Pulls all content tables from the adamant Project Lark Base
 * and regenerates src/data/content.ts.
 *
 * Supports TWO auth modes:
 *   1. lark-cli subprocess  (local dev — uses your CLI auth)
 *   2. Lark REST API        (CI/CD — uses LARK_APP_ID + LARK_APP_SECRET)
 *
 * Usage:
 *   MODE=cli   node scripts/sync-from-lark.mjs   (default, uses lark-cli)
 *   MODE=api   node scripts/sync-from-lark.mjs   (uses LARK_APP_ID + LARK_APP_SECRET)
 *
 * Environment:
 *   LARK_BASE_TOKEN       — Base token (default: XY8IbUHh3aNI2AsWI0tl0YllgSd)
 *   LARK_CLI_PATH         — lark-cli binary path (default: lark-cli)
 *   LARK_APP_ID           — Lark app ID (for API mode)
 *   LARK_APP_SECRET       — Lark app secret (for API mode)
 */
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

/* ── Resolve project root ─────────────────────────────────── */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_TOKEN = process.env.LARK_BASE_TOKEN || "XY8IbUHh3aNI2AsWI0tl0YllgSd";
const MODE = process.env.MODE || "cli";

/* ── Mode 1: lark-cli subprocess ──────────────────────────── */
function larkCli(...args) {
  const cmd = `${process.env.LARK_CLI_PATH || "lark-cli"} ${args.join(" ")}`;
  const out = execSync(cmd, { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] });
  const parsed = JSON.parse(out);
  if (!parsed.ok) {
    throw new Error(`Lark CLI error: ${JSON.stringify(parsed.error)}`);
  }
  return parsed;
}

function getRecordsViaCLI(tableId, limit = 200) {
  const res = larkCli(
    "base", "+record-list",
    "--base-token", BASE_TOKEN,
    "--table-id", tableId,
    "--limit", String(limit),
    "--format", "json"
  );
  // Shortcut read format: { data: { data: [...rows], fields: [...names], record_id_list: [...] } }
  const rows = res.data?.data || [];
  const headers = res.data?.fields || [];
  return rows.map((row) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = row[i] ?? null;
    });
    return obj;
  });
}

/* ── Mode 2: Lark REST API (async) ────────────────────────── */
async function getTokenViaAPI() {
  const appId = process.env.LARK_APP_ID;
  const appSecret = process.env.LARK_APP_SECRET;
  if (!appId || !appSecret) {
    throw new Error("LARK_APP_ID and LARK_APP_SECRET required for API mode");
  }
  const res = await fetch("https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
  });
  const data = await res.json();
  if (data.code !== 0) throw new Error(`Auth failed: ${data.msg}`);
  return data.tenant_access_token;
}

async function getRecordsViaAPI(token, tableId) {
  const records = [];
  let pageToken;
  do {
    const params = new URLSearchParams({ page_size: "500" });
    if (pageToken) params.set("page_token", pageToken);

    const res = await fetch(
      `https://open.larksuite.com/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${tableId}/records?${params}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    if (data.code !== 0) throw new Error(`API error: ${data.msg}`);
    records.push(...(data.data?.items || []).map((i) => i.fields));
    pageToken = data.data?.has_more ? data.data.page_token : undefined;
  } while (pageToken);
  return records;
}

/* Table IDs (stable across renames) */
const TABLES = {
  sections:     "tblSpL711EZgaBT8",
  testimonials: "tblCcDZ0oMr1bxZf",
  stats:        "tblvXVoKpAzZTf7l",
  phases:       "tbl3RHZEMfmDsVYs",
  beforeAfter:  "tbltmfSVxjSY0qjv",
  notifications:"tblWhVnoj6j4Bj22",
  marqueeItems: "tblkG26GcaMjBxQY",
};

/* ── Fetch dispatcher ─────────────────────────────────────── */
async function fetchAll() {
  if (MODE === "api") {
    console.log("🔌 Using Lark REST API mode…");
    const token = await getTokenViaAPI();
    return {
      sections: await getRecordsViaAPI(token, TABLES.sections),
      testimonials: await getRecordsViaAPI(token, TABLES.testimonials),
      stats: await getRecordsViaAPI(token, TABLES.stats),
      phases: await getRecordsViaAPI(token, TABLES.phases),
      beforeAfter: await getRecordsViaAPI(token, TABLES.beforeAfter),
      notifications: await getRecordsViaAPI(token, TABLES.notifications),
      marqueeItems: await getRecordsViaAPI(token, TABLES.marqueeItems),
    };
  }

  console.log("🔌 Using lark-cli subprocess mode…");
  return {
    sections: getRecordsViaCLI(TABLES.sections),
    testimonials: getRecordsViaCLI(TABLES.testimonials),
    stats: getRecordsViaCLI(TABLES.stats),
    phases: getRecordsViaCLI(TABLES.phases),
    beforeAfter: getRecordsViaCLI(TABLES.beforeAfter),
    notifications: getRecordsViaCLI(TABLES.notifications),
    marqueeItems: getRecordsViaCLI(TABLES.marqueeItems),
  };
}

/* ── Normalise helpers ────────────────────────────────────── */
function toBool(v) { return v === true || v === "true"; }

/* ── Main ─────────────────────────────────────────────────── */
const data = await fetchAll();

const sections = Object.fromEntries(
  data.sections.map((r) => [
    r["Section ID"],
    {
      id: r["Section ID"] || "",
      headline: r.Headline || "",
      subheadline: r.Subheadline || undefined,
      body: r.Body || undefined,
      ctaText: r["CTA Text"] || undefined,
      ctaLink: r["CTA Link"] || undefined,
      enabled: toBool(r.Enabled),
    },
  ])
);

const sortByOrder = (a, b) => (a.Order || 0) - (b.Order || 0);

const testimonials = data.testimonials.sort(sortByOrder).map((r) => ({
  name: r.Name || "",
  industry: r.Industry || "",
  location: r.Location || "",
  before: r.Before || "",
  after: r.After || "",
  quote: r.Quote || "",
}));

const stats = data.stats.sort(sortByOrder).map((r) => ({
  value: r.Value || "",
  label: r.Label || "",
}));

const processPhases = data.phases.sort(sortByOrder).map((r) => ({
  num: r.Number || "",
  title: r.Title || "",
  detail: r.Detail || "",
  icon: r["Icon Name"] || "",
}));

const beforeAfter = data.beforeAfter.sort(sortByOrder).map((r) => ({
  before: r.Before || "",
  after: r.After || "",
}));

const notifications = data.notifications.sort(sortByOrder).map((r) => ({
  label: r.Label || "",
  msg: r.Message || "",
  time: r.Time || "",
  icon: r.Icon || "",
  color: r.Color || "",
}));

const marqueeItems = data.marqueeItems.sort(sortByOrder).map((r) => ({
  text: r.Text || "",
  isSeparator: toBool(r["Is Separator"]),
}));

/* ── Generate content.ts ──────────────────────────────────── */
const header = `// AUTO-GENERATED by scripts/sync-from-lark.mjs
// Do not edit manually. Edit in Lark Base and run \`npm run sync\`.
`;

const types = `
export interface SectionContent {
  id: string;
  headline: string;
  subheadline?: string;
  body?: string;
  ctaText?: string;
  ctaLink?: string;
  enabled: boolean;
}

export interface TestimonialContent {
  name: string;
  industry: string;
  location: string;
  before: string;
  after: string;
  quote: string;
}

export interface StatContent {
  value: string;
  label: string;
}

export interface ProcessPhaseContent {
  num: string;
  title: string;
  detail: string;
  icon: string;
}

export interface BeforeAfterContent {
  before: string;
  after: string;
}

export interface NotificationContent {
  label: string;
  msg: string;
  time: string;
  icon: string;
  color: string;
}

export interface MarqueeItemContent {
  text: string;
  isSeparator: boolean;
}

export interface NavLinkContent {
  label: string;
  href: string;
}

export interface ContactInfoContent {
  email: string;
  location: string;
}
`;

function stringify(val) {
  return JSON.stringify(val, null, 2);
}

const body = `
export const siteContent = {
  sections: ${stringify(sections)} as Record<string, SectionContent>,

  testimonials: ${stringify(testimonials)} satisfies TestimonialContent[],

  stats: ${stringify(stats)} satisfies StatContent[],

  processPhases: ${stringify(processPhases)} satisfies ProcessPhaseContent[],

  beforeAfter: ${stringify(beforeAfter)} satisfies BeforeAfterContent[],

  notifications: ${stringify(notifications)} satisfies NotificationContent[],

  marqueeItems: ${stringify(marqueeItems)} satisfies MarqueeItemContent[],

  navLinks: [
    { label: "Home", href: "#main" },
    { label: "Problem", href: "#problem" },
    { label: "Process", href: "#process" },
    { label: "Proof", href: "#proof" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavLinkContent[],

  contactInfo: {
    email: "hello@adamant.asia",
    location: "Bangkok & Singapore",
  } satisfies ContactInfoContent,

  footerNavLinks: [
    { label: "Home", href: "#main" },
    { label: "Problem", href: "#problem" },
    { label: "Process", href: "#process" },
    { label: "Proof", href: "#proof" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavLinkContent[],

  pipelineNodes: [
    { id: "map", label: "Map" },
    { id: "design", label: "Design" },
    { id: "build", label: "Build" },
    { id: "handover", label: "Run" },
  ] satisfies { id: string; label: string }[],
};
`;

const outPath = join(__dirname, "..", "src", "data", "content.ts");
writeFileSync(outPath, header + types + body, "utf-8");

console.log(`✅ Synced ${data.sections.length} sections, ${data.testimonials.length} testimonials, ${data.stats.length} stats, ${data.phases.length} phases, ${data.beforeAfter.length} before-after rows, ${data.notifications.length} notifications, ${data.marqueeItems.length} marquee items`);
console.log(`📄 Written to ${outPath}`);
