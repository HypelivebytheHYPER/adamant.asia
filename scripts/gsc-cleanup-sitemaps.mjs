#!/usr/bin/env node
/**
 * gsc-cleanup-sitemaps.mjs — Remove bogus page-as-sitemap submissions from GSC.
 *
 * Pages (e.g. /pricing, /blog) were mistakenly submitted as sitemaps via the GSC
 * UI; they can never be parsed as XML ("Couldn't fetch"). This deletes any
 * submitted "sitemap" whose URL is not an actual .xml sitemap, then re-submits
 * the canonical /sitemap.xml to nudge a fresh read.
 *
 * Dry-run by default — prints the plan. Pass --apply to execute.
 *   node --env-file=.env.local scripts/gsc-cleanup-sitemaps.mjs          # dry run
 *   node --env-file=.env.local scripts/gsc-cleanup-sitemaps.mjs --apply  # execute
 */

import { google } from "googleapis";

const APPLY = process.argv.includes("--apply");
const SITE_URL = process.env.GSC_SITE_URL || "https://adamant.asia/";
const QUOTA_PROJECT = process.env.GSC_QUOTA_PROJECT || "adamant-asia-seo";
const QUOTA = { headers: { "x-goog-user-project": QUOTA_PROJECT } };
const CANONICAL = "https://adamant.asia/sitemap.xml";

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

// A valid sitemap submission must be an absolute URL ending in .xml (or .xml.gz).
function isRealSitemap(path) {
  return /\.xml(\.gz)?$/i.test(path);
}

async function main() {
  console.log(`\n  GSC sitemap cleanup — ${SITE_URL}  ${APPLY ? "(APPLY)" : "(dry run)"}\n`);
  const { data } = await wm.sitemaps.list({ siteUrl: SITE_URL }, QUOTA);
  const subs = data.sitemap ?? [];
  if (subs.length === 0) {
    console.log("  No sitemaps submitted.");
    return;
  }

  const junk = subs.filter((s) => !isRealSitemap(s.path));
  const valid = subs.filter((s) => isRealSitemap(s.path));

  console.log("  Current submissions:");
  for (const s of subs) {
    console.log(`    ${isRealSitemap(s.path) ? "keep  " : "DELETE"}  ${s.path}`);
  }

  if (junk.length === 0) {
    console.log("\n  ✅ Nothing to clean — all submissions are real .xml sitemaps.");
  } else if (!APPLY) {
    console.log(`\n  Would delete ${junk.length} bogus entr(ies). Re-run with --apply to execute.`);
  } else {
    for (const s of junk) {
      await wm.sitemaps.delete({ siteUrl: SITE_URL, feedpath: s.path }, QUOTA);
      console.log(`    deleted  ${s.path}`);
    }
  }

  // Ensure the canonical sitemap is present and freshly submitted.
  const hasCanonical = valid.some((s) => s.path === CANONICAL);
  if (APPLY) {
    await wm.sitemaps.submit({ siteUrl: SITE_URL, feedpath: CANONICAL }, QUOTA);
    console.log(`\n  ✅ (re)submitted canonical: ${CANONICAL}`);
  } else {
    console.log(`\n  Canonical ${CANONICAL} present: ${hasCanonical ? "yes" : "NO (will submit)"}; --apply will (re)submit it.`);
  }
  console.log("");
}

main().catch((e) => {
  console.error("\n  cleanup failed:", e?.errors?.[0]?.message ?? e.message, "\n");
  process.exit(1);
});
