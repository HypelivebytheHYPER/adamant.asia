#!/usr/bin/env node
/**
 * seo-audit.mjs — Sitemap + index-readiness audit (no GSC credentials required).
 *
 * Crawls the live site's sitemap and checks each URL for the technical signals
 * that determine whether Google *can* index it: HTTP status, redirects,
 * robots-meta noindex, canonical target, <title>, and <h1>. Also validates
 * robots.txt and cross-checks sitemap entries against robots Disallow rules.
 *
 * This is the "can it be indexed" half. The "is it actually indexed in Google"
 * half (coverage state, search analytics) requires GSC_CREDENTIALS_JSON and is
 * handled by src/lib/gsc-api.ts.
 *
 * Usage: node scripts/seo-audit.mjs [https://adamant.asia]
 */

const SITE = (process.argv[2] || "https://adamant.asia").replace(/\/$/, "");
const UA = "adamant-seo-audit/1.0 (+https://adamant.asia)";

/** @param {string} url */
async function fetchText(url) {
  const res = await fetch(url, { headers: { "user-agent": UA }, redirect: "follow" });
  const text = await res.text();
  return { status: res.status, finalUrl: res.url, text };
}

function pick(re, html) {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

function auditHtml(html) {
  const robotsMeta = pick(
    /<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/i,
    html,
  );
  const noindex = /noindex/i.test(robotsMeta || "");
  const canonical = pick(
    /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i,
    html,
  );
  const title = pick(/<title[^>]*>([^<]+)<\/title>/i, html);
  const hasH1 = /<h1[\s>]/i.test(html);
  return { robotsMeta, noindex, canonical, title, hasH1 };
}

async function main() {
  console.log(`\n  SEO / sitemap / index-readiness audit — ${SITE}\n`);

  // 1. robots.txt
  const robots = await fetchText(`${SITE}/robots.txt`).catch(() => null);
  const disallows = [];
  let robotsHasSitemap = false;
  if (robots && robots.status === 200) {
    for (const line of robots.text.split("\n")) {
      const d = line.match(/^\s*Disallow:\s*(\S+)/i);
      if (d) disallows.push(d[1]);
      if (/^\s*Sitemap:/i.test(line)) robotsHasSitemap = true;
    }
    console.log(`  robots.txt        : 200, ${disallows.length} Disallow rule(s), sitemap ref: ${robotsHasSitemap ? "yes" : "NO"}`);
  } else {
    console.log(`  robots.txt        : MISSING (${robots?.status ?? "fetch failed"})`);
  }

  // 2. sitemap.xml
  const sm = await fetchText(`${SITE}/sitemap.xml`).catch(() => null);
  if (!sm || sm.status !== 200) {
    console.log(`  sitemap.xml       : MISSING (${sm?.status ?? "fetch failed"}) — aborting URL crawl\n`);
    process.exit(1);
  }
  const urls = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const lastmodCount = (sm.text.match(/<lastmod>/g) || []).length;
  console.log(`  sitemap.xml       : 200, ${urls.length} URL(s), ${lastmodCount} with <lastmod>\n`);

  // 3. crawl each URL
  const rows = [];
  const issues = [];
  for (const url of urls) {
    try {
      const { status, finalUrl, text } = await fetchText(url);
      const a = auditHtml(text);
      const path = url.replace(SITE, "") || "/";
      const redirected = finalUrl.replace(/\/$/, "") !== url.replace(/\/$/, "");
      const canonOk = !a.canonical || a.canonical.replace(/\/$/, "") === url.replace(/\/$/, "");

      if (status !== 200) issues.push(`${path} → HTTP ${status}`);
      if (redirected) issues.push(`${path} → redirects to ${finalUrl}`);
      if (a.noindex) issues.push(`${path} → has NOINDEX meta`);
      if (!canonOk) issues.push(`${path} → canonical points elsewhere: ${a.canonical}`);
      if (!a.title) issues.push(`${path} → missing <title>`);
      if (!a.hasH1) issues.push(`${path} → missing <h1>`);

      rows.push({
        path,
        status,
        idx: a.noindex ? "NOINDEX" : "ok",
        canon: canonOk ? "self" : "OTHER",
        title: a.title ? "yes" : "NO",
        h1: a.hasH1 ? "yes" : "NO",
      });
    } catch (err) {
      issues.push(`${url} → fetch error: ${err.message}`);
      rows.push({ path: url.replace(SITE, ""), status: "ERR", idx: "-", canon: "-", title: "-", h1: "-" });
    }
  }

  // 4. cross-check sitemap vs robots Disallow
  for (const url of urls) {
    const path = url.replace(SITE, "") || "/";
    for (const d of disallows) {
      if (d !== "/" && path.startsWith(d)) {
        issues.push(`${path} → in sitemap but BLOCKED by robots Disallow ${d}`);
      }
    }
  }

  // 5. print table
  const pad = (s, n) => String(s).padEnd(n).slice(0, n);
  console.log(`  ${pad("PATH", 40)} ${pad("HTTP", 5)} ${pad("INDEX", 8)} ${pad("CANON", 6)} ${pad("TITLE", 6)} H1`);
  console.log(`  ${"-".repeat(74)}`);
  for (const r of rows) {
    console.log(`  ${pad(r.path, 40)} ${pad(r.status, 5)} ${pad(r.idx, 8)} ${pad(r.canon, 6)} ${pad(r.title, 6)} ${r.h1}`);
  }

  // 6. summary
  console.log(`\n  ${"=".repeat(74)}`);
  if (issues.length === 0) {
    console.log(`  ✅ No index-readiness issues found across ${urls.length} URLs.`);
  } else {
    console.log(`  ⚠️  ${issues.length} issue(s) found:`);
    for (const i of issues) console.log(`     • ${i}`);
  }
  console.log("");
}

main().catch((e) => {
  console.error("audit failed:", e);
  process.exit(1);
});
