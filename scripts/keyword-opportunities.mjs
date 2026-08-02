#!/usr/bin/env node
/**
 * keyword-opportunities.mjs — GSC-based keyword research + page mapping.
 *
 * Pulls the last 90 days of Search Console query and page data, then surfaces
 * keyword opportunities and suggests which Adamant page each cluster should target.
 *
 *   node --env-file=.env.local scripts/keyword-opportunities.mjs
 */

import { google } from "googleapis";

const SITE_URL = process.env.GSC_SITE_URL || "https://adamant.asia/";
const QUOTA_PROJECT = process.env.GSC_QUOTA_PROJECT || "adamant-gsc-prod";
const QUOTA = { headers: { "x-goog-user-project": QUOTA_PROJECT } };
const DAYS = 90;

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

function categorize(q) {
  const k = q.toLowerCase();
  if (/(meaning|malayalam|definition|synonym|antonym|stone|in hindi|in tamil|in bengali)/.test(k))
    return "Noise";
  if (/\badamant\b/.test(k) && /(asia|\.asia|project)/.test(k)) return "Brand-Core";
  if (/\badamant\b/.test(k) && /(agency|marketing|build|saas|studio|web|digital)/.test(k))
    return "Brand-Modifier";
  if (/^adamant$/.test(k.trim())) return "Generic-Ambiguous";
  if (/(agency|saas|build|automation|development|app|software|tool|marketing)/.test(k))
    return "Target-Commercial";
  return "Generic-Ambiguous";
}

function intentPage(q) {
  const k = q.toLowerCase();

  // Verify / KYC / due diligence
  if (/(kyc|kyb|aml|due diligence|background check|verify|verification|screening|compliance|pdpa|counterparty)/.test(k))
    return "/verify";

  // AI / SaaS / automation
  if (/(saas|ai agency|ai workflow|automation|custom tool|mini build|software|app development|no code|build in two weeks)/.test(k))
    return "/ai";

  // Marketing / KOL / influencer
  if (/(marketing|kol|influencer|campaign|creator|leaderboard|pipeline|performance tracking)/.test(k))
    return "/ai";

  // Pricing
  if (/(price|cost|fee|pricing|how much|quote)/.test(k)) return "/pricing";

  // Founder / about / team
  if (/(founder|about|team|who is|sam)/.test(k)) return "/founder";

  // Case studies / insights
  if (/(case study|case studies|blog|insights|example|portfolio)/.test(k)) return "/case-studies";

  // Contact
  if (/(contact|reach|enquire|consultation)/.test(k)) return "/contact";

  // Brand-generic
  if (/\badamant\b/.test(k) && /(agency|asia|project|verify|ai)/.test(k)) return "/";

  return "/";
}

async function main() {
  const { startDate, endDate } = range(DAYS);
  console.log(`\n  Keyword Opportunities — ${SITE_URL} (${startDate} → ${endDate})\n`);

  const [queries, pages] = await Promise.all([
    query({ startDate, endDate, dimensions: ["query"], rowLimit: 250 }),
    query({ startDate, endDate, dimensions: ["page"], rowLimit: 100 }),
  ]);

  const categorized = queries.map((r) => ({
    query: r.keys[0],
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: r.ctr ?? 0,
    position: r.position ?? 0,
    category: categorize(r.keys[0]),
    targetPage: intentPage(r.keys[0]),
  }));

  // High-impression, low-CTR opportunities (position 6-30)
  const opportunities = categorized
    .filter((r) => r.impressions >= 3 && r.position >= 6 && r.position <= 30)
    .filter((r) => r.category !== "Noise")
    .sort((a, b) => b.impressions - a.impressions);

  // Already-ranking well (position 1-10)
  const winners = categorized
    .filter((r) => r.position <= 10 && r.clicks > 0)
    .filter((r) => r.category !== "Noise")
    .sort((a, b) => b.clicks - a.clicks);

  // Top pages
  const topPages = pages
    .map((r) => ({
      path: r.keys[0].replace("https://adamant.asia", "") || "/",
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
    }))
    .sort((a, b) => b.clicks - a.clicks);

  console.log(`  Total queries: ${queries.length}`);
  console.log(`  Categorized:`);
  const byCat = Object.fromEntries(
    ["Brand-Core", "Brand-Modifier", "Target-Commercial", "Generic-Ambiguous", "Noise"].map((c) => [
      c,
      categorized.filter((r) => r.category === c).length,
    ])
  );
  for (const [cat, count] of Object.entries(byCat)) console.log(`    ${cat}: ${count}`);

  console.log(`\n  ── Top 10 opportunities (impressions ↑, position 6-30) ──`);
  for (const r of opportunities.slice(0, 10)) {
    console.log(
      `    ${r.query.padEnd(40)} impr:${String(r.impressions).padStart(4)} pos:${r.position.toFixed(1)} CTR:${(r.ctr * 100).toFixed(1)}% → ${r.targetPage}`
    );
  }

  console.log(`\n  ── Top 10 already ranking (position 1-10) ──`);
  for (const r of winners.slice(0, 10)) {
    console.log(
      `    ${r.query.padEnd(40)} clicks:${String(r.clicks).padStart(3)} pos:${r.position.toFixed(1)} → ${r.targetPage}`
    );
  }

  console.log(`\n  ── Top 10 pages by clicks ──`);
  for (const p of topPages.slice(0, 10)) {
    console.log(`    ${p.path.padEnd(35)} clicks:${String(p.clicks).padStart(3)} impr:${p.impressions}`);
  }

  // Page-level keyword clusters
  console.log(`\n  ── Suggested keyword clusters by page ──`);
  const clusters = {};
  for (const r of categorized.filter((r) => r.category !== "Noise" && r.impressions >= 2)) {
    clusters[r.targetPage] = clusters[r.targetPage] || [];
    clusters[r.targetPage].push(r);
  }
  for (const [page, rows] of Object.entries(clusters).sort((a, b) => b[1].length - a[1].length)) {
    const sorted = rows.sort((a, b) => b.impressions - a.impressions).slice(0, 8);
    console.log(`\n    ${page}`);
    for (const r of sorted) {
      console.log(`      • ${r.query} (impr:${r.impressions}, pos:${r.position.toFixed(1)})`);
    }
  }

  console.log("\n");
}

main().catch((e) => {
  console.error("\n  failed:", e?.errors?.[0]?.message ?? e.message, "\n");
  process.exit(1);
});
