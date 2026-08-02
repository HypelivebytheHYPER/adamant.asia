#!/usr/bin/env node
/**
 * gsc-inspect.mjs — URL Inspection (index status) for key adamant.asia pages.
 *
 * Calls the Search Console URL Inspection API (same as gsc-api.ts inspectUrl)
 * via the read-only OAuth2 token + quota project. Reports, per URL: whether
 * Google has it indexed, coverage state, last crawl, and any robots/fetch issues.
 *
 *   node --env-file=.env.local scripts/gsc-inspect.mjs [url1 url2 ...]
 *
 * With no args it inspects a default set of important pages.
 */

import { google } from "googleapis";

const SITE_URL = process.env.GSC_SITE_URL || "https://adamant.asia/";
const QUOTA_PROJECT = process.env.GSC_QUOTA_PROJECT || "adamant-asia-seo";
const QUOTA = { headers: { "x-goog-user-project": QUOTA_PROJECT } };

const DEFAULT_URLS = [
  "https://adamant.asia/",
  "https://adamant.asia/pricing",
  "https://adamant.asia/blog",
  "https://adamant.asia/founder",
  "https://adamant.asia/solutions/marketing-strategy",
];
const urls = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_URLS;

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

const sc = google.searchconsole({ version: "v1", auth: buildAuth() });

async function inspect(inspectionUrl) {
  const res = await sc.urlInspection.index.inspect({
    requestBody: { inspectionUrl, siteUrl: SITE_URL, languageCode: "en-US" },
  }, QUOTA);
  return res.data.inspectionResult?.indexStatusResult ?? {};
}

async function main() {
  console.log(`\n  URL Inspection — ${SITE_URL}  (quota: ${QUOTA_PROJECT})\n`);
  const pad = (s, n) => String(s ?? "—").padEnd(n).slice(0, n);
  console.log(`  ${pad("PATH", 38)} ${pad("VERDICT", 8)} ${pad("COVERAGE", 26)} LAST CRAWL`);
  console.log(`  ${"-".repeat(94)}`);
  for (const u of urls) {
    try {
      const r = await inspect(u);
      const path = u.replace("https://adamant.asia", "") || "/";
      const crawl = r.lastCrawlTime ? r.lastCrawlTime.slice(0, 10) : "not yet";
      console.log(`  ${pad(path, 38)} ${pad(r.verdict, 8)} ${pad(r.coverageState, 26)} ${crawl}`);
      if (r.robotsTxtState && r.robotsTxtState !== "ALLOWED") console.log(`      ⚠ robots: ${r.robotsTxtState}`);
      if (r.pageFetchState && r.pageFetchState !== "SUCCESSFUL") console.log(`      ⚠ fetch: ${r.pageFetchState}`);
    } catch (e) {
      console.log(`  ${pad(u, 38)} ERROR  ${e?.errors?.[0]?.message ?? e.message}`);
    }
  }
  console.log("\n  Verdict PASS = eligible/indexed; coverage explains why (Submitted and indexed vs Discovered/Crawled-not-indexed).\n");
}

main().catch((e) => {
  console.error("\n  inspection failed:", e?.errors?.[0]?.message ?? e.message, "\n");
  process.exit(1);
});
