# Google Marketing Setup Checklist — adamant.asia

> **Project:** adamant.asia  
> **Stack:** Next.js 16 + App Router + Vercel  
> **Target Markets:** Singapore (SG) & Thailand (TH)  
> **Last updated:** 2026-06-09

---

## ✅ Programmatic GSC API Access — WORKING PROTOCOL (2026-06-09)

The Search Console API is wired and verified. Read this before touching GSC auth.

**Auth = OAuth2 user token (NOT a service account).**
- Token belongs to **pitsanu@hypelive.io**, a verified `siteOwner` of `https://adamant.asia/`.
- Env (`.env.local` + Vercel Prod/Dev): `GSC_CLIENT_ID`, `GSC_CLIENT_SECRET`, `GSC_REFRESH_TOKEN` (scope `webmasters.readonly`), `GSC_QUOTA_PROJECT=adamant-asia-seo`.
- Property string is the **URL-prefix with trailing slash**: `https://adamant.asia/`.
- Every call MUST send `x-goog-user-project: adamant-asia-seo` (gcloud's shared OAuth client requires a quota project; that GCP project has the Search Console API enabled and pitsanu owns it). Handled in `gsc-api.ts` via `REQUEST_OPTS`.

**❌ Do NOT use a service account.** A confirmed Google bug (since ~2026-04-20) blocks adding service-account emails to Search Console / GA4 ("Failed to add user: email not found"). The SA path is a dead end here.

**❌ Do NOT route GSC through `googleapis-mcp.hypelive.app`.** That MCP server needs its own server API key (not in `keys.env`) and is bound to hypelive's Google accounts (tenant mismatch for this client site). Use the in-app `gsc-api.ts` integration instead — it's purpose-built and read-only.

**To re-mint the token:** `gcloud auth application-default login --scopes="openid,https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/webmasters.readonly,https://www.googleapis.com/auth/userinfo.email"` as pitsanu → extract `client_id`/`client_secret`/`refresh_token` from `~/.config/gcloud/application_default_credentials.json`.

**Helper scripts** (`node --env-file=.env.local scripts/<name>`):
| Script | Purpose |
|--------|---------|
| `gsc-test.mjs` | Verify auth + list sitemaps + SG top queries |
| `gsc-inspect.mjs` | URL Inspection (index status) for key pages |
| `gsc-cleanup-sitemaps.mjs` | Delete bogus page-as-sitemap entries (needs write scope; `--apply`) |
| `seo-audit.mjs` | Credential-free crawl audit (status/canonical/noindex/title) |

---

## ✅ RESOLVED: Sitemap Setup (fixed 2026-06-09)

Page URLs were manually submitted as sitemaps in GSC instead of the actual sitemap file. **Fixed via `scripts/gsc-cleanup-sitemaps.mjs --apply`** — the 4 bogus entries (`/pricing`, `/blog`, `/solutions/campaign-systems`, `/solutions/marketing-strategy`) were deleted and `sitemap.xml` re-submitted. Report now shows only `sitemap.xml` (0 errors).

### Index status (2026-06-09, via `gsc-inspect.mjs`)
Indexing began **2026-06-06**. Homepage `/` = **Submitted and indexed** (last crawl 2026-06-02). Other pages still "URL unknown to Google" — not yet crawled; the clean sitemap will drive discovery over the coming days.

### Sitemap Technical Details

| Property | Value |
|----------|-------|
| **URL** | `https://adamant.asia/sitemap.xml` |
| **Type** | XML Sitemap (not sitemap-index) |
| **URLs** | 15 |
| **Max allowed** | 50,000 |
| **File size** | 2,790 bytes (max: 50MB) |
| **Valid per sitemaps.org** | ✅ Yes |
| **Content-Type** | `application/xml; charset=utf-8` |
| **robots.txt reference** | ✅ `Sitemap: https://adamant.asia/sitemap.xml` |

### Sitemap URL Structure

```
https://adamant.asia/                          (priority=1.0, weekly)
https://adamant.asia/pricing                   (priority=0.9, weekly)
https://adamant.asia/blog                      (priority=0.9, weekly)
https://adamant.asia/solutions/marketing-strategy    (priority=0.8, monthly)
https://adamant.asia/solutions/campaign-systems      (priority=0.8, monthly)
https://adamant.asia/solutions/productivity-ai       (priority=0.8, monthly)
https://adamant.asia/solutions/kol-leaderboard       (priority=0.8, monthly)
https://adamant.asia/founder                   (priority=0.7, monthly)
https://adamant.asia/demo                      (priority=0.7, monthly)
https://adamant.asia/blog/best-saas-mini-build-agency      (priority=0.8, monthly)
https://adamant.asia/blog/ai-agency-vs-traditional-agency  (priority=0.8, monthly)
https://adamant.asia/blog/saas-development-cost            (priority=0.8, monthly)
https://adamant.asia/blog/saas-build-timeline              (priority=0.8, monthly)
https://adamant.asia/blog/ai-vs-traditional-marketing      (priority=0.8, monthly)
https://adamant.asia/blog/adamant-vs-traditional-agency    (priority=0.8, monthly)
```

### Sitemap Code Location

| File | Purpose |
|------|---------|
| `src/app/sitemap.ts` | **Source of truth** — generates sitemap.xml dynamically |
| `src/app/robots.ts` | References sitemap.xml |
| `next.config.ts` | Sets `Content-Type: application/xml; charset=utf-8` header |

**Do NOT rename to `sitemap-index.xml`** — that's only needed for >50K URLs or multiple sitemap files.

---

## Phase 1 — Accounts & Properties (Do First)

| # | Task | Tool / URL | Status |
|---|------|-----------|:------:|
| 1 | **Create GA4 Property** "Adamant Asia" | [analytics.google.com](https://analytics.google.com) | ⬜ |
| 2 | **Copy GA4 Measurement ID** (G-XXXXXXXXXX) | GA4 → Admin → Data Streams | ⬜ |
| 3 | **Create GTM Container** (Web) | [tagmanager.google.com](https://tagmanager.google.com) | ⬜ |
| 4 | **Copy GTM Container ID** (GTM-XXXXXX) | GTM workspace top-right | ⬜ |
| 5 | **Add GA4 ID to Vercel env** `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` | Vercel Dashboard → Settings → Environment Variables | ⬜ |
| 6 | **Add GTM ID to Vercel env** `NEXT_PUBLIC_GTM_ID=GTM-XXXXXX` | Same as above | ⬜ |
| 7 | **Redeploy** after env vars set | Vercel → Deployments → Redeploy | ⬜ |

---

## Phase 2 — Google Search Console

| # | Task | How To | Status |
|---|------|--------|:------:|
| 8 | **Add property** `https://adamant.asia/` (URL-prefix) | pitsanu@hypelive.io = verified `siteOwner` | ✅ |
| 9 | **Verify ownership** | Verified (HTML file + DNS TXT on Vercel team hypelives-projects) | ✅ |
| 10 | **Fix sitemap submissions** | Deleted 4 bogus page-sitemaps via `gsc-cleanup-sitemaps.mjs --apply` | ✅ |
| 11 | **Submit correct sitemap** `https://adamant.asia/sitemap.xml` | Re-submitted; report clean (0 errors) | ✅ |
| 12 | **API access wired** (OAuth2 + quota project) | `src/lib/gsc-api.ts` — see Working Protocol at top | ✅ |
| 12b | **Request indexing** for homepage | Homepage already indexed (2026-06-06) | ✅ |
| 13 | **Request indexing** for `/pricing` | Same | ⬜ |
| 14 | **Request indexing** for `/solutions/*` pages | Same | ⬜ |
| 15 | **Enable email notifications** for indexing issues | GSC → Settings → Email preferences | ⬜ |

---

## Phase 3 — GA4 Configuration

| # | Task | Location in GA4 | Status |
|---|------|-----------------|:------:|
| 16 | **Enable Enhanced Measurement** (page views, scrolls, outbound clicks, site search, video engagement, file downloads) | Admin → Data Streams → Web Stream → Enhanced Measurement | ⬜ |
| 17 | **Create Custom Event** `generate_lead` as **Conversion** | Configure → Events → Create Event → `contact_form_success` → mark as conversion | ⬜ |
| 18 | **Create Custom Event** `contact_form_submit` (micro-conversion, observe only) | Same, do NOT mark as conversion | ⬜ |
| 19 | **Create Custom Event** `cta_click` (engagement) | Same | ⬜ |
| 20 | **Create Custom Event** `whatsapp_click` as **Conversion** | Same, mark as conversion | ⬜ |
| 21 | **Set Conversion Value** for `generate_lead` → $50 USD | Configure → Conversions → `generate_lead` → Value = 50 | ⬜ |
| 22 | **Create Custom Dimension** `cta_location` (event scope) | Admin → Custom Definitions → Custom Dimension | ⬜ |
| 23 | **Create Custom Dimension** `cta_label` (event scope) | Same | ⬜ |
| 24 | **Create Custom Dimension** `form_source` (event scope) | Same | ⬜ |
| 25 | **Link GA4 → Google Ads** | Admin → Product Links → Google Ads Linking | ⬜ |
| 26 | **Enable Google Signals** for cross-device tracking | Admin → Data Settings → Data Collection → Google Signals | ⬜ |
| 27 | **Set Data Retention** to 14 months | Admin → Data Settings → Data Retention | ⬜ |
| 28 | **Exclude internal IPs** (your office / home) | Admin → Data Streams → Web → Configure Tag Settings → Show All → Define Internal Traffic | ⬜ |
| 29 | **Create SG/TH Audience** (Geo → Country = Singapore OR Thailand) | Configure → Audiences → New Audience | ⬜ |

---

## Phase 4 — Google Ads Setup

| # | Task | How To | Status |
|---|------|--------|:------:|
| 30 | **Create Google Ads account** (if new) | [ads.google.com](https://ads.google.com) | ⬜ |
| 31 | **Link Google Ads ↔ GA4** (from Ads side) | Tools & Settings → Linked Accounts → Google Analytics → Link | ⬜ |
| 32 | **Import GA4 Conversions** into Google Ads | Tools → Conversions → New Conversion Action → Import from GA4 → `generate_lead` + `whatsapp_click` | ⬜ |
| 33 | **Set Conversion Action** `generate_lead` as **Primary** | Conversions → `generate_lead` → Action Optimization → Primary | ⬜ |
| 34 | **Set Conversion Action** `whatsapp_click` as **Primary** | Same | ⬜ |
| 35 | **Set Conversion Value** $50 for `generate_lead` | Same conversion settings | ⬜ |
| 36 | **Create Search Campaign** targeting Singapore | New Campaign → Sales / Leads → Search → Locations = Singapore | ⬜ |
| 37 | **Create Search Campaign** targeting Thailand | Same, Locations = Thailand | ⬜ |
| 38 | **Add keywords** (see keyword research below) | Campaign → Ad Groups → Keywords | ⬜ |
| 39 | **Add negative keywords** (free, cheap, job, careers, internship) | Shared Library → Negative Keyword Lists | ⬜ |
| 40 | **Set up Responsive Search Ads** (RSAs) with 15 headlines, 4 descriptions | Ad Group → Ads & Assets → New RSA | ⬜ |
| 41 | **Add Sitelink Assets** (Pricing, Solutions, Blog, Founder) | Campaign → Assets → Sitelinks | ⬜ |
| 42 | **Add Callout Assets** ("2-Week Delivery", "Fixed Price", "SG-Based", "AI-Powered") | Same | ⬜ |
| 43 | **Set up Conversion Tracking** via GA4 import (already done in #32) | Verify in Tools → Conversions | ⬜ |
| 44 | **Enable Enhanced Conversions** (send hashed email/phone) | Tools → Conversions → Settings → Enhanced Conversions | ⬜ |

---

## Phase 5 — GTM Container (Optional but Recommended)

If using GTM (GTM_ID set), configure these tags inside GTM:

| # | Tag | Trigger | Status |
|---|-----|---------|:------:|
| 45 | **GA4 Config** tag with your Measurement ID | All Pages | ⬜ |
| 46 | **GA4 Event** `generate_lead` | Custom Event = `contact_form_success` | ⬜ |
| 47 | **GA4 Event** `whatsapp_click` | Custom Event = `whatsapp_click` | ⬜ |
| 48 | **GA4 Event** `cta_click` | Custom Event = `cta_click` | ⬜ |
| 49 | **Google Ads Conversion** `generate_lead` | Custom Event = `contact_form_success` | ⬜ |
| 50 | **Conversion Linker** | All Pages | ⬜ |
| 51 | **Consent Mode v2** (if using CMP) | Consent Initialization | ⬜ |

---

## Phase 6 — Keyword Research (SG & TH)

### Singapore-Focused Keywords

| Keyword | Intent | Suggested Match Type |
|---------|--------|---------------------|
| `saas mini build singapore` | High | Exact + Phrase |
| `custom saas development singapore` | High | Exact + Phrase |
| `ai agency singapore` | High | Exact + Phrase |
| `marketing automation system` | Medium | Phrase + Broad Mod |
| `campaign management platform` | Medium | Phrase |
| `workflow automation singapore` | Medium | Phrase |
| `internal tool development` | Medium | Phrase |
| `kol leaderboard platform` | Niche | Exact |
| `influencer marketing tools singapore` | Medium | Phrase |
| `fixed price saas development` | High | Exact |

### Thailand-Focused Keywords

| Keyword | Intent | Suggested Match Type |
|---------|--------|---------------------|
| `saas development thailand` | High | Exact + Phrase |
| `ai agency bangkok` | High | Exact + Phrase |
| `marketing automation thailand` | Medium | Phrase |
| `custom software development thailand` | Medium | Phrase |
| `workflow automation bangkok` | Medium | Phrase |
| `digital marketing system thailand` | Medium | Phrase |

### Negative Keywords (Apply to ALL campaigns)

```
free, cheap, discount, job, jobs, career, careers, internship, hire, hiring,
template, templates, course, courses, tutorial, learn, diy, open source,
wordpress, wix, squarespace, freelancer, fiverr, upwork
```

---

## Phase 7 — Post-Launch Verification

| # | Check | How | Status |
|---|-------|-----|:------:|
| 52 | **GA4 Realtime** shows page views | GA4 → Home → Realtime | ⬜ |
| 53 | **GA4 DebugView** shows events | GA4 → Configure → DebugView (add `?debug_mode=1` to URL) | ⬜ |
| 54 | **GTM Preview** fires tags correctly | tagmanager.google.com → Preview → enter adamant.asia | ⬜ |
| 55 | **Google Tag Assistant** validates GA4 | Chrome extension → Record → Browse site | ⬜ |
| 56 | **Contact form submit** fires `generate_lead` | Submit form → check DebugView / Tag Assistant | ⬜ |
| 57 | **WhatsApp click** fires `whatsapp_click` | Click WA link → check DebugView | ⬜ |
| 58 | **CTA click** fires `cta_click` | Click hero button → check DebugView | ⬜ |
| 59 | **GSC shows indexed pages** | GSC → Coverage → Valid | ⬜ |
| 60 | **Google Ads shows conversions** | Ads → Campaigns → Conversions column (wait 24-48h) | ⬜ |
| 61 | **hreflang validates** | [technicalseo.com/tools/hreflang](https://technicalseo.com/tools/hreflang/) | ⬜ |
| 62 | **Rich Results test** passes | [search.google.com/test/rich-results](https://search.google.com/test/rich-results) | ⬜ |

---

## Phase 8 — Ongoing (Weekly / Monthly)

| Frequency | Task |
|-----------|------|
| **Weekly** | Check GSC → Performance for new queries, CTR drops, indexing issues |
| **Weekly** | Check GA4 → Engagement → Events for conversion rates |
| **Weekly** | Check Google Ads → Search Terms → add negatives, pause poor keywords |
| **Monthly** | Review GSC → Core Web Vitals (LCP, INP, CLS) |
| **Monthly** | Update sitemap if new pages added |
| **Monthly** | Refresh ad creatives (RSA headlines) |
| **Quarterly** | Audit conversion values against actual deal sizes |

---

## Quick Reference — Env Vars

Add these to **Vercel Dashboard → Settings → Environment Variables**:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
```

No server-side secrets needed — both are public IDs.

---

## Files Changed in This Setup

| File | Change |
|------|--------|
| `src/lib/analytics.ts` | New — all tracking functions |
| `src/lib/analytics-ids.ts` | New — env var constants |
| `src/components/google-analytics.tsx` | New — GA4 + GTM loader + route tracker |
| `src/components/hreflang-tags.tsx` | New — manual hreflang for SG/TH |
| `src/app/layout.tsx` | Added `<GoogleAnalytics />`, GTM noscript, hreflang |
| `src/app/sitemap.ts` | Fixed homepage URL (no trailing slash), valid XML |
| `src/app/robots.ts` | References sitemap.xml |
| `next.config.ts` | Added explicit sitemap/robots headers |
| `src/components/contact-form.tsx` | Added `trackFormSubmit` + `trackFormSuccess` |
| `src/sections/contact.tsx` | Added `trackEmailClick` + `trackWhatsAppClick` |
| `src/sections/hero.tsx` | Added `trackCTA` on hero button |

---

## Notes

- **MCP Server** `googleapis-mcp.hypelive.app` is online but is **NOT used for this project** — it requires its own server API key (absent from `keys.env`) and is bound to hypelive's Google accounts (tenant mismatch for a client site). GSC access uses the in-app OAuth2 integration in `src/lib/gsc-api.ts` (see the Working Protocol section at the top).
- **hreflang** is set to `en-SG`, `en-TH`, and `x-default` all pointing to `/` since the site is English-only. If you add Thai or localized pages later, update `alternates.languages` in each page's metadata.
- **Consent Mode v2** is NOT yet implemented. If you serve EU visitors, add a CMP (Cookiebot / CookieYes) before running ads.
- **Sitemap is valid** per sitemaps.org spec: 15 URLs, correct XML structure, proper headers (`/team` and `/team/sam` are intentionally not in the dynamic `sitemap.ts`).
