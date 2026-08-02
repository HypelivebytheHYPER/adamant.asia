#!/usr/bin/env node
/**
 * seo-check.mjs — Combined SEO health check (equivalent to the googleapis-mcp
 * SEO tools, but via our own working integration + public PageSpeed API).
 *
 *   GSC search performance  — totals + top queries + top pages (worldwide + SG)
 *   PageSpeed / Core Web Vitals — homepage, mobile (Lighthouse: perf/seo/a11y/bp)
 *
 *   node --env-file=.env.local scripts/seo-check.mjs
 *   PAGESPEED_KEY=<google-api-key> node --env-file=.env.local scripts/seo-check.mjs
 */

import { google } from "googleapis";

const SITE_URL = process.env.GSC_SITE_URL || "https://adamant.asia/";
const QUOTA = { headers: { "x-goog-user-project": process.env.GSC_QUOTA_PROJECT || "adamant-asia-seo" } };
const PAGESPEED_KEY = process.env.PAGESPEED_KEY || process.env.CLAUDE_KEYS_GOOGLE || "";

function buildAuth() {
  const { GSC_CLIENT_ID, GSC_CLIENT_SECRET, GSC_REFRESH_TOKEN } = process.env;
  if (!(GSC_CLIENT_ID && GSC_CLIENT_SECRET && GSC_REFRESH_TOKEN)) {
    console.error("✗ Missing GSC_CLIENT_ID/SECRET/REFRESH_TOKEN");
    process.exit(1);
  }
  const o = new google.auth.OAuth2(GSC_CLIENT_ID, GSC_CLIENT_SECRET);
  o.setCredentials({ refresh_token: GSC_REFRESH_TOKEN });
  return o;
}
const wm = google.webmasters({ version: "v3", auth: buildAuth() });

const fmt = (d) => d.toISOString().slice(0, 10);
const range = (days) => {
  const end = new Date();
  const start = new Date(end.getTime() - days * 86_400_000);
  return { startDate: fmt(start), endDate: fmt(end) };
};

async function query(body) {
  const res = await wm.searchanalytics.query({ siteUrl: SITE_URL, requestBody: body }, QUOTA);
  return res.data.rows ?? [];
}

async function searchPerformance() {
  const { startDate, endDate } = range(28);
  console.log(`\n  ── GSC Search Performance (last 28 days) ──`);

  const totalsAll = (await query({ startDate, endDate, dimensions: [] }))[0];
  const totalsSG = (await query({
    startDate, endDate, dimensions: [],
    dimensionFilterGroups: [{ filters: [{ dimension: "country", expression: "sgp" }] }],
  }))[0];
  const line = (t) => t
    ? `clicks ${t.clicks}  impressions ${t.impressions}  CTR ${(t.ctr * 100).toFixed(1)}%  avg pos ${t.position.toFixed(1)}`
    : "no data";
  console.log(`  Worldwide : ${line(totalsAll)}`);
  console.log(`  Singapore : ${line(totalsSG)}`);

  const queries = await query({ startDate, endDate, dimensions: ["query"], rowLimit: 10 });
  console.log(`\n  Top queries (worldwide): ${queries.length || "none yet"}`);
  for (const r of queries) console.log(`    "${r.keys[0]}"  impr ${r.impressions}  clicks ${r.clicks}  pos ${r.position.toFixed(1)}`);

  const pages = await query({ startDate, endDate, dimensions: ["page"], rowLimit: 10 });
  console.log(`\n  Top pages (worldwide): ${pages.length || "none yet"}`);
  for (const r of pages) console.log(`    ${r.keys[0].replace("https://adamant.asia", "") || "/"}  impr ${r.impressions}  clicks ${r.clicks}`);
}

async function pageSpeed() {
  console.log(`\n  ── PageSpeed / Core Web Vitals (homepage, mobile) ──`);
  const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  api.searchParams.set("url", "https://adamant.asia/");
  api.searchParams.set("strategy", "mobile");
  for (const c of ["performance", "seo", "accessibility", "best-practices"]) api.searchParams.append("category", c);
  if (PAGESPEED_KEY) api.searchParams.set("key", PAGESPEED_KEY);

  const res = await fetch(api, { signal: AbortSignal.timeout(120_000) });
  if (!res.ok) {
    console.log(`  ⚠ PageSpeed API ${res.status} ${res.statusText} (try PAGESPEED_KEY=<google api key>)`);
    return;
  }
  const data = await res.json();
  const cat = data.lighthouseResult?.categories ?? {};
  const score = (c) => (c?.score == null ? "—" : Math.round(c.score * 100));
  console.log(`  Lighthouse: performance ${score(cat.performance)}  SEO ${score(cat.seo)}  a11y ${score(cat.accessibility)}  best-practices ${score(cat["best-practices"])}`);
  const audits = data.lighthouseResult?.audits ?? {};
  const m = (id) => audits[id]?.displayValue ?? "—";
  console.log(`  Core Web Vitals (lab): LCP ${m("largest-contentful-paint")}  CLS ${m("cumulative-layout-shift")}  TBT ${m("total-blocking-time")}  FCP ${m("first-contentful-paint")}`);
}

async function main() {
  console.log(`\n  SEO CHECK — ${SITE_URL}`);
  await searchPerformance();
  await pageSpeed();
  console.log(`\n  (Technical crawl audit: scripts/seo-audit.mjs · Index status: scripts/gsc-inspect.mjs)\n`);
}

main().catch((e) => {
  console.error("\n  seo-check failed:", e?.errors?.[0]?.message ?? e.message, "\n");
  process.exit(1);
});
