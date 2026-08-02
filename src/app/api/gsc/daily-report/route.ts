/**
 * GET /api/gsc/daily-report
 *
 * Daily GSC performance summary delivered to Telegram.
 * Triggered by Vercel Cron every morning.
 *
 * Auth: Authorization: Bearer <CRON_SECRET>
 *
 * Env:
 *   CRON_SECRET              — shared secret with Vercel Cron
 *   TELEGRAM_BOT_TOKEN       — Telegram bot token
 *   TELEGRAM_CHAT_ID         — destination chat ID
 *   GSC_CLIENT_ID/SECRET/REFRESH_TOKEN, GSC_QUOTA_PROJECT, GSC_SITE_URL
 */

import { NextRequest, NextResponse } from "next/server";
import { getSearchAnalytics, getSingaporeSummary } from "@/lib/gsc-api";
import { sendTelegramMessage, formatGscDailyReport } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MS_PER_DAY = 86_400_000;
const REPORT_DAYS = 7;

interface Summary {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface QueryRow {
  keys: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
}

function dateRange(days: number, endOffsetDays = 0): { startDate: string; endDate: string } {
  const end = new Date(Date.now() - endOffsetDays * MS_PER_DAY);
  const start = new Date(end.getTime() - (days - 1) * MS_PER_DAY);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

function toSummary(rows: unknown[]): Summary {
  const row = rows[0] as Summary | undefined;
  return {
    clicks: row?.clicks ?? 0,
    impressions: row?.impressions ?? 0,
    ctr: row?.ctr ?? 0,
    position: row?.position ?? 0,
  };
}

async function fetchWorldwide(days: number, endOffsetDays = 0): Promise<Summary> {
  const { startDate, endDate } = dateRange(days, endOffsetDays);
  const rows = await getSearchAnalytics(startDate, endDate, [], 1, null);
  return toSummary(rows);
}

async function fetchTopQueries(days: number, endOffsetDays = 0) {
  const { startDate, endDate } = dateRange(days, endOffsetDays);
  const rows = (await getSearchAnalytics(startDate, endDate, ["query"], 5, null)) as QueryRow[];
  return rows.map((r) => ({
    query: r.keys[0] ?? "(not set)",
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    position: r.position ?? 0,
  }));
}

async function fetchTopPages(days: number, endOffsetDays = 0) {
  const { startDate, endDate } = dateRange(days, endOffsetDays);
  const rows = (await getSearchAnalytics(startDate, endDate, ["page"], 5, null)) as QueryRow[];
  return rows.map((r) => ({
    path: (r.keys[0] ?? "").replace("https://adamant.asia", "") || "/",
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
  }));
}

export async function GET(req: NextRequest) {
  const expected = process.env.CRON_SECRET;
  const provided = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!expected || provided !== expected) {
    return NextResponse.json({ success: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const [worldwide, prevWorldwide, singapore, topQueries, topPages] = await Promise.all([
      fetchWorldwide(REPORT_DAYS),
      fetchWorldwide(REPORT_DAYS, REPORT_DAYS),
      getSingaporeSummary(REPORT_DAYS),
      fetchTopQueries(REPORT_DAYS),
      fetchTopPages(REPORT_DAYS),
    ]);

    const { startDate, endDate } = dateRange(REPORT_DAYS);
    const message = formatGscDailyReport({
      period: `${startDate} → ${endDate}`,
      worldwide,
      singapore,
      prevWorldwide,
      topQueries,
      topPages,
    });

    const ok = await sendTelegramMessage(message);

    return NextResponse.json({
      success: ok,
      period: `${startDate} → ${endDate}`,
      clicks: worldwide.clicks,
      impressions: worldwide.impressions,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
