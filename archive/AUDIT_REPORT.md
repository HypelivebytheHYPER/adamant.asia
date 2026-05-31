# SEO Audit Report — Adamant.asia

**Date:** 2026-05-28
**Scope:** 6 pages (/, /demo, /founder, /solutions/* ×3)
**Site type:** SaaS / Agency hybrid landing page
**Primary goal:** Lead generation (book scope call)

---

## Executive Summary

| Category | Score | Verdict |
|----------|-------|---------|
| Technical SEO | 6/10 | Core infrastructure OK, critical image gap |
| On-Page SEO | 5/10 | Good meta copy, poor heading hierarchy, thin content on sub-pages |
| Off-Page SEO | 2/10 | No backlinks, no social signals, no citations |
| Content | 5/10 | Emotional copy is strong, but thin and no media |
| PageSpeed | 7/10 | Static + pre-rendered, but unoptimized images |

**Top 3 Priority Issues:**
1. **OG images missing** — Every single page. Social shares show no preview image.
2. **Solution pages have ZERO images** — Text-only pages are SEO dead weight.
3. **No external backlinks signal** — Google cannot determine domain authority.

**Quick Win:** Add OG images + 2–3 product screenshots per solution page. This alone would move the needle significantly.

---

## Technical SEO Findings

| # | Issue | Impact | Evidence | Fix | Priority |
|---|-------|--------|----------|-----|----------|
| 1 | **OG images missing on ALL pages** | HIGH | Every page returns og_image=MISSING | Use dynamic OG image generation or static images per page | P1 |
| 2 | **Twitter description on /founder too short** | MEDIUM | 36 chars ("Why we built Adamant and who we are.") | Extend to 80–150 chars | P2 |
| 3 | **Solution pages use HTTP 200 for unknown slugs** | MEDIUM | No 404 path for invalid /solutions/[slug] | Add `dynamicParams = false` in [slug]/page.tsx | P2 |
| 4 | **No hreflang tags** | LOW | Global audience, single English locale | Add `<link rel="alternate" hreflang="en">` | P3 |
| 5 | **next/image disabled** | HIGH | `images.unoptimized: true` was removed in config, but raw `<img>` tags still used | Migrate all images to `next/image` with sizes | P1 |
| 6 | **Page word counts under 5,000** | MEDIUM | Solution pages: 4,800–4,900 words each | Add FAQ expansion, case studies, or process details | P2 |

### Schema Markup Status

| Page | Schema Types | Status |
|------|-------------|--------|
| Home | Organization, WebSite, SearchAction, Service, BreadcrumbList | ✅ Complete |
| Solutions (×3) | BreadcrumbList only | ❌ Thin |
| Founder | BreadcrumbList only | ❌ Thin |
| Demo | BreadcrumbList only | ❌ Thin |

**Fix:** Add `Service` schema to each solution page with specific offer details.

---

## On-Page SEO Findings

### Heading Hierarchy Issues

#### Homepage
| # | Problem | Impact |
|---|---------|--------|
| 1 | **Two H1s** — Hero headline + "Book your free scope call" section uses H1 | Confuses crawlers about page topic |
| 2 | **H2 "When was the last time you..."** is a question, not a section topic | Weak semantic signal |
| 3 | **H3 "Book your free scope call"** is a CTA, not a heading | Misuses hierarchy |

**Fix:** Consolidate to 1 H1. Use H2 for section topics only. Convert CTA headings to styled `<p>` or `<span>`.

#### Solution Pages
| # | Problem | Impact |
|---|---------|--------|
| 1 | H2 "What changed." — vague, no keyword | Missed SEO opportunity |
| 2 | H2 "Straight answers." — same issue | Generic label |
| 3 | H2 "Book your free scope call." — CTA as heading | Hierarchy abuse |

**Fix:** Rewrite H2s to include target keywords: "Productivity AI Use Cases", "FAQ: Productivity AI", etc.

### Meta Data Audit

| Page | Title | Desc | Status |
|------|-------|------|--------|
| / | 43ch — ✅ | 138ch — ✅ | Good |
| /solutions/productivity-ai | 25ch — ✅ | 121ch — ✅ | Good |
| /solutions/campaign-systems | 26ch — ✅ | 131ch — ✅ | Good |
| /solutions/marketing-strategy | 28ch — ✅ | 127ch — ✅ | Good |
| /founder | 17ch — ✅ | 104ch — ✅ | Good |
| /demo | 29ch — ✅ | 122ch — ✅ | Good (title could include "interactive tool") |

### Image Audit

| Page | Images | Alt Quality | Status |
|------|--------|-------------|--------|
| / | 1 (Unsplash) | Good | ❌ Needs product screenshots |
| /solutions/productivity-ai | 0 | N/A | 🔴 Critical gap |
| /solutions/campaign-systems | 0 | N/A | 🔴 Critical gap |
| /solutions/marketing-strategy | 0 | N/A | 🔴 Critical gap |
| /founder | 6 (Unsplash) | Good | ✅ Acceptable (editorial style) |
| /demo | 0 | N/A | ⚠️ Demo has no static images (expected) |

**Founder page images:** All Unsplash placeholders. Recommend replacing 3+ with real founder/team photos when available.

---

## Off-Page SEO Findings

| # | Issue | Impact | Fix | Priority |
|---|-------|--------|-----|----------|
| 1 | **Zero backlinks** | HIGH | No referring domains signal authority | Create niche-relevant directory listings (Clutch, GoodFirms, G2) | P1 |
| 2 | **No guest content** | HIGH | No topical authority backlinks | Publish 1–2 guest posts on SaaS / operations blogs | P1 |
| 3 | **No Google Business Profile** | MEDIUM | Missing local pack (even though global, GBP helps brand searches) | Create and verify | P2 |
| 4 | **SameAs schema empty** | MEDIUM | `sameAs: []` in Organization schema | Add LinkedIn, Twitter/X, Crunchbase when profiles exist | P2 |
| 5 | **No social signals** | LOW | No Twitter/LinkedIn presence in schema or page | Create profiles, link in footer | P3 |

---

## Content: Image & Video Strategy Per Section

### Homepage (/)

| Section | Current Media | Recommendation |
|---------|--------------|----------------|
| Hero | Animated wave canvas (code) | ✅ Keep. Add screenshot of actual product beside text |
| Problem | Text-only (WordRotate) | ⚠️ Add 1–2 icons or small illustrations |
| Solutions | Text cards | 🔴 **CRITICAL**: Add 1 screenshot or diagram per card |
| Process | Contact form card (right) | ⚠️ Add small diagram or flowchart of 4 steps |
| Model | Text comparison box | ⚠️ Add side-by-side visual: agency vs SaaS |
| Reviews | Testimonial carousel | ✅ Acceptable |
| FAQ | Text only | ✅ Acceptable for FAQ |
| Contact | Text / links | ✅ Acceptable |

### Solution Pages (/solutions/*)

| Section | Current Media | Recommendation |
|---------|--------------|----------------|
| Hero | Text only | 🔴 **Add hero banner image** (e.g. dashboard screenshot) |
| Use Cases | Text cards | 🔴 **Add screenshot per use case** |
| Process | Text timeline | ⚠️ Add small icon or step diagram |
| Testimonials | Text cards | ⚠️ Add client logos (if permission) |
| FAQ | Text only | ✅ Acceptable |
| CTA Banner | Text + button | ⚠️ Add subtle background texture/pattern |

### Founder Page (/founder)

| Section | Current Media | Recommendation |
|---------|--------------|----------------|
| Hero | Unsplash image | ⚠️ Replace with real founder photo |
| Timeline | 5 Unsplash images | ⚠️ Gradually replace 3+ with real photos |
| Stats | Text only | ✅ Clean, acceptable |
| CTA | Background image | ✅ Acceptable |

### Demo Page (/demo)

| Section | Current Media | Recommendation |
|---------|--------------|----------------|
| CampaignHubDemo | Interactive demo | ✅ This IS the media |

---

## Keyword Mapping & Page Structure Plan

### Homepage — "Brand + Category"

| Target Keyword | Title Position | H2 Context | Evidence |
|----------------|---------------|------------|----------|
| AI tools for business workflows | Currently in title | Hero H1 | High commercial intent, aligns with offering |
| Business productivity tools | Add to body copy | Solutions section | Low competition, captures discovery intent |
| Custom workflow automation | Add to subheadline | Problem section | Direct service match |
| Operations design for small teams | Add to H2 or body | Model section | Niche, low competition |

#### Proposed Heading Hierarchy

```
<h1> Improve productivity with AI tools designed for your workflow.

<h2> When was the last time your workflow just worked?
  <p> WordRotate cycling text
  <p> Same.

<h2> Built for how your team actually works.
  <h3> Productivity AI
  <h3> Campaign Systems
  <h3> Marketing Strategy

<h2> From first call to live system.
  <h3> Step 1: Map your repeated tasks
  <h3> Step 2: Connect your tools
  <h3> Step 3: Watch it run

<h2> Agency service. Product outcome.
  <p> Comparison box

<h2> What our clients say.
  (testimonials)

<h2> What you are actually buying.
  (FAQ)

<p class="cta-headline"> Book your free 45-minute intro call.  <-- NOT h1/h2
```

### Solution Page — /solutions/productivity-ai

| Target Keyword | Current Placement | Action |
|----------------|------------------|--------|
| Productivity AI | H1 ✅ | Keep |
| AI workflow automation | Missing | Add to H2 or body |
| Automate business tasks | Missing | Add to use case descriptions |
| Small team productivity tools | Missing | Add to body or testimonial |

#### Proposed Structure

```
<h1> Productivity AI
  <p> The 40 tasks you repeat every day? Done before you open your laptop.

<h2> What Productivity AI looks like for teams like yours.
  <h3> Auto-routing inquiries
  <h3> Reports that write themselves
  <h3> Approval workflows that move

<h2> How our Productivity AI system works.
  <h3> Step 1: Map your repeated tasks
  <h3> Step 2: Connect your tools
  <h3> Step 3: Watch it run

<h2> What changed after teams got Productivity AI.
  (testimonials)

<h2> Questions about Productivity AI.
  (FAQ)

<p class="cta-headline"> Book your free scope call.
```

### Solution Page — /solutions/campaign-systems

| Target Keyword | Current Placement | Action |
|----------------|------------------|--------|
| Campaign management system | Missing | Add to H1 or title |
| KOL campaign tracking | Mentioned in FAQ | Elevate to H2 or body |
| Influencer marketing platform | Missing | Add to use case |
| Social media campaign hub | Partial match | Expand to full phrase |

### Solution Page — /solutions/marketing-strategy

| Target Keyword | Current Placement | Action |
|----------------|------------------|--------|
| Marketing automation | Partial | Add explicitly |
| Marketing strategy system | Missing | Add to H2 |
| Campaign planning tool | Missing | Add to use case |
| Performance measurement dashboard | Missing | Add to body |

### Founder Page (/founder)

| Target Keyword | Current Placement | Action |
|----------------|------------------|--------|
| About Adamant | Missing | Add to H2 |
| Founder story | Missing | Add to body |
| Agency philosophy | Missing | Add to body |

**Note:** Founder page should rank for "about Adamant" and long-tail brand + founder queries. Current H1 is creative but weak for SEO. Consider a hybrid:

```
<h1> Why we built Adamant — and how we work.
```

### Demo Page (/demo)

| Target Keyword | Current Placement | Action |
|----------------|------------------|--------|
| Campaign dashboard demo | Partial (title) | Add "campaign management dashboard demo" to body |
| KOL dashboard preview | Missing | Add to H2 |

---

## Prioritized Action Plan

### Critical (Do First)
1. **Add OG images** to all 6 pages (impact: social click-through + brand presence)
2. **Add 2–3 screenshots** per solution page (impact: time-on-page + rankability)
3. **Fix H1 duplication** on homepage (impact: crawl clarity)
4. **Add Service schema** to solution pages (impact: rich results eligibility)
5. **Build Google Business Profile** (impact: brand search dominance)

### High Impact
6. Rewrite solution page H2s to include target keywords
7. Add "Campaign management system" and "Marketing automation" to titles/bodies
8. Replace 3+ Unsplash images on founder page with real photos
9. Submit sitemap to Google Search Console + request indexing
10. Add 500+ words per solution page (case study snippets, tool details)

### Quick Wins
11. Add `/demo` to internal link from Solutions section
12. Add breadcrumb structured data to all pages (only home + solutions have it)
13. Add `rel="noopener noreferrer"` to mailto and external links
14. Add alt text keyword to homepage hero image
15. Add "adamant.asia" branded search tracking

### Long Term
16. Publish 3–4 blog posts targeting informational keywords:
    - "how to automate business workflows"
    - "KOL campaign management best practices"
    - "small team productivity tools comparison"
17. Build 5–10 directory backlinks (Clutch, Capterra, GoodFirms)
18. Guest post on 2 SaaS / operations blogs
19. Create landing page for "workflow automation [country]" geo-variants
20. A/B test hero headline for conversion + click-through

---

## Competitor Intelligence (Estimated)

| Competitor Type | What They Do That Adamant Doesn't | Gap |
|-----------------|----------------------------------|-----|
| Zapier-type tools | Heavy product screenshots, feature grids | Adamant has no product visuals |
| Agencies (Toptal, etc.) | Case studies with logos, metric proof | Adamant has testimonials but no logos |
| SaaS products (Notion, etc.) | Comparison pages, "vs" content | Absent entirely |
| Niche competitors | Pricing page, ROI calculator | Missing conversion tools |

---

*Report generated automatically. Recommend re-auditing after implementing Critical fixes.*
