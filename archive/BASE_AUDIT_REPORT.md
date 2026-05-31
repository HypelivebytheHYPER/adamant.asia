# Adamant.asia — Full Base + Code + Live Page Audit Report
**Generated:** 2026-05-31  
**Base:** adamant Project (XY8IbUHh3aNI2AsWI0tl0YllgSd)  
**Codebase:** ~/adamant.asia (Next.js 16 + React 19)

---

## Executive Summary

| Metric | Count |
|--------|-------|
| Total tables in Base | 11 |
| Tables **actively read by code** | 1 (Our Fees) |
| Tables **actively written by code** | 2 (Pricing Leads, Call Transcripts) |
| Tables with data but **NOT used by code** | 6 |
| Empty / default tables | 1 |
| Records in Base vs hardcoded fallback | Base: 10 pricing items — Fallback: 13 items |

**Critical finding:** The homepage and solution pages read ALL content from `src/data/content.ts` (hardcoded TypeScript). The Base tables (`Sections`, `Testimonials`, `Stats`, `Process Phases`, `Marquee Items`) contain matching data but are **never queried by the app**. This means content revisions in Base have **zero effect** on the live site.

---

## 1. Page-by-Page Field Audit

### 1.1 Homepage `/`

| Section | Field | Live Site Text | Source | Base Table Match |
|---------|-------|---------------|--------|-----------------|
| Hero | Headline | "AI agency for SaaS Mini Build & Marketing System Solution." | `content.ts` | ✅ Sections table (hero) — same text |
| Hero | Body | "We build custom SaaS tools and marketing systems using AI. Two-week delivery…" | `content.ts` | ✅ Sections table (hero) — same text |
| Hero | CTA | "Book a free 45-minute intro call" | `content.ts` | ✅ Sections table (hero) — same text |
| Problem | Headline | "When was the last time you…" | `content.ts` | ✅ Sections table (problem) — same text |
| Trusted Platforms | Title | Various platform logos (Lark, LINE, etc.) | Component hardcoded | ❌ No Base table |
| Showcase Cards | "Campaign Dashboard" / "KOL Leaderboard" | Static showcase cards | `showcase-cards.tsx` hardcoded | ❌ No Base table |
| Solutions | Headline | "What we build." | `content.ts` | ✅ Sections table (solutions) — same text |
| Solutions | Subheadline | "Three ways we help teams move faster…" | `content.ts` | ✅ Sections table (solutions) — same text |
| Solutions | Card 1 Title | "SaaS Mini Build" | `content.ts` | ❌ Not in Base |
| Solutions | Card 2 Title | "Marketing System Solution" | `content.ts` | ❌ Not in Base |
| Solutions | Card 3 Title | "AI Workflow Automation" | `content.ts` | ❌ Not in Base |
| Process | Headline | "From first call to live system." | `content.ts` | ✅ Sections table (process) — same text |
| Process | Subheadline | "No six-month roadmap…" | `content.ts` | ✅ Sections table (process) — same text |
| Process | Phase 01 | "45-minute intro call." | `content.ts` | ✅ Process Phases table — same text |
| Process | Phase 02 | "Paid discovery." | `content.ts` | ✅ Process Phases table — same text |
| Process | Phase 03 | "Build + tweak." | `content.ts` | ✅ Process Phases table — same text |
| Process | Phase 04 | "Deploy." | `content.ts` | ✅ Process Phases table — same text |
| Model | Headline | "SaaS Mini Build. Marketing System Solution. AI Agency." | `content.ts` | ✅ Sections table (model) — same text |
| Model | Subheadline | "We are an AI agency that builds real products…" | `content.ts` | ✅ Sections table (model) — same text |
| Proof | Headline | "What changed." | `content.ts` | ✅ Sections table (proof) — same text |
| Proof | Subheadline | "Before and after — in their own words." | `content.ts` | ✅ Sections table (proof) — same text |
| Testimonials (Reviews) | Thida | "I stopped answering questions and started building again." | `content.ts` | ✅ Testimonials table — same text |
| Testimonials | Min | "We had a working prototype in three days. Not three months." | `content.ts` | ✅ Testimonials table — same text |
| Testimonials | Sarin | "They fixed what was actually broken. Nothing more." | `content.ts` | ✅ Testimonials table — same text |
| Testimonials | Ploy | "No more lost orders." | `content.ts` | ✅ Testimonials table — same text |
| FAQ | Q1–Q5 | 5 Q&A pairs | `content.ts` | ❌ No FAQ table in Base |
| Contact | Headline | "Book your free 45-minute intro call." | `content.ts` | ✅ Sections table (contact) — same text |
| Contact | Subheadline | "We will map your pain points…" | `content.ts` | ✅ Sections table (contact) — same text |
| Footer | Headline | "adamant" | `content.ts` | ✅ Sections table (footer) — same text |
| Marquee | Text items | "Built to save time." / "Agency care. Product speed." etc. | `content.ts` | ✅ Marquee Items table — same text |

**Verdict for `/`:** All content is hardcoded in `content.ts`. Base tables (`Sections`, `Testimonials`, `Process Phases`, `Marquee Items`) mirror the data but are **not wired into the build**. ⚠️ If your team edits Base, nothing changes on the site.

---

### 1.2 Solution Page `/solutions/marketing-strategy` (SaaS Mini Build)

| Field | Live Site Text | Source |
|-------|---------------|--------|
| Page title | "SaaS Mini Build \| Adamant" | `solutions/[slug]/page.tsx` |
| Meta description | "Custom SaaS tools built and shipped in two weeks…" | `page.tsx` (runtime logic) |
| Hero headline | "SaaS Mini Build" | `content.ts` → `servicePages[0].headline` |
| Hero hook | "Custom SaaS tools built and shipped in two weeks…" | `content.ts` → `servicePages[0].hook` |
| Hero body | "We build real SaaS products — not prototypes…" | `content.ts` → `servicePages[0].body` |
| Use Case 1 | "Internal operations dashboard" | `content.ts` |
| Use Case 2 | "Customer-facing portal" | `content.ts` |
| Use Case 3 | "Workflow automation engine" | `content.ts` |
| Process 1 | "Scope the build." | `content.ts` |
| Process 2 | "Build the product." | `content.ts` |
| Process 3 | "Ship and hand off." | `content.ts` |
| Testimonials | Thida, Sarin | `content.ts` → `testimonialIds: [0, 2]` |
| FAQ | 3 Q&A (tech stack, code ownership, changes) | `content.ts` |
| CTA | "Book your free scope call." | `service-page.tsx` hardcoded |

**Verdict:** All data from `content.ts`. No Base reads.

---

### 1.3 Solution Page `/solutions/campaign-systems` (Marketing System)

| Field | Live Site Text | Source |
|-------|---------------|--------|
| Page title | "Marketing System Solution \| Adamant" | `page.tsx` |
| Hero headline | "Marketing System Solution" | `content.ts` → `servicePages[1].headline` |
| Use Case 1 | "Campaign planning to execution" | `content.ts` |
| Use Case 2 | "KOL / influencer pipeline" | `content.ts` |
| Use Case 3 | "Content and performance tracking" | `content.ts` |
| Testimonials | Min, Ploy | `content.ts` → `testimonialIds: [1, 3]` |
| FAQ | 3 Q&A (platforms, influencer volume, vs agency) | `content.ts` |

**Verdict:** All data from `content.ts`. No Base reads.

---

### 1.4 Solution Page `/solutions/productivity-ai` (AI Workflow)

| Field | Live Site Text | Source |
|-------|---------------|--------|
| Page title | "AI Workflow Automation — Adamant" | `page.tsx` (special-cased) |
| Hero headline | "AI Workflow Automation" | `content.ts` → `servicePages[2].headline` |
| Use Case 1 | "Auto-routing inquiries" | `content.ts` |
| Use Case 2 | "Reports that write themselves" | `content.ts` |
| Use Case 3 | "Approval workflows that move" | `content.ts` |
| Testimonials | Thida, Ploy | `content.ts` → `testimonialIds: [0, 3]` |

**Verdict:** All data from `content.ts`. No Base reads.

---

### 1.5 Pricing Page `/pricing`

| Field | Live Site Text | Source | Issue |
|-------|---------------|--------|-------|
| Page title | "Pricing \| Adamant" | `page.tsx` | ✅ OK |
| Gate headline | "View our indicative fees." | `pricing-client.tsx` hardcoded | ✅ OK |
| Gate body | "Leave your details and we'll unlock pricing instantly…" | `pricing-client.tsx` hardcoded | ✅ OK |
| Pricing items (10) | All fees listed | **`Our Fees` Base table** | ✅ Reads from Base |
| Categories | Intro call, Discovery, Build, Systems, Retainer | **`Our Fees` Base table** | ✅ Reads from Base |
| SGD/THB toggle | Currency switcher | Computed from Base | ✅ OK |
| "What's included" | Per-item bulleted lists | **`Our Fees` Base table** | ✅ Reads from Base |
| Payment terms | "50% upfront, 50% on delivery…" | `pricing-client.tsx` hardcoded | ⚠️ Not in Base |
| "What's always included" | "Source code ownership transfers…" | `pricing-client.tsx` hardcoded | ⚠️ Not in Base |
| Footer CTA | "Ready to talk? Book your free intro call" | `pricing-client.tsx` hardcoded | ✅ OK |

**⚠️ BASE DATA GAP:** Fallback in `pricing.ts` contains **13 items**, but Base `Our Fees` table only has **10 records**. Missing from Base:

| Missing Item | Category | SGD | THB |
|-------------|----------|-----|-----|
| Live commerce operations tool | Systems | S$6,800 | ฿183,600 |
| Ops & maintenance retainer | Retainer | S$800 | ฿21,600 |
| Growth partner retainer | Retainer | S$2,200 | ฿59,400 |

**Impact:** If `LARK_BASE_TOKEN` is configured in production, these 3 items **do not appear** on the pricing page. If the env var is missing, the fallback (with 13 items) is shown.

**⚠️ ENV CHECK:** `.env.local` is **missing `LARK_BASE_TOKEN`**. Local dev uses fallback (13 items). Check Vercel dashboard to confirm production env var status.

---

### 1.6 Founder Page `/founder`

| Field | Live Site Text | Source |
|-------|---------------|--------|
| Page title | "Founder \| Adamant" | `page.tsx` |
| Hero headline | "We started this because we were tired of watching good teams drown." | `founder/page.tsx` hardcoded |
| Opening body | "Before Adamant, we spent years inside teams…" | Hardcoded |
| Belief 01–04 | "Clarity beats complexity…" etc. | Hardcoded array |
| Process steps | "Book a call." / "Get a proposal." / "We build." / "Handover and training." | Hardcoded array |
| Stats | "47 teams" / "2 weeks" / "0 status meetings" | Hardcoded array |
| Track Record | "What we have done." | `founder/page.tsx` hardcoded |
| CTA | "Want to know if we are the right fit?" | `founder/page.tsx` hardcoded |

**Verdict:** Entirely hardcoded. No Base reads. Stats on this page (47, 2 weeks, 0) differ from homepage stats (47, 2 weeks, 30 days, 0). ⚠️ Inconsistent stat messaging.

---

### 1.7 Contact Section `/#contact`

| Field | Source |
|-------|--------|
| Headline, Subheadline | `content.ts` → `sections.contact` |
| Email | `content.ts` → `contactInfo.email` = `hello@adamant.asia` |
| Form fields (name, email, company, message) | `contact.tsx` hardcoded |
| Form submit | POST to `/api/pricing-lead` → writes to **Base `Pricing Leads`** |

**Verdict:** Reads from `content.ts`. Writes to Base ✅.

---

## 2. Base Table Usage Matrix

| Table | Table ID | Records | Read by Code? | Written by Code? | Status |
|-------|----------|---------|---------------|------------------|--------|
| **Our Fees** | tblH8sKzoqv0c5KD | 10 | ✅ `pricing.ts` | ❌ no | **Active** |
| **Pricing Leads** | tbl3HSjoxqVzUN4m | 4 | ❌ no | ✅ `pricing-lead/route.ts` | **Active** |
| **Call Transcripts** | tblMtH5nqtEIuQKy | 3 | ❌ no | ✅ `webhook/elevenlabs/route.ts` | **Active** |
| Sections | tblSpL711EZgaBT8 | 8 | ❌ no | ❌ no | **⚠️ ORPHAN — data not consumed** |
| Testimonials | tblCcDZ0oMr1bxZf | 4 | ❌ no | ❌ no | **⚠️ ORPHAN — data not consumed** |
| Stats | tblvXVoKpAzZTf7l | 4 | ❌ no | ❌ no | **⚠️ ORPHAN — data not consumed** |
| Process Phases | tbl3RHZEMfmDsVYs | 4 | ❌ no | ❌ no | **⚠️ ORPHAN — data not consumed** |
| Marquee Items | tblkG26GcaMjBxQY | 8 | ❌ no | ❌ no | **⚠️ ORPHAN — data not consumed** |
| Before After | tbltmfSVxjSY0qjv | 3 | ❌ no | ❌ no | **⚠️ ORPHAN — data not consumed** |
| Notifications | tblWhVnoj6j4Bj22 | 6 | ❌ no | ❌ no | **⚠️ ORPHAN — data not consumed** |
| Table | tblLK1HIRbCj3SG2 | 5 (empty) | ❌ no | ❌ no | **🔴 EMPTY — delete** |

---

## 3. Old / Unused Items to Clean Up

### 3.1 Tables to Delete (or Repurpose)

| # | Table | Action | Reason |
|---|-------|--------|--------|
| 1 | `Table` (tblLK1HIRbCj3SG2) | **🔴 DELETE** | 5 empty records with no data. Default table, never referenced. |
| 2 | `Notifications` (tblWhVnoj6j4Bj22) | **🟡 REVIEW → DELETE or WIRE UP** | 6 demo notification records ("Min: Where is the price list?", "New order #8392"). Not used by any component. Was likely for a demo/dashboard feature that was abandoned. |
| 3 | `Before After` (tbltmfSVxjSY0qjv) | **🟡 REVIEW → DELETE or WIRE UP** | 3 records ("6 spreadsheets → 1 dashboard", etc.). Not referenced in code. May have been intended for a "Before/After" section that was never built. |

### 3.2 Tables with Data but Not Wired (Team Decision Needed)

These tables contain **real, curated content** that mirrors `content.ts`. Either:
- **Option A:** Wire them into the build (replace hardcode with Base reads)
- **Option B:** Drop them and manage content via Git/code only

| Table | Content Match Quality | Recommendation |
|-------|----------------------|----------------|
| **Sections** | 100% match with `content.ts` | 🟡 Keep if you plan to wire up; else delete to avoid confusion |
| **Testimonials** | 100% match with `content.ts` | 🟡 Keep if you plan to wire up; else delete |
| **Stats** | 100% match with `content.ts` | 🟡 Keep if you plan to wire up; else delete |
| **Process Phases** | 100% match with `content.ts` | 🟡 Keep if you plan to wire up; else delete |
| **Marquee Items** | 100% match with `content.ts` | 🟡 Keep if you plan to wire up; else delete |

### 3.3 Content Gaps (Missing in Base)

| Content | Location | Status |
|---------|----------|--------|
| **5 FAQ items** on homepage | No `FAQ` table | ❌ Missing entirely |
| **3 Service Pages** content (useCases, process, faq) | No `Service Pages` table | ❌ Missing entirely |
| **Solutions cards** (3 items) | No `Solutions` table | ❌ Missing entirely |
| **Founder page** all copy | No `Founder` table | ❌ Missing entirely |
| **Payment terms** on pricing page | Not in `Our Fees` | ❌ Missing |
| **"What's always included"** on pricing page | Not in `Our Fees` | ❌ Missing |
| **3 pricing items** (live commerce, 2 retainers) | Missing from `Our Fees` | ❌ Missing |

---

## 4. Hardcoded vs Base — Detailed Comparison

### 4.1 Sections (`content.ts` vs Base `Sections` table)

All 8 sections in `content.ts` have matching records in Base. The data is in sync.

```
content.ts sections        Base Sections table        Match?
─────────────────────────────────────────────────────────────
hero                       hero                       ✅
problem                    problem                    ✅
solutions                  solutions                  ✅
process                    process                    ✅
model                      model                      ✅
proof                      proof                      ✅
contact                    contact                    ✅
footer                     footer                     ✅
```

### 4.2 Testimonials (`content.ts` vs Base `Testimonials` table)

```
content.ts                 Base Testimonials          Match?
─────────────────────────────────────────────────────────────
Thida / Manufacturing      Thida / Manufacturing      ✅
Min / Retail               Min / Retail               ✅
Sarin / Education          Sarin / Education          ✅
Ploy / F&B                 Ploy / F&B                 ✅
```

### 4.3 Stats (`content.ts` vs Base `Stats` table)

⚠️ **ORDER DIFFERENCE:**

```
content.ts order           Base Stats order
─────────────────────────────────────────────────
47 / teams, off the hook   2 weeks / from call to live
2 weeks / from call to live  47 / teams, off the hook
30 days / gratis support   0 / status meetings
0 / status meetings        30 days / gratis support
```

The `StatsBar` component on homepage is **not even imported** in `page.tsx`, so stats are hidden on the homepage. On the `/founder` page, stats are hardcoded with different values ("47 teams", "2 weeks", "0 status meetings" — no "30 days").

### 4.4 Process Phases (`content.ts` vs Base `Process Phases` table)

```
content.ts                 Base Process Phases        Match?
─────────────────────────────────────────────────────────────
01 / 45-min intro call.    01 / 45-minute intro call. ✅
02 / Paid discovery.       02 / Paid discovery.       ✅
03 / Build + tweak.        03 / Build + tweak.        ✅
04 / Deploy.               04 / Deploy.               ✅
```

### 4.5 Marquee Items (`content.ts` vs Base `Marquee Items` table)

```
content.ts                 Base Marquee Items         Match?
─────────────────────────────────────────────────────────────
8 items                    8 items                    ✅
```

---

## 5. Environment Variable Audit

| Var | `.env.local` | `.env.example` | Used By | Status |
|-----|-------------|----------------|---------|--------|
| `LARK_BASE_TOKEN` | ❌ Missing | ✅ Present | `pricing.ts` | ⚠️ Local dev uses fallback |
| `LARK_TABLE_ID_PRICING` | ❌ Missing | ✅ Present | `pricing.ts` (fallback value used) | ⚠️ Hardcoded fallback |
| `LARK_TABLE_ID_PRICING_LEADS` | ❌ Missing | ✅ Present | `pricing-lead/route.ts` (fallback used) | ⚠️ Hardcoded fallback |
| `LARK_BASE_APP_TOKEN` | ✅ Present | ✅ Present | ElevenLabs webhook | ✅ OK |
| `LARK_TABLE_ID_CALLS` | ✅ Present | ✅ Present | ElevenLabs webhook | ✅ OK |
| `LARK_APP_ID` | ❌ Missing | ❌ Empty | `lark-api.ts` auth | ⚠️ Not configured |
| `LARK_APP_SECRET` | ❌ Missing | ❌ Empty | `lark-api.ts` auth | ⚠️ Not configured |
| `LARK_USER_ACCESS_TOKEN` | ❌ Missing | ❌ Empty | `lark-api.ts` auth | ⚠️ Not configured |

**Auth mode:** The `lark-api.ts` client tries `LARK_USER_ACCESS_TOKEN` first, then `LARK_APP_ID` + `LARK_APP_SECRET`. Neither is set in `.env.local`. The `lark-cli` binary handles auth via its own OAuth flow, so local dev works via CLI but direct API calls would fail without the token.

**In production:** Check Vercel dashboard → adamant.asia → Environment Variables to confirm `LARK_BASE_TOKEN` is set.

---

## 6. Recommendations for Team Review

### Priority 1 — Fix Pricing Data Gap
- [ ] Add the 3 missing pricing items to `Our Fees` Base table:
  - Live commerce operations tool (Systems, S$6,800)
  - Ops & maintenance retainer (Retainer, S$800)
  - Growth partner retainer (Retainer, S$2,200)
- [ ] OR remove them from the fallback in `pricing.ts` if they should not be offered.
- [ ] Ensure `LARK_BASE_TOKEN` is set in Vercel production env.

### Priority 2 — Decide on Base-as-CMS
- [ ] **Option A (keep Base tables):** Wire `Sections`, `Testimonials`, `Stats`, `Process Phases`, `Marquee Items` into the build. Replace hardcoded `content.ts` with Base fetches. Pros: non-devs can edit content. Cons: extra API calls, cold-start latency.
- [ ] **Option B (delete Base tables):** Remove the 5 orphan tables and manage content in `content.ts` only. Pros: simpler, faster, version-controlled. Cons: requires dev for content changes.
- [ ] **Recommended:** Option B for now. The site is static-exported (`out/`). Base reads require server functions or `use client` fetches, which complicate a static site. Manage copy in `content.ts` + Git.

### Priority 3 — Clean Up
- [ ] Delete empty `Table` (tblLK1HIRbCj3SG2).
- [ ] Delete `Notifications` table unless building a dashboard feature.
- [ ] Delete `Before After` table unless building a before/after section.
- [ ] If choosing Option B, also delete `Sections`, `Testimonials`, `Stats`, `Process Phases`, `Marquee Items`.

### Priority 4 — Content Accuracy
- [ ] Founder page stats (47, 2 weeks, 0) differ from homepage stats (47, 2 weeks, 30 days, 0). Align or clarify why they differ.
- [ ] `StatsBar` component is defined but never rendered on homepage. Decide: render it or delete the component.

### Priority 5 — Contact Form Consistency
- [ ] Contact section form POSTs to `/api/pricing-lead` with `source: "Contact Section"`. This is the same API used by pricing unlock. The API stores to `Pricing Leads` table with fields: Name, Email, Company, Message, Source. ✅ Working correctly.
- [ ] 4 test records exist in `Pricing Leads` (including real submission from pitsanu@hypelive.io). Clean test data before launch.
- [ ] 3 test call transcripts in `Call Transcripts`. Clean or keep for demo.

---

## 7. Quick Reference: Which File to Edit

| Page | Content | Edit File |
|------|---------|-----------|
| Homepage hero | Headline, body, CTA | `src/data/content.ts` → `sections.hero` |
| Homepage problem | Headline | `src/data/content.ts` → `sections.problem` |
| Homepage solutions | Cards, headlines | `src/data/content.ts` → `solutions` array |
| Homepage process | Headline, 4 phases | `src/data/content.ts` → `sections.process`, `processPhases` |
| Homepage model | Headline, subheadline | `src/data/content.ts` → `sections.model` |
| Homepage proof | Headline, testimonials | `src/data/content.ts` → `sections.proof`, `testimonials` |
| Homepage FAQ | 5 Q&A pairs | `src/data/content.ts` → `faq` array |
| Homepage contact | Headline, email | `src/data/content.ts` → `sections.contact`, `contactInfo` |
| Homepage marquee | Scrolling text | `src/data/content.ts` → `marqueeItems` |
| Solutions pages | All copy per service | `src/data/content.ts` → `servicePages` array |
| Pricing items | Fees, scopes, inclusions | **Lark Base** → `Our Fees` table (or `src/lib/pricing.ts` fallback) |
| Pricing gate copy | "View our indicative fees" etc. | `src/components/pricing-client.tsx` |
| Founder page | All editorial copy | `src/app/founder/page.tsx` |
| Contact form | Fields, labels | `src/sections/contact.tsx` |
| Footer | Links, logo | `src/app/layout.tsx` / `src/data/content.ts` → `footerNavLinks` |

---

*End of report. Review with your team and decide on Priority 2 (Base-as-CMS strategy) before making any deletions.*
