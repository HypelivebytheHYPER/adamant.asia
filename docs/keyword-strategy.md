# Adamant Keyword Strategy

> Keyword clusters mapped to pages, based on Adamant's two practices and Southeast Asia focus.
> 
> **Note:** Google Keyword Planner API is not currently connected (no Google Ads API credentials in the project). The clusters below are derived from Adamant's service positioning, GSC query data, and Southeast Asia search intent. Validate search volumes manually in Google Keyword Planner or Ahrefs/SEMrush before prioritizing.

## Current GSC snapshot (last 90 days)

Only **6 unique queries** drove impressions:

| Query | Impressions | Position | Category |
|---|---|---|---|
| adamant | 14 | 60.2 | Generic-Ambiguous |
| adamant agency | 2 | 6.5 | Brand-Modifier |
| adamant meaning in bengali | 2 | 54.5 | Noise |
| adamant meaning in malayalam | 2 | 53.5 | Noise |
| adamant personalberatung | 1 | 93.0 | Noise |
| *(long KOL query)* | 1 | 6.0 | Target-Commercial |

**Takeaway:** The site is barely visible for commercial intent. Most impressions are brand/dictionary noise. We need dedicated, optimized pages for each service cluster.

---

## Page-level keyword clusters

### 1. Homepage `/`
**Primary intent:** Brand + umbrella positioning
**Primary keywords:**
- Adamant Asia
- Adamant Singapore
- Adamant verification intelligence
- KYC AML AI advisory Southeast Asia

**Supporting keywords:**
- verification and AI advisory Singapore
- due diligence and AI automation agency
- business verification Southeast Asia

---

### 2. Adamant Verify `/verify`
**Primary intent:** Due diligence, KYC/AML, background checks
**Primary keywords:**
- KYC services Singapore
- KYB Singapore
- AML screening Singapore
- due diligence services Singapore
- background check Singapore
- counterparty verification Southeast Asia
- vendor due diligence Singapore
- beneficiary verification Singapore

**Supporting / long-tail:**
- KYC for businesses Singapore
- KYB checks for suppliers
- AML compliance screening
- ongoing monitoring KYC
- PDPA compliant background checks
- pre-investment due diligence Singapore
- director verification Singapore
- entity verification Southeast Asia
- reputational due diligence Singapore
- adverse media screening

**Content gaps to fill:**
- "What is KYC/KYB?"
- "AML screening process"
- "Due diligence report sample"
- "Singapore PDPA compliance checks"

---

### 3. Adamant AI `/ai`
**Primary intent:** AI agency, SaaS builds, automation
**Primary keywords:**
- AI agency Singapore
- SaaS development agency Singapore
- custom SaaS build Singapore
- AI workflow automation Singapore
- no-code automation agency
- AI tools for business Singapore
- SaaS mini build
- build SaaS in two weeks

**Supporting / long-tail:**
- AI automation for SMEs Singapore
- custom internal tools Singapore
- business process automation Singapore
- AI workflow consultant
- SaaS MVP development Singapore
- rapid SaaS prototyping
- AI agency vs traditional agency
- AI implementation Singapore

**Content gaps to fill:**
- "AI workflow automation examples"
- "SaaS mini build process"
- "How much does custom SaaS cost?"
- "AI agency vs software agency"

---

### 4. Marketing Systems (under `/ai` or dedicated `/solutions/marketing-system`)
**Primary intent:** Influencer / KOL marketing systems
**Primary keywords:**
- influencer marketing system Singapore
- KOL management platform
- creator campaign tracking
- marketing automation Singapore
- influencer pipeline Singapore
- KOL leaderboard system
- TikTok creator campaign tracking

**Supporting / long-tail:**
- influencer CRM Singapore
- KOL campaign management
- creator performance tracking
- automate influencer reporting
- influencer marketing dashboard
- TikTok Shop influencer tracking

**Note:** Currently `/solutions/kol-leaderboard` exists and ranks for some impressions. Consider expanding into a broader `/solutions/marketing-system` pillar page.

---

### 5. Pricing `/pricing`
**Primary intent:** Cost inquiry
**Primary keywords:**
- Adamant pricing
- KYC due diligence cost Singapore
- SaaS build cost Singapore
- AI automation pricing
- due diligence report price

**Supporting:**
- how much does KYC cost
- SaaS development cost Singapore
- AI agency rates Singapore

---

### 6. Founder `/founder`
**Primary intent:** About / trust / credibility
**Primary keywords:**
- Adamant founder
- Adamant team Singapore
- about Adamant Asia
- Adamant leadership

---

### 7. Case Studies `/case-studies`
**Primary intent:** Proof / examples
**Primary keywords:**
- Adamant case studies
- KYC due diligence case study Singapore
- SaaS build case study Singapore
- AI automation case study

---

### 8. Insights `/insights` (blog)
**Primary intent:** Educational SEO
**Primary keywords:**
- KYC best practices Singapore
- KYB process guide
- AML screening guide
- AI automation guide
- SaaS build checklist
- influencer marketing KPIs
- Southeast Asia due diligence guide

**Pillar content ideas:**
- "The Complete Guide to KYC/KYB in Singapore"
- "AML Screening Checklist for Southeast Asia"
- "How to Build a Custom SaaS Tool in 2 Weeks"
- "AI Workflow Automation: 40 Tasks You Can Eliminate"
- "KOL Marketing System: Tracking Creators Across TikTok, Instagram, YouTube"

---

## Priority action plan

### Immediate (this week)
1. **Expand `/verify` page copy** with KYC/KYB/AML/due diligence sections targeting the primary keywords above.
2. **Expand `/ai` page copy** with SaaS build, AI workflow automation, and marketing system sections.
3. **Add internal links** from homepage to `/verify` and `/ai` using exact-match anchor text (already partially done).
4. **Create 2–3 blog posts** in `/insights` targeting long-tail educational keywords.

### Short-term (next 2–4 weeks)
5. **Build dedicated service pages** under `/solutions/`:
   - `/solutions/kyc-kyb`
   - `/solutions/aml-screening`
   - `/solutions/due-diligence`
   - `/solutions/ai-workflow-automation`
   - `/solutions/marketing-system`
6. **Update sitemap** to include new pages once built.
7. **Connect Google Ads API / Keyword Planner** for volume validation (requires Google Ads account + API access).

### Ongoing
8. **Run `/api/gsc/sync` daily** so the Keywords master in Lark Base captures real queries.
9. **Review GSC queries monthly** and move high-impression/low-CTR terms into target page optimizations.
10. **Build backlinks** from Singapore/Southeast Asia business directories and fintech publications.

---

## Tools needed for validation

| Tool | Use | Status |
|---|---|---|
| Google Keyword Planner | Search volume + competition | Not connected (needs Google Ads API) |
| GSC | Existing query data | ✅ Working |
| Ahrefs / SEMrush | Competitor keywords + difficulty | Not subscribed |
| Lark Base Keywords master | Track target positions | ✅ Set up |

---

## Next step

To use Google Keyword Planner automatically, we need:
1. A Google Ads account with billing set up
2. A Google Ads API developer token
3. API client credentials with AdWords API scope
4. The account added as a user on the target MCC/account

If you can provide these, I can wire up an automated keyword discovery pipeline. Until then, I recommend validating the clusters above manually in the Keyword Planner web UI and prioritizing by search volume × commercial intent.
