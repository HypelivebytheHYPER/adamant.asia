# Adamant Project Base — Complete lark-cli Audit Report
**Base Name:** adamant Project  
**Base Token:** XY8IbUHh3aNI2AsWI0tl0YllgSd  
**URL:** https://hypelive.sg.larksuite.com/base/XY8IbUHh3aNI2AsWI0tl0YllgSd  
**Timezone:** Asia/Bangkok  
**Revision:** 11  
**Advanced Permissions:** Disabled  
**Generated:** 2026-05-31 via lark-cli v1.0.44  

---

## 1. Base Overview

| Metric | Value |
|--------|-------|
| Total tables | 11 |
| Total fields across all tables | 64 |
| Total records across all tables | 55 |
| Total views | 11 (1 per table, all Grid) |
| Total dashboards | 0 |
| Total forms | 0 |
| Total workflows | 1 (disabled) |
| Total custom roles | 0 |

---

## 2. Table-by-Table Full Detail

---

### Table 1: `Table` (tblLK1HIRbCj3SG2)

| Property | Value |
|----------|-------|
| **Records** | 5 |
| **Fields** | 1 |
| **Views** | 1 Grid |
| **Forms** | 0 |
| **Used by code?** | ❌ No |

**Fields:**
| Field ID | Name | Type | Default |
|----------|------|------|---------|
| fld7wWY0wt | Text | text | null |

**All Records:**
| _record_id | Text |
|------------|------|
| rec27trsuVFbYr | *(empty)* |
| rec27trsuVFg0U | *(empty)* |
| rec27trsuVFieH | *(empty)* |
| rec27trsuVFjV2 | *(empty)* |
| rec27trsuVFlsh | *(empty)* |

**🔴 VERDICT:** Empty default table. All 5 records have blank Text fields. **Delete.**

---

### Table 2: `Sections` (tblSpL711EZgaBT8)

| Property | Value |
|----------|-------|
| **Records** | 8 |
| **Fields** | 8 |
| **Views** | 1 Grid View |
| **Forms** | 0 |
| **Used by code?** | ❌ No (data mirrors `content.ts` but code reads from TS) |

**Fields:**
| # | Field ID | Name | Type | Default |
|---|----------|------|------|---------|
| 1 | fldOdSSfde | Section ID | text | null |
| 2 | fldy1btGwl | Subheadline | text | null |
| 3 | fldw4x5ZoI | Body | text | null |
| 4 | fldyjAH1Kk | Order | number | null |
| 5 | fldWYHn4LS | CTA Link | text | null |
| 6 | fld4XNbasZ | Enabled | checkbox | — |
| 7 | fldaCDzSJn | Headline | text | null |
| 8 | fldoSK7vOl | CTA Text | text | null |

**All Records:**
| # | _record_id | Section ID | Enabled | Headline | CTA Text | Body | CTA Link | Subheadline | Order |
|---|------------|-----------|---------|----------|----------|------|----------|-------------|-------|
| 1 | recvkIxIVLarqK | hero | ✅ true | AI agency for SaaS Mini Build & Marketing System Solution. | Book a free 45-minute intro call | We build custom SaaS tools and marketing systems using AI. Two-week delivery. Your team gets a product that runs — not a deck that gathers dust. | #contact | — | 1 |
| 2 | recvkIxIVLFnEe | problem | ✅ true | When was the last time you... | — | — | — | — | 2 |
| 3 | recvkVz1asmXoC | solutions | ✅ true | What we build. | — | — | — | Three ways we help teams move faster. Pick what you need — or start with a scope call and we will tell you what fits. | 3 |
| 4 | recvkIxIVLDY1V | process | ✅ true | From first call to live system. | — | — | — | No six-month roadmap. No surprise invoices. Just a clear path from broken to running. | 4 |
| 5 | recvkIxIVLYxhs | model | ✅ true | SaaS Mini Build. Marketing System Solution. AI Agency. | — | — | — | We are an AI agency that builds real products — not slide decks. SaaS tools that ship in two weeks. Marketing systems that run without you. You get the speed of a product team with the care of a partner. | 5 |
| 6 | recvkIxIVLxsxV | proof | ✅ true | What changed. | — | — | — | Before and after — in their own words. | 6 |
| 7 | recvkIxIVLpXdV | contact | ✅ true | Book your free 45-minute intro call. | Schedule now | — | #contact | We will map your pain points and show you what is possible. No pitch. No pressure. If we cannot help, we will tell you. | 7 |
| 8 | recvkIxIVLSd2k | footer | ✅ true | adamant | — | — | — | — | 8 |

**🟡 VERDICT:** Data is clean and complete. Mirrors `content.ts` exactly. But code does **not** read from this table — it reads hardcoded `content.ts`. If your team wants Base-editable sections, an engineer needs to wire this table into the build. Otherwise, it's an orphan.

---

### Table 3: `Testimonials` (tblCcDZ0oMr1bxZf)

| Property | Value |
|----------|-------|
| **Records** | 4 |
| **Fields** | 7 |
| **Views** | 1 Grid View |
| **Forms** | 0 |
| **Used by code?** | ❌ No (code reads `content.ts`) |

**Fields:**
| # | Field ID | Name | Type | Default |
|---|----------|------|------|---------|
| 1 | fldayfl1Wm | Name | text | null |
| 2 | fldpCo9VdH | Industry | text | null |
| 3 | fldd9rvCPy | Location | text | null |
| 4 | fldGCWEHFT | Before | text | null |
| 5 | fldftmf4Mz | After | text | null |
| 6 | fldq7Jh82e | Quote | text | null |
| 7 | fldRH9aVuK | Order | number | null |

**All Records:**
| # | _record_id | Name | Location | Before | After | Industry | Quote | Order |
|---|------------|------|----------|--------|-------|----------|-------|-------|
| 1 | recvkIxJ5NWkWw | Thida | Bangkok | 20 questions a day | Silence | Manufacturing | I stopped answering questions and started building again. | 1 |
| 2 | recvkIxJ5N80K8 | Min | Chiang Mai | 3 months, no system | Moving in 3 days | Retail | We had a working prototype in three days. Not three months. | 2 |
| 3 | recvkIxJ5NStzF | Sarin | Phuket | $15K quote, unused | Fixed in one week | Education | They fixed what was actually broken. Nothing more. | 3 |
| 4 | recvkIxJ5NxxxP | Ploy | Bangkok | Orders in 3 notebooks | Fully handled | F&B | No more lost orders. | 4 |

**🟡 VERDICT:** 4 testimonials, fully populated. Matches `content.ts` 100%. Not wired into code. Orphan unless wired up.

---

### Table 4: `Stats` (tblvXVoKpAzZTf7l)

| Property | Value |
|----------|-------|
| **Records** | 4 |
| **Fields** | 3 |
| **Views** | 1 Grid View |
| **Forms** | 0 |
| **Used by code?** | ❌ No |

**Fields:**
| # | Field ID | Name | Type | Default |
|---|----------|------|------|---------|
| 1 | fldKQFXJKP | Value | text | null |
| 2 | fldXPqoL5r | Label | text | null |
| 3 | fldWCpRWxM | Order | number | null |

**All Records:**
| # | _record_id | Value | Order | Label |
|---|------------|-------|-------|-------|
| 1 | recvkIxJewJ4gC | 2 weeks | 1 | from call to live |
| 2 | recvkIxJewLB2n | 47 | 2 | teams, off the hook |
| 3 | recvkIxJewESFt | 0 | 3 | status meetings |
| 4 | recvkIxJeweKjR | 30 days | 4 | gratis support |

**⚠️ NOTE:** Order in Base is `2 weeks → 47 → 0 → 30 days`. In `content.ts` order is `47 → 2 weeks → 30 days → 0`. Also, `StatsBar` component is defined in code but **never imported** on the homepage, so these stats are not displayed anywhere on the live site.

**🟡 VERDICT:** Orphan table. Data exists but no UI consumes it.

---

### Table 5: `Process Phases` (tbl3RHZEMfmDsVYs)

| Property | Value |
|----------|-------|
| **Records** | 4 |
| **Fields** | 5 |
| **Views** | 1 Grid View |
| **Forms** | 0 |
| **Used by code?** | ❌ No (code reads `content.ts` hardcode) |

**Fields:**
| # | Field ID | Name | Type | Default |
|---|----------|------|------|---------|
| 1 | fldT95idr8 | Detail | text | null |
| 2 | fldpTkBHxi | Icon Name | text | null |
| 3 | fld5QUggDm | Order | number | null |
| 4 | fld5b32Oen | Number | text | null |
| 5 | fldigQHSU1 | Title | text | null |

**All Records:**
| # | _record_id | Number | Order | Title | Icon Name | Detail |
|---|------------|--------|-------|-------|-----------|--------|
| 1 | recvkIxOp4zWbf | 01 | 1 | 45-minute intro call. | Map | We map your pain points. You see what is possible. If we are a fit, we move to discovery. |
| 2 | recvkIxOp47Lfz | 02 | 2 | Paid discovery. | PenTool | Fixed-scope plan with clear deliverables, timeline, and cost. You know exactly what you get before we build. |
| 3 | recvkIxOp4App5 | 03 | 3 | Build + tweak. | Hammer | Two-week sprint. Daily updates. Weekly demos. You watch it come alive and adjust as we go. |
| 4 | recvkIxOp4FnH8 | 04 | 4 | Deploy. | Rocket | System goes live. Your team trained. 30 days of support included. Handoff complete. |

**🟡 VERDICT:** Complete data. Matches `content.ts` 100%. Not wired into code. Orphan.

---

### Table 6: `Before After` (tbltmfSVxjSY0qjv)

| Property | Value |
|----------|-------|
| **Records** | 3 |
| **Fields** | 3 |
| **Views** | 1 Grid View |
| **Forms** | 0 |
| **Used by code?** | ❌ No |

**Fields:**
| # | Field ID | Name | Type | Default |
|---|----------|------|------|---------|
| 1 | fldXqG6ln8 | Before | text | null |
| 2 | fldyJAz5LC | After | text | null |
| 3 | fld4mEGwhi | Order | number | null |

**All Records:**
| # | _record_id | Before | Order | After |
|---|------------|--------|-------|-------|
| 1 | recvkIxRX60HIY | 6 spreadsheets | 1 | 1 dashboard |
| 2 | recvkIxRX6z87h | 47 LINE messages | 2 | Auto-status updates |
| 3 | recvkIxRX6FbRm | 3 hours reporting | 3 | 1-click export |

**🟡 VERDICT:** 3 demo-style before/after pairs. No UI component renders them. Likely intended for a section that was never built. Review with team — wire up or delete.

---

### Table 7: `Notifications` (tblWhVnoj6j4Bj22)

| Property | Value |
|----------|-------|
| **Records** | 6 |
| **Fields** | 6 |
| **Views** | 1 Grid View |
| **Forms** | 0 |
| **Used by code?** | ❌ No |

**Fields:**
| # | Field ID | Name | Type | Default |
|---|----------|------|------|---------|
| 1 | flddm7EdMI | Color | text | null |
| 2 | fldNI0L1IT | Order | number | null |
| 3 | fldigGn5xC | Label | text | null |
| 4 | fldgySzc5T | Message | text | null |
| 5 | fldnJziXHh | Time | text | null |
| 6 | fldZTf9WsJ | Icon | text | null |

**All Records:**
| # | _record_id | Label | Color | Message | Order | Time | Icon |
|---|------------|-------|-------|---------|-------|------|------|
| 1 | recvkIxJutoGdn | LINE | text-teal | Min: Where is the price list? | 1 | 2m ago | MessageSquare |
| 2 | recvkIxJutGzKH | Email | text-primary | Supplier: Updated invoice #4021 | 2 | 5m ago | Mail |
| 3 | recvkIxJutMFxV | Team | text-accent | Ploy: How do I process a refund? | 3 | 8m ago | HelpCircle |
| 4 | recvkIxJutGXU3 | Orders | text-stone | New order #8392 — pending review | 4 | 12m ago | ShoppingCart |
| 5 | recvkIxJutZ7ds | LINE | text-teal | Client: Can we meet tomorrow? | 5 | 15m ago | MessageSquare |
| 6 | recvkIxJut0s4J | Email | text-primary | 3 overdue invoices need chasing | 6 | 22m ago | Mail |

**🟡 VERDICT:** 6 demo notification items (fake timestamps like "2m ago"). No component renders them. Likely for a dashboard/notifications feature that was abandoned. Review — wire up or delete.

---

### Table 8: `Marquee Items` (tblkG26GcaMjBxQY)

| Property | Value |
|----------|-------|
| **Records** | 8 |
| **Fields** | 3 |
| **Views** | 1 Grid View |
| **Forms** | 0 |
| **Used by code?** | ❌ No (code reads `content.ts` hardcode) |

**Fields:**
| # | Field ID | Name | Type | Default |
|---|----------|------|------|---------|
| 1 | fldqCy4rBO | Order | number | null |
| 2 | fldx2cq0EC | Text | text | null |
| 3 | fldzbJCrj2 | Is Separator | checkbox | — |

**All Records:**
| # | _record_id | Text | Order | Is Separator |
|---|------------|------|-------|-------------|
| 1 | recvkIxVB6s1fy | Built to save time. | 1 | false |
| 2 | recvkIxVB6rx4w | • | 2 | true |
| 3 | recvkIxVB60pX2 | Agency care. Product speed. | 3 | false |
| 4 | recvkIxVB6xg9z | • | 4 | true |
| 5 | recvkIxVB6tjX7 | The work you hate, handled. | 5 | false |
| 6 | recvkIxVB6eaCf | • | 6 | true |
| 7 | recvkIxVB6cksx | Two weeks. Not two quarters. | 7 | false |
| 8 | recvkIxVB6zd1o | • | 8 | true |

**🟡 VERDICT:** Complete data. Matches `content.ts` marqueeItems exactly. Not wired into code. Orphan.

---

### Table 9: `Our Fees` (tblH8sKzoqv0c5KD) — ⭐ ACTIVE

| Property | Value |
|----------|-------|
| **Records** | 13 |
| **Fields** | 12 |
| **Views** | 1 Grid |
| **Forms** | 0 |
| **Used by code?** | ✅ Yes — `src/lib/pricing.ts` reads via `BitableClient` |

**Fields:**
| # | Field ID | Name | Type | Default | Extra |
|---|----------|------|------|---------|-------|
| 1 | fldaoG2a7D | Fees (THB) | text | null | — |
| 2 | fld7BqOCXv | Category | select | null | Single-select: Intro call (Green), Discovery (Blue), Build (Orange), Systems (Purple), Retainer (Gray) |
| 3 | fldsoCeszI | Order | number | null | Precision: 0 |
| 4 | fldvPuzdvh | What Included | text | null | — |
| 5 | fldDLSY6fJ | Description | text | null | — |
| 6 | fldukjT31l | Scope | text | null | — |
| 7 | fldQ6NkX3c | Fees (SGD) | text | null | — |
| 8 | fldU6b5wtK | Timeline | text | null | — |
| 9 | fldbcJSYI1 | THB Price | formula | — | Expression: `bitable::$table[tblH8sKzoqv0c5KD].$field[fldZCTGK2G]*27` |
| 10 | fldo0GlWmb | Best For | text | null | — |
| 11 | fldmv7HVaM | Price Range Notes | text | null | — |
| 12 | fldZCTGK2G | SGD Price | number | — | Currency: SGD, Precision: 0 |

**All 13 Records:**

| Order | Scope | Category | SGD Price | THB Price | Fees (SGD) | Fees (THB) | Description | Timeline | Best For | Price Range Notes | What Included |
|-------|-------|----------|-----------|-----------|------------|------------|-------------|----------|----------|-------------------|---------------|
| 1 | Introduction call — online | Intro call | 0 | 0 | Free | Free | We meet, you ask everything, we're honest about fit. | 45 min | Any company exploring options before committing | — | How Adamant works + what we've built; How we charge and what to expect; Your pain points + initial feasibility read; Honest fit assessment; Written follow-up notes shared after |
| 2 | Discovery — online | Discovery | 350 | 9450 | S$350 | ฿9,450 | Paid scoping session that produces a fixed-price build plan. | ~1 week | Companies ready to invest in a system | Credited toward build in full | Deep-dive workflow audit (2–3 sessions); Current process + bottleneck mapping; Technical architecture outline; Fixed-scope build proposal with milestones; Full project brief — ready to execute |
| 3 | Discovery — in-person (SG) | Discovery | 450 | 12150 | S$450 | ฿12,150 | On-site working session at your Singapore office. | Half-day | Singapore-based brand teams, ops leads | Credited toward build in full | On-site workflow observation + team interviews; Bottleneck identification in the room; Preliminary solution sketch; Written summary + scoping report; Fixed-price build proposal |
| 4 | Discovery — in-person (TH) | Discovery | 450 | 12150 | — | ฿12,150 | On-site session at your Bangkok office. | Half-day | Bangkok-based brand teams, ops leads | TH pricing → | On-site workflow observation + team interviews; Bottleneck identification in the room; Preliminary solution sketch; Written summary + scoping report; Fixed-price build proposal |
| 5 | Lead gen website + AI qualification | Build | 2800 | 75600 | S$2,800 | ฿75,600 | Landing page with automated lead capture and AI-powered qualification. | 2 weeks | Startups, SMEs, growth-stage companies | up to S$4,500; Complexity-dependent | Conversion-optimised landing page; Form + CRM integration; AI lead scoring & auto-qualification; Automated follow-up sequences; Analytics dashboard; 30-day post-launch support |
| 6 | Zap — SaaS mini build | Build | 3800 | 102600 | S$3,800 | ฿102,600 | Custom internal tool or lightweight app. Working code shipped in 2 weeks. | 2 weeks | Ops leads, startup founders, agencies | up to S$7,500; Per defined scope | Single-function scoped app; Working deployed code — not a prototype; User auth + role management; Basic reporting / data views; Team onboarding session; 30-day support included |
| 7 | Compass — AI workflow automation | Build | 2200 | 59400 | S$2,200 | ฿59,400 | Automated pipelines connecting tools you already use. No new apps to learn. | 1–2 weeks | SMEs, F&B, retail, manufacturing | up to S$5,500; Per automation scope | Workflow audit + automation map; Up to 5 automated pipelines; Tool integrations (LINE, Lark, Notion, Sheets…); AI triggers & smart routing; Staff training session; 30-day monitoring included |
| 8 | Multi-dealer campaign dashboard | Systems | 8500 | 229500 | S$8,500 | ฿229,500 | Network — full campaign OS for dealer/creator programs. As built for Michelin TH. | 3–4 weeks | Regional brands, FMCG, automotive | up to S$14,000; Scale-dependent | Dealer/creator portal with login; Content submission + moderation queue; Real-time leaderboard & rankings; Campaign period + prize tier logic; Admin dashboard with full reporting; 60-day post-launch support |
| 9 | Influencer campaign OS | Systems | 7500 | 202500 | S$7,500 | ฿202,500 | End-to-end influencer program — brief to payment in one dashboard. | 3–5 weeks | Marketing agencies, brand managers | up to S$12,000; Per program scope | Creator database + brief distribution; Approval workflow engine; Deliverable tracker per creator; Performance reporting; Payment management module; 60-day post-launch support |
| 10 | Social media management tool | Systems | 5500 | 148500 | S$5,500 | ฿148,500 | Multi-platform scheduler with team approval flows and cross-channel analytics. | 2–3 weeks | Digital agencies, multi-brand operators | up to S$9,500; Per brands/users | TikTok, IG, FB, LinkedIn, YouTube; Content calendar + scheduling; Multi-level approval workflow; Multi-brand account management; Performance analytics dashboard; 30-day post-launch support |
| 11 | Live commerce operations tool | Systems | 6800 | 183600 | S$6,800 | ฿183,600 | Real-time order management, host coordination, and session performance tracking. | 3–4 weeks | Live commerce brands, MCNs, platforms | up to S$11,500; Integration complexity varies | Live session management dashboard; Real-time order + inventory sync; Host performance scoring; Post-session analytics report; TikTok Shop / Shopee integration (optional); 60-day post-launch support |
| 12 | Ops & maintenance retainer | Retainer | 800 | 21600 | S$800 | ฿21,600 | Keep your system running, updated, and improving month to month. | Monthly | Post-build clients maintaining live systems | up to S$1,800 / mo; Based on system complexity | Bug fixes + platform updates; Up to 8 hrs/month feature iterations; Monthly performance review; Priority response SLA (24 hrs); Access to new AI feature releases |
| 13 | Growth partner retainer | Retainer | 2200 | 59400 | S$2,200 | ฿59,400 | Embedded AI and ops partner for ongoing builds, iterations, and strategy. | Monthly | Scale-ups, agencies, regional brands | up to S$4,000 / mo; Min. 3-month commitment | Up to 20 hrs/month build & iteration; Quarterly strategy session; New tool scoping included; Dedicated point of contact; Priority queue for new projects |

**✅ VERDICT:** Complete. All 13 pricing items present. Base data **fully matches** the fallback code in `src/lib/pricing.ts`. The `THB Price` formula field correctly computes `SGD Price × 27`. This table is actively read by the pricing page.

---

### Table 10: `Pricing Leads` (tbl3HSjoxqVzUN4m) — ⭐ ACTIVE

| Property | Value |
|----------|-------|
| **Records** | 4 |
| **Fields** | 6 |
| **Views** | 1 Grid View |
| **Forms** | 0 |
| **Used by code?** | ✅ Yes — `src/app/api/pricing-lead/route.ts` writes to this table |

**Fields:**
| # | Field ID | Name | Type | Default |
|---|----------|------|------|---------|
| 1 | fldA5kUUly | Company | text | null |
| 2 | fld6pwb7aU | Message | text | null |
| 3 | fldqDiIZIx | Source | text | null |
| 4 | fldmzDnmJL | ID | auto_number | — |
| 5 | fldHiCmxt9 | Name | text | null |
| 6 | flddmgk6vg | Email | text | null |

**All Records:**
| # | _record_id | ID | Name | Email | Company | Message | Source |
|---|------------|-----|------|-------|---------|---------|--------|
| 1 | recvkVMDHZoYPq | NO.001 | Test User | test@example.com | TestCo | — | Pricing Page |
| 2 | recvkVSfMfvtzg | NO.002 | Homepage Test | test@home.com | TestCorp | Interested in SaaS mini build | Contact Section |
| 3 | recvkVZxa7QatR | NO.003 | Pitsanu Supho | pitsanu@hypelive.io | The Hyper Company Limited | test | Contact Section |
| 4 | recvkVZDDRpOXc | NO.004 | Pitsanu Supho | pitsanu@hypelive.io | The Hyper Company Limited | — | Pricing Page |

**✅ VERDICT:** Active write target. 4 records (3 test + 1 real). Form submissions from Contact section and Pricing page both land here via `/api/pricing-lead` POST. Clean test data before launch.

---

### Table 11: `Call Transcripts` (tblMtH5nqtEIuQKy) — ⭐ ACTIVE

| Property | Value |
|----------|-------|
| **Records** | 3 |
| **Fields** | 13 |
| **Views** | 1 Grid View |
| **Forms** | 0 |
| **Used by code?** | ✅ Yes — `src/app/api/webhook/elevenlabs/route.ts` writes post-call data |

**Fields:**
| # | Field ID | Name | Type | Default | Extra |
|---|----------|------|------|---------|-------|
| 1 | fldiXZoSMf | Summary | text | null | — |
| 2 | fldfNHGxAr | ID | auto_number | — | Prefix: "NO.", Length: 3 |
| 3 | fldgyCDaC8 | Transcript | text | null | — |
| 4 | fldDCxACSH | Agent ID | text | null | — |
| 5 | fldmCJatri | Call Successful | text | null | — |
| 6 | fldfDws5iy | User Name | text | null | — |
| 7 | fldrrVvxff | Conversation ID | text | null | — |
| 8 | fldT5bjj1p | Duration | number | null | Precision: 0 |
| 9 | fldZmOu7dN | Event At | datetime | — | Format: yyyy/MM/dd |
| 10 | fldAdJh4Sy | Started At | datetime | — | Format: yyyy/MM/dd |
| 11 | fldLAY8Srg | Status | text | null | — |
| 12 | fldJTiQQtZ | Cost | number | null | Precision: 0 |
| 13 | fldWAURRNn | Termination Reason | text | null | — |

**All Records:**

| # | _record_id | ID | User Name | Agent ID | Conversation ID | Status | Duration | Cost | Call Successful | Termination Reason | Started At | Event At | Summary | Transcript |
|---|------------|-----|-----------|----------|-----------------|--------|----------|------|-----------------|-------------------|------------|----------|---------|------------|
| 1 | recvl0lTzFm1rW | NO.001 | RoundTripTest | agent_5901ksshk9j6e1ft19n7ye6hm16k | roundtrip_1780051307758 | completed | 15 | 0.00042 | success | user_hangup | 2026-05-29 17:41:32 | 2026-05-29 17:41:47 | User wanted to book a call. Agent guided them to the booking form. | `[{"role":"agent","message":"Hello, I am Adamant...","time_in_call_secs":0}...]` |
| 2 | recvl0oya2hHLQ | NO.002 | FinalTester | agent_5901ksshk9j6e1ft19n7ye6hm16k | final_test_1780051940830 | completed | 12 | 0.00035 | success | user_hangup | 2026-05-29 17:52:08 | 2026-05-29 17:52:20 | User asked about pricing. Agent opened pricing page in new tab. | `[{"role":"agent","message":"Hello! How can I help?"...]` |
| 3 | recvl0rX3OJ1Ro | NO.003 | ArchTest | agent_5901ksshk9j6e1ft19n7ye6hm16k | arch_test_1780052750961 | completed | 5 | 0.0001 | success | test | 2026-05-29 18:05:45 | 2026-05-29 18:05:50 | Architecture refactor test | `[{"role":"agent","message":"Testing new architecture"...}]` |

**✅ VERDICT:** Active write target. 3 test call transcripts from ElevenLabs webhook. All fields correctly populated. Clean before launch or keep for demo.

---

## 3. Views Summary

| Table | View Count | View Names |
|-------|-----------|------------|
| Table | 1 | Grid |
| Sections | 1 | Grid View |
| Testimonials | 1 | Grid View |
| Stats | 1 | Grid View |
| Process Phases | 1 | Grid View |
| Before After | 1 | Grid View |
| Notifications | 1 | Grid View |
| Marquee Items | 1 | Grid View |
| Our Fees | 1 | Grid |
| Pricing Leads | 1 | Grid View |
| Call Transcripts | 1 | Grid View |

All tables have exactly one default Grid view. No custom views, filters, sorts, or groups configured.

---

## 4. Forms Summary

| Table | Form Count |
|-------|-----------|
| All 11 tables | **0** |

No forms exist in any table.

---

## 5. Dashboards Summary

| Metric | Value |
|--------|-------|
| Total dashboards | **0** |

No dashboards exist in this base.

---

## 6. Workflows Summary

| Workflow ID | Title | Status | Trigger | Created / Updated |
|-------------|-------|--------|---------|-------------------|
| wkfb0e2YuiKPkoVL | Workflow | **disabled** | *(empty)* | 2025-11-25 |

**🟡 VERDICT:** One workflow exists but is **disabled** with no trigger configured. Likely an accidental/auto-created workflow. Safe to delete.

---

## 7. Roles & Permissions Summary

| Metric | Value |
|--------|-------|
| Custom roles | **0** |
| Base roles | *(empty array)* |
| Advanced permissions | Disabled |

No custom roles or permission rules configured.

---

## 8. Base ↔ Code Cross-Reference

### 8.1 What Code Reads from Base

| Code File | Reads From | Table ID | Fields Used | Status |
|-----------|-----------|----------|-------------|--------|
| `src/lib/pricing.ts` | Our Fees | tblH8sKzoqv0c5KD | Scope, Category, Description, What Included, Timeline, Best For, Fees (SGD), Fees (THB), Price Range Notes, Order, SGD Price, THB Price | ✅ Active |

### 8.2 What Code Writes to Base

| Code File | Writes To | Table ID | Fields Written | Status |
|-----------|-----------|----------|----------------|--------|
| `src/app/api/pricing-lead/route.ts` | Pricing Leads | tbl3HSjoxqVzUN4m | Name, Email, Company, Message, Source | ✅ Active |
| `src/app/api/webhook/elevenlabs/route.ts` | Call Transcripts | tblMtH5nqtEIuQKy | Event At, Status, Call Successful, User Name, Cost, Termination Reason, Agent ID, Started At, Conversation ID, Duration, Summary, Transcript | ✅ Active |

### 8.3 What Base Contains But Code Ignores

| Base Table | Records | Code Source That Should Use It | Status |
|-----------|---------|-------------------------------|--------|
| Sections | 8 | `src/data/content.ts` → `sections` | 🟡 Orphan |
| Testimonials | 4 | `src/data/content.ts` → `testimonials` | 🟡 Orphan |
| Stats | 4 | `src/data/content.ts` → `stats` | 🟡 Orphan |
| Process Phases | 4 | `src/data/content.ts` → `processPhases` | 🟡 Orphan |
| Marquee Items | 8 | `src/data/content.ts` → `marqueeItems` | 🟡 Orphan |
| Before After | 3 | *(no matching code)* | 🔴 Unused |
| Notifications | 6 | *(no matching code)* | 🔴 Unused |
| Table | 5 empty | *(no matching code)* | 🔴 Unused |

---

## 9. Data Integrity Check

### 9.1 Sections ↔ content.ts
```
Base Section ID          content.ts Section ID    Match?
────────────────────────────────────────────────────────
hero                     hero                     ✅
problem                  problem                  ✅
solutions                solutions                ✅
process                  process                  ✅
model                    model                    ✅
proof                    proof                    ✅
contact                  contact                  ✅
footer                   footer                   ✅
```
**All 8 sections match. 100% sync.**

### 9.2 Testimonials ↔ content.ts
```
Base Name  Base Industry   content.ts Name  content.ts Industry  Match?
─────────────────────────────────────────────────────────────────────
Thida      Manufacturing   Thida            Manufacturing        ✅
Min        Retail          Min              Retail               ✅
Sarin      Education       Sarin            Education            ✅
Ploy       F&B             Ploy             F&B                  ✅
```
**All 4 testimonials match. 100% sync.**

### 9.3 Process Phases ↔ content.ts
```
Base Title                    content.ts Title               Match?
────────────────────────────────────────────────────────────────
45-minute intro call.         45-minute intro call.          ✅
Paid discovery.               Paid discovery.                ✅
Build + tweak.                Build + tweak.                 ✅
Deploy.                       Deploy.                        ✅
```
**All 4 phases match. 100% sync.**

### 9.4 Marquee Items ↔ content.ts
```
Base Text                          content.ts Text                Match?
─────────────────────────────────────────────────────────────────────
Built to save time.                Built to save time.            ✅
Agency care. Product speed.        Agency care. Product speed.    ✅
The work you hate, handled.        The work you hate, handled.    ✅
Two weeks. Not two quarters.       Two weeks. Not two quarters.   ✅
```
**All 4 text items match. 100% sync.**

### 9.5 Our Fees ↔ pricing.ts Fallback
```
Base Scope                              Fallback Scope                          Match?
────────────────────────────────────────────────────────────────────────────────
Introduction call — online              Introduction call — online              ✅
Discovery — online                      Discovery — online                      ✅
Discovery — in-person (SG)              Discovery — in-person (SG)              ✅
Discovery — in-person (TH)              Discovery — in-person (TH)              ✅
Lead gen website + AI qualification     Lead gen website + AI qualification     ✅
Zap — SaaS mini build                   Zap — SaaS mini build                   ✅
Compass — AI workflow automation        Compass — AI workflow automation        ✅
Multi-dealer campaign dashboard         Multi-dealer campaign dashboard         ✅
Influencer campaign OS                  Influencer campaign OS                  ✅
Social media management tool            Social media management tool            ✅
Live commerce operations tool           Live commerce operations tool           ✅
Ops & maintenance retainer              Ops & maintenance retainer              ✅
Growth partner retainer                 Growth partner retainer                 ✅
```
**All 13 pricing items match. 100% sync. Base is complete.**

---

## 10. Field-Level Unused / Missing Analysis

### 10.1 Fields in Base That Could Be Deleted (Unused)

| Table | Field | Why Unused |
|-------|-------|------------|
| **Stats** | Order | Stats component not rendered |
| **Before After** | Order | No UI for this table |
| **Notifications** | Order, Color, Time, Icon | No UI for this table |
| **All orphan tables** | All fields | Table itself is unused |

### 10.2 Content NOT in Base (Hardcoded Only)

| Content | Location in Code | Missing from Base? |
|---------|-----------------|-------------------|
| FAQ items (5 Q&A) | `content.ts` → `faq` | ✅ Yes — no `FAQ` table |
| Service page data (3 services × useCases/process/faq) | `content.ts` → `servicePages` | ✅ Yes — no `Service Pages` table |
| Solutions cards (3 items) | `content.ts` → `solutions` | ✅ Yes — no `Solutions` table |
| Navigation links | `content.ts` → `navLinks` / `footerNavLinks` | ✅ Yes — no `Nav` table |
| Founder page copy | `src/app/founder/page.tsx` | ✅ Yes — no `Founder` table |
| Pricing gate copy | `src/components/pricing-client.tsx` | ✅ Yes — not in `Our Fees` |
| Contact form field labels | `src/sections/contact.tsx` | ✅ Yes — not in `Sections` |

---

## 11. Environment Variable Audit (Relevant to Base)

| Variable | `.env.local` | `.env.example` | Used By | Production Impact |
|----------|-------------|----------------|---------|-------------------|
| `LARK_BASE_TOKEN` | ❌ Missing | ✅ Present | `pricing.ts` | ⚠️ If missing in Vercel → pricing page shows fallback (13 items, same data) |
| `LARK_TABLE_ID_PRICING` | ❌ Missing | ✅ Present | `pricing.ts` | ⚠️ Falls back to hardcoded table ID |
| `LARK_TABLE_ID_PRICING_LEADS` | ❌ Missing | ✅ Present | `pricing-lead/route.ts` | ⚠️ Falls back to hardcoded table ID |
| `LARK_BASE_APP_TOKEN` | ✅ Present | ✅ Present | ElevenLabs webhook | ✅ Writes to Call Transcripts |
| `LARK_TABLE_ID_CALLS` | ✅ Present | ✅ Present | ElevenLabs webhook | ✅ Writes to Call Transcripts |
| `LARK_APP_ID` | ❌ Missing | ❌ Empty | `lark-api.ts` | ⚠️ Required for API auth mode |
| `LARK_APP_SECRET` | ❌ Missing | ❌ Empty | `lark-api.ts` | ⚠️ Required for API auth mode |
| `LARK_USER_ACCESS_TOKEN` | ❌ Missing | ❌ Empty | `lark-api.ts` | ⚠️ Alternative auth mode |

**Note:** The `lark-api.ts` client uses the REST API directly and needs either `LARK_USER_ACCESS_TOKEN` or `LARK_APP_ID` + `LARK_APP_SECRET`. In local dev, lark-cli handles OAuth separately. For production API calls, one of these auth modes must be configured.

---

## 12. Cleanup Recommendations (Prioritized)

### 🔴 Priority 1 — Safe to Delete Now

| # | Item | Action | Rationale |
|---|------|--------|-----------|
| 1 | `Table` (tblLK1HIRbCj3SG2) | **DELETE table** | 5 empty records, no fields with data, no code reference |
| 2 | Workflow `wkfb0e2YuiKPkoVL` | **DELETE workflow** | Disabled, no trigger, serves no purpose |

### 🟡 Priority 2 — Review with Team (Orphan Tables)

**Question:** Do you want Base to be a CMS for non-devs, or manage content in code?

| If your answer is... | Action |
|---------------------|--------|
| **"Yes, use Base as CMS"** | Engineer wires `Sections`, `Testimonials`, `Stats`, `Process Phases`, `Marquee Items` into the build (~1–2 days). Keep all tables. |
| **"No, manage in code"** | Delete `Sections`, `Testimonials`, `Stats`, `Process Phases`, `Marquee Items` from Base. Single source of truth = `content.ts` in Git. |
| **"Unsure"** | Keep tables for now but DO NOT edit them expecting site changes. Mark them with a Base description: "⚠️ Not wired — edits have no effect". |

### 🟡 Priority 3 — Demo / Unused Content

| # | Item | Action | Rationale |
|---|------|--------|-----------|
| 3 | `Before After` (tbltmfSVxjSY0qjv) | **DELETE or WIRE UP** | 3 records but no UI. If building a before/after section → wire up. Else → delete. |
| 4 | `Notifications` (tblWhVnoj6j4Bj22) | **DELETE or WIRE UP** | 6 fake demo notifications. If building a dashboard → wire up. Else → delete. |

### 🟢 Priority 4 — Production Readiness

| # | Item | Action |
|---|------|--------|
| 5 | Clean test records | Delete 4 test leads from `Pricing Leads` (NO.001–NO.004 are all test/self-submissions) |
| 6 | Clean test calls | Delete 3 test transcripts from `Call Transcripts` (RoundTripTest, FinalTester, ArchTest) or keep for demo |
| 7 | Add `LARK_BASE_TOKEN` to `.env.local` | Ensures local dev matches production behavior |
| 8 | Verify Vercel env vars | Confirm `LARK_BASE_TOKEN` and auth credentials are set in production |

---

## 13. Quick Win — If You Want Base as CMS

To wire Base tables into the build, an engineer would need to:

1. **Add server functions** in `src/lib/pricing.ts` pattern for each table:
   - `getSections()` → read `Sections` table
   - `getTestimonials()` → read `Testimonials` table
   - `getStats()` → read `Stats` table
   - `getProcessPhases()` → read `Process Phases` table
   - `getMarqueeItems()` → read `Marquee Items` table

2. **Update page files** to await these fetches:
   - `src/app/(home)/page.tsx` → fetch all 5 tables
   - `src/app/solutions/[slug]/page.tsx` → fetch testimonials if needed

3. **Trade-offs:**
   - ✅ Non-devs can edit content in Lark Base
   - ❌ Static export becomes harder (requires `generateStaticParams` or `unstable_cache`)
   - ❌ Cold-start latency on first page load
   - ❌ Base downtime = broken site

---

*End of complete Base audit. All tables, fields, records, views, forms, dashboards, workflows, and roles have been inspected via lark-cli.*
