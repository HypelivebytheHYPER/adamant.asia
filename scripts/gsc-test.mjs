#!/usr/bin/env node
/**
 * gsc-test.mjs — Verify the GSC service-account credential end-to-end.
 *
 * Confirms: (1) the credential authenticates, (2) which property type the
 * site is registered as (URL-prefix vs Domain), (3) sitemaps are visible,
 * and (4) Singapore-filtered search analytics return rows.
 *
 * Run AFTER the service account has been added as a user in Search Console:
 *   node --env-file=.env.local scripts/gsc-test.mjs
 */

import { google } from "googleapis";

// Auth priority mirrors gsc-api.ts, but OAuth2 first because the
// service-account "Add user" path is blocked by a Google-side bug
// (service accounts created after ~2026-04-20 can't be added to GSC).
function buildAuth() {
  const CID = process.env.GSC_CLIENT_ID;
  const CSEC = process.env.GSC_CLIENT_SECRET;
  const RTOK = process.env.GSC_REFRESH_TOKEN;
  if (CID && CSEC && RTOK) {
    console.log("  auth: OAuth2 (user refresh token)");
    const oauth2 = new google.auth.OAuth2(CID, CSEC);
    oauth2.setCredentials({ refresh_token: RTOK });
    return oauth2;
  }
  const RAW = process.env.GSC_CREDENTIALS_JSON;
  if (RAW) {
    console.log("  auth: service account");
    let credentials;
    try {
      credentials = JSON.parse(Buffer.from(RAW, "base64").toString("utf-8"));
    } catch {
      credentials = JSON.parse(RAW);
    }
    return new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    });
  }
  console.error("✗ No GSC credentials in env (need GSC_CLIENT_ID/SECRET/REFRESH_TOKEN or GSC_CREDENTIALS_JSON)");
  process.exit(1);
}

const auth = buildAuth();
// gcloud's shared OAuth client requires a quota project for the Search Console API.
// We own adamant-gsc-prod (Search Console API enabled there), so attribute quota to it.
const QUOTA_PROJECT = process.env.GSC_QUOTA_PROJECT || "adamant-asia-seo";
const QUOTA_HEADERS = { "x-goog-user-project": QUOTA_PROJECT };
const webmasters = google.webmasters({ version: "v3", auth });

// Try both property forms; whichever doesn't 403/404 is the live one.
const CANDIDATES = ["https://adamant.asia/", "sc-domain:adamant.asia"];

async function detectProperty() {
  for (const siteUrl of CANDIDATES) {
    try {
      const res = await webmasters.sitemaps.list({ siteUrl }, { headers: QUOTA_HEADERS });
      const count = (res.data.sitemap ?? []).length;
      console.log(`  ✅ property works: ${siteUrl}  (${count} sitemap(s))`);
      for (const s of res.data.sitemap ?? []) {
        console.log(`     - ${s.path}  submitted:${s.lastSubmitted ?? "—"}  errors:${s.errors ?? 0} warnings:${s.warnings ?? 0}`);
      }
      return siteUrl;
    } catch (err) {
      const code = err?.code || err?.response?.status;
      console.log(`  ✗ ${siteUrl} → ${code} ${err?.errors?.[0]?.message ?? err.message}`);
    }
  }
  return null;
}

async function singaporeAnalytics(siteUrl) {
  // last 28 days, Singapore only, top queries
  const end = new Date();
  const start = new Date(end.getTime() - 28 * 86400000);
  const fmt = (d) => d.toISOString().slice(0, 10);
  const res = await webmasters.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: fmt(start),
      endDate: fmt(end),
      dimensions: ["query"],
      dimensionFilterGroups: [{ filters: [{ dimension: "country", expression: "sgp" }] }],
      rowLimit: 10,
    },
  }, { headers: QUOTA_HEADERS });
  const rows = res.data.rows ?? [];
  console.log(`\n  🇸🇬 Singapore — top queries (last 28d): ${rows.length} row(s)`);
  for (const r of rows) {
    console.log(`     "${r.keys?.[0]}"  clicks:${r.clicks} impr:${r.impressions} ctr:${(r.ctr * 100).toFixed(1)}% pos:${r.position?.toFixed(1)}`);
  }
  if (rows.length === 0) {
    console.log("     (no SG data yet — normal for a new/low-traffic property)");
  }
}

async function main() {
  console.log("\n  GSC credential verification — adamant.asia\n");
  const siteUrl = await detectProperty();
  if (!siteUrl) {
    console.error("\n  ✗ No property accessible. Confirm the service account was added as a user in Search Console:");
    console.error("    adamant-gsc@adamant-gsc-prod.iam.gserviceaccount.com\n");
    process.exit(1);
  }
  await singaporeAnalytics(siteUrl);
  console.log(`\n  ✅ Done. Use this property string in gsc-api.ts SITE_URL: ${siteUrl}\n`);
}

main().catch((e) => {
  console.error("\n  test failed:", e?.errors?.[0]?.message ?? e.message, "\n");
  process.exit(1);
});
