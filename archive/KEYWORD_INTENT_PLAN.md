# Keyword Intent Plan — Adamant.asia

**Framework:** Every page serves a specific search intent. Misalignment = missed traffic + poor conversion.

---

## Intent Taxonomy

| Intent | User Goal | Page Type | Conversion Signal |
|--------|-----------|-----------|-------------------|
| **Informational (I)** | Learn / understand | Blog, guides, explainers | Newsletter, bookmark |
| **Commercial Investigation (C)** | Compare / evaluate before buying | Service pages, case studies | Demo request, compare CTA |
| **Transactional (T)** | Buy / hire now | Contact, pricing, booking | Form submit, call, payment |
| **Navigational (N)** | Find a specific brand/site | Homepage, brand pages | N/A (already searching you) |

**Rule:** One primary intent per page. Secondary intents allowed but subordinate. Never mix T + I as equals on the same page.

---

## Homepage (/) — Primary Intent: Navigational + Commercial Investigation

### Current State
- **Primary intent:** N (brand search: "Adamant", "Adamant workflow tools", "Adamant AI tools")
- **Secondary intent:** C (category searchers comparing options)
- **Leakage:** People searching for specific services land here and have to dig — friction.

### Keyword Intent Map

| Keyword | Volume Estimate | Intent | Page Target | Action |
|---------|----------------|--------|-------------|--------|
| Adamant | Low | N | Homepage | ✅ Already captured |
| Adamant workflow tools | Low | N | Homepage | ✅ Already captured |
| Adamant AI tools | Low-Med | N+C | Homepage | ✅ Title captures |
| AI tools for small teams | Med | C | Homepage → Solutions | ⚠️ Needs stronger bridge |
| Business workflow automation | High | C | Solutions | 🔴 No dedicated capture |
| Operations design agency | Med | C | Homepage | ⚠️ Mentioned but not prominent |
| Custom business systems | Med | C | Solutions | 🔴 Missing |
| AI agency for small teams | Low | T+C | Homepage | ⚠️ Could strengthen in body |

### Problem
Homepage tries to be everything. A user searching "business workflow automation" lands on a page that opens with a cycling headline about "tasting lunch" — emotional but misses their intent. They need proof, features, use cases FIRST, emotion SECOND.

### Fix: Intent-First Structure

```
Hero: For N intent (brand searchers)
  "Adamant — AI Tools That Save Your Team Time"
  [Keep emotion, but add secondary line:]
  "Custom workflows, campaign systems, and operations dashboards.
   Built in two weeks."

Problem Section: For I intent drift
  Current: Emotional "When was the last time..."
  Fix: Add a subheadline that names the problem in their words:
  "If your team is tracking campaigns in WhatsApp threads
   and reporting in spreadsheets, we need to talk."

Solutions Section: For C intent (primary)
  Current: 3 cards linking to sub-pages
  Fix: Add a "Which one is for me?" comparison line above cards.
  Each card needs a one-line ROI promise:
  - Productivity AI → "Cut manual tasks by 80%"
  - Campaign Systems → "Track 200+ KOLs in one view"
  - Marketing Strategy → "From plan to publish without chaos"

Process Section: For C intent (validation)
  Current: 4 steps + form
  Fix: Add social proof metric above the form:
  "47 teams. 2 weeks average delivery. 0 status meetings."

Contact CTA: For T intent (conversion)
  Current: "Book your free 45-minute intro call"
  Fix: Add anxiety-reduction microcopy:
  "No prep needed. No sales deck. Just a conversation."
```

---

## /solutions/productivity-ai — Primary Intent: Commercial Investigation

### Current State
- **Primary intent:** C (people evaluating AI workflow solutions)
- **User question:** "Will this solve my problem?"
- **Current gap:** Page answers "what we do" but not "is this for MY team?"

### Keyword Intent Map

| Keyword | Intent | Current Captured? | Action |
|---------|--------|-------------------|--------|
| Productivity AI | C | ✅ H1 | Keep |
| AI workflow automation | C | ⚠️ Mentioned in body | Elevate to H2 |
| automate manual tasks | C+I | ❌ Missing | Add to use case descriptions |
| business process automation | C | ❌ Missing | Add to body copy |
| AI tools for operations | C | ❌ Missing | Add to FAQ or H2 |
| small team workflow tools | C | ❌ Missing | Add to testimonial context |
| Lark automation | C | ❌ Missing | Add to "tools we connect" list |
| LINE workflow integration | C | ❌ Missing | Add to tools list |
| approval workflow system | C | ⚠️ Mentioned in use case | Expand to full section |

### Fix: Intent-First Structure

```
Hero: Confirm relevance IMMEDIATELY
  H1: Productivity AI
  Subhead: "The 40 tasks you repeat every day? Done before you open your laptop."
  [Add third line for C intent:]
  "For teams using Lark, LINE, Sheets, and Email. No new apps to learn."

Use Cases: Answer "Is this for MY problem?"
  Current: Generic titles ("Auto-routing inquiries")
  Fix: Reframe as job titles + pain points:
  - "Customer inquiries scattered across LINE, WhatsApp, and email?"
    → Auto-routing. One inbox. Right person. Every time.
  - "Spending Friday afternoon building reports from scratch?"
    → Automated reports. Pulled from your data. Delivered to your inbox.
  - "Chasing signatures through three different chat apps?"
    → Approval workflows. Route. Remind. Done.

Process: Show speed (C intent validation)
  Keep 3 steps, but add timeline badge:
  "Step 1 → Step 2 → Step 3 [Go live in 2 weeks]"

Testimonials: Match industry (C intent proof)
  Current: Generic names
  Fix: Add industry label + before/after metric:
  "Manufacturing team | 6 hours/week → 30 minutes/week on reporting"

FAQ: Handle objections (C intent friction removal)
  Q1: "Do we need to switch apps?" → "No."
  [Missing FAQ:]
  Q4: "How much does it cost?"
  A: "Most productivity systems start at $X and go live in two weeks.
      We quote after the free scope call — no surprises."
  Q5: "What tools do you integrate with?"
  A: "Lark, LINE, WhatsApp, Gmail, Google Sheets, Notion, Slack,
      and any tool with an API. If you use it, we connect it."

CTA: Convert C → T
  Current: "Book your free scope call"
  Fix: Add urgency without pressure:
  "Get a free 45-minute workflow audit. We will map your manual tasks
   and show you what automation looks like. No commitment."
```

---

## /solutions/campaign-systems — Primary Intent: Commercial Investigation

### Current State
- **Primary intent:** C (people evaluating campaign management tools)
- **User question:** "Can this handle my campaign complexity?"
- **Current gap:** No visual proof. No volume numbers. Users can't SEE the system.

### Keyword Intent Map

| Keyword | Intent | Current Captured? | Action |
|---------|--------|-------------------|--------|
| Campaign management system | C | ⚠️ Title has "Campaign Systems" | Update title to "Campaign Management System" |
| KOL campaign tracking | C | ✅ Mentioned in use case | Keep |
| Influencer marketing platform | C | ❌ Missing | Add to body |
| Social media campaign tracker | C | ❌ Missing | Add to H2 or body |
| Live commerce dashboard | C | ⚠️ Mentioned in use case | Expand |
| Campaign budget tracker | C | ❌ Missing | Add to use case |
| Content approval workflow | C | ❌ Missing | Add to features |
| Multi-platform campaign hub | C | ❌ Missing | Add to hero description |

### Fix: Intent-First Structure

```
Hero: Add specificity for C intent
  H1: Campaign Systems
  [Add subtitle:]
  "One dashboard. Every campaign. Every influencer. Every update.
   From 5 spreadsheets to 1 screen."

Use Cases: Lead with scale anxiety
  Current: "Social media campaign tracking"
  Fix: Lead with numbers C-intent users care about:
  - "Track 200+ influencers without a single spreadsheet"
    → Pipeline view. Status at a glance. No chasing.
  - "Approve content in hours, not days"
    → Upload → Review → Approve → Publish. All tracked.
  - "Know your live stream numbers in real time"
    → Orders, inventory, performance. Updated as it happens.

[NEW SECTION: "What the dashboard looks like"]
  For C intent: Screenshots of the actual system
  - Pipeline view (influencer roster)
  - Status board (which campaigns are live/pending/done)
  - Numbers view (ROI, engagement, spend)

Testimonials: Add campaign scale
  "Education brand | 47 KOLs | 3 campaigns/month | "Before: WhatsApp chaos.
   After: One link, full visibility.""

FAQ: Handle procurement objections
  Q4: "Can our existing team use this?"
  Q5: "What happens after the 2-week build?"
  Q6: "Do you handle payment tracking for influencers?"
```

---

## /solutions/marketing-strategy — Primary Intent: Commercial Investigation

### Current State
- **Primary intent:** C (people evaluating marketing operations solutions)
- **User question:** "Is this better than hiring another agency?"
- **Current gap:** Vague differentiation from the other two services. Users can't tell WHERE this fits.

### Keyword Intent Map

| Keyword | Intent | Current Captured? | Action |
|---------|--------|-------------------|--------|
| Marketing automation | C | ❌ Missing | **CRITICAL**: Add to title |
| Marketing strategy system | C | ⚠️ Title has "Marketing Strategy" | Expand |
| Campaign planning tool | C | ⚠️ Mentioned in use case | Elevate |
| Marketing operations platform | C | ❌ Missing | Add |
| Content pipeline management | C | ❌ Missing | Add |
| Marketing performance dashboard | C | ⚠️ Partial match | Expand |
| Marketing agency vs system | C | ❌ Missing | Add comparison section |
| Quarterly marketing planning | I+C | ❌ Missing | Blog post opportunity |

### Fix: Intent-First Structure

```
Hero: Clarify positioning immediately
  H1: Marketing Strategy
  [Rewrite subhead to differentiate from Campaign Systems:]
  Current: "The campaigns that drain you? We systematize them."
  Fix: "Strategy that lives in tools, not slide decks.
        Automated, trackable, and built to scale with or without you."

[NEW SECTION: "Agency vs System — Which do you need?"]
  For C intent: Users are comparing. Don't make them guess.
  ┌──────────────┬─────────────────┬────────────────┐
  │              │ Agency          │ Adamant        │
  ├──────────────┼─────────────────┼────────────────┤
  │ Approach     │ Run campaigns   │ Build the      │
  │              │ for you         │ system that    │
  │              │                 │ runs with you  │
  ├──────────────┼─────────────────┼────────────────┤
  │ Duration     │ Ongoing retainer│ 2-week build   │
  ├──────────────┼─────────────────┼────────────────┤
  │ You own it   │ No              │ Yes            │
  ├──────────────┼─────────────────┼────────────────┤
  │ Cost model   │ Monthly fee     │ One-time build │
  └──────────────┴─────────────────┴────────────────┘

Use Cases: Show before/after workflow
  Current: "Campaign planning system"
  Fix: Show the SYSTEM, not the outcome:
  - "Your quarterly plan: from deck to living dashboard"
    → Budgets, timelines, deliverables — updated automatically.
  - "Content calendar: from spreadsheet to tracked pipeline"
    → Ideas → Drafts → Approvals → Publish → Report. Visible.
  - "Performance: from hand-built reports to real-time numbers"
    → What moved the needle. Updated daily. No copy-paste.

[NEW: "What you get in 2 weeks" checklist]
  For C intent: Reduce uncertainty about deliverables
  ✅ Marketing operations audit
  ✅ Custom dashboard (budgets, timelines, performance)
  ✅ Automation setup (reports, reminders, routing)
  ✅ Team training session
  ✅ 30-day support window
```

---

## /founder — Primary Intent: Navigational + Informational

### Current State
- **Primary intent:** N (brand searchers: "who is Adamant", "Adamant founder")
- **Secondary intent:** I (people researching agency credibility)
- **Current gap:** The creative H1 is beautiful but misses navigational intent. Someone searching "who founded Adamant" won't find this page easily.

### Keyword Intent Map

| Keyword | Intent | Current Captured? | Action |
|---------|--------|-------------------|--------|
| Who founded Adamant | N | ❌ Missing | Add to title or H1 |
| About Adamant | N | ⚠️ Implied | Not explicit enough |
| Adamant team | N | ❌ Missing | Add |
| Adamant agency story | I | ✅ Page exists | Good |
| Why Adamant was built | I | ✅ Hero copy | Good |
| Adamant company values | I | ✅ Beliefs section | Good |
| Adamant track record | C | ✅ Stats (47 teams, 2 weeks) | Good |

### Fix: Intent-First Structure

```
Hero: Serve N intent without killing the story
  Current H1: "We started this because we were tired of watching good teams drown."
  Fix (dual-purpose):
  <span class="label">About Adamant — Our Story</span>
  <h1>We started this because we were tired of watching good teams drown.</h1>

  The label "About Adamant" serves navigational searchers.
  The H1 keeps the emotional hook.

[NEW: "The Team" section]
  For N intent: People search "Adamant team" — give them names.
  Even if it's just 1–2 people now, show faces + roles.
  This converts N intent into C intent ("real people, real company").
```

---

## /demo — Primary Intent: Commercial Investigation → Transactional

### Current State
- **Primary intent:** C (evaluating the product visually)
- **Leakage:** High intent traffic lands here, sees a demo, but has no direct path to book.
- **User question:** "Does this look like what I need?" → immediately followed by "How do I get this?"

### Keyword Intent Map

| Keyword | Intent | Current Captured? | Action |
|---------|--------|-------------------|--------|
| Campaign dashboard demo | C | ✅ Title | Good |
| KOL campaign preview | C | ⚠️ Mentioned in desc | Expand |
| Campaign management demo | C | ⚠️ Partial match | Full phrase |
| Free campaign tool demo | C | ✅ "free" in call | Good |
| Book demo Adamant | T | ❌ Missing | Add booking CTA |

### Fix: Intent-First Structure

```
Hero: Confirm + convert
  H1: What a working system looks like
  [Add:]
  "This is a live preview of a campaign dashboard we built for a client.
   Your system will be customized to your workflow."

CampaignHubDemo: The C intent validation
  ✅ Already loaded below hero

[MISSING: Immediate conversion path]
  Below the demo, add:
  "Want this for your team?"
  [Book your free scope call]  [See pricing — if pricing exists]
  
  OR if no pricing page:
  "Want this for your team? Talk to us."
  [Book your free scope call]
```

---

## Missing Pages — Content Gap Analysis

Pages that should exist to capture intent the current site misses entirely:

| Missing Page | Intent Served | Target Keywords | Priority |
|-------------|---------------|-----------------|----------|
| **Pricing** | T+C | "Adamant pricing", "workflow automation cost" | 🔴 Critical |
| **Case Studies** | C | "Adamant case study", "campaign system results" | 🔴 Critical |
| **Blog** | I | "how to automate workflows", "KOL campaign best practices" | 🟡 High |
| **/integrations** | C | "Lark automation", "LINE workflow integration" | 🟡 High |
| **/about** (or redirect to /founder) | N | "about Adamant", "Adamant company" | 🟡 High |
| **/compare/agency-vs-system** | C | "marketing agency vs automation", "build vs buy marketing" | 🟢 Medium |
| **/roi-calculator** | C | "workflow automation ROI", "time saved automation" | 🟢 Medium |
| **Comparison pages** | C | "workflow automation vs hiring", "build vs buy marketing system" | 🟢 Medium |
| **/templates** | I+C | "campaign tracker template", "marketing workflow template" | 🟢 Medium |

---

## Internal Linking Intent Flow

How users SHOULD flow through intent stages:

```
Informational (Blog/Guide)
  ↓ "See how it works →"
Commercial Investigation (Solution Page)
  ↓ "See it in action →"
Demo Page
  ↓ "Book a call →"
Transactional (Contact/Booking)
```

Current flow problems:
1. **No blog** → Users in I intent have nowhere to land. They bounce to competitors.
2. **No case studies** → C intent users lack proof before booking. Conversion drops.
3. **Homepage → Contact is too fast** → The "See how it works" bridge is weak.
4. **No pricing** → T intent users hit a wall. "How much?" is unanswered.

### Recommended Link Structure

```
Homepage
  ├── Solutions (C)
  │     ├── Productivity AI → Demo → Contact
  │     ├── Campaign Systems → Demo → Contact
  │     └── Marketing Strategy → Demo → Contact
  ├── Process (C validation)
  ├── Reviews (C proof)
  ├── FAQ (C friction removal)
  ├── Blog (I) [MISSING]
  ├── Case Studies (C proof) [MISSING]
  ├── Pricing (C→T) [MISSING]
  └── Contact (T)
```

---

## Title Tag Intent Alignment

| Page | Current Title | Intent Match | Proposed Title | Why |
|------|--------------|--------------|----------------|-----|
| / | Adamant — AI Tools That Save Your Team Time | ✅ N+C | **Keep** | Strong brand + benefit |
| /solutions/productivity-ai | Productivity AI \| Adamant | ⚠️ C, weak | Productivity AI: Automate Workflows in 2 Weeks \| Adamant | Adds outcome + timeline |
| /solutions/campaign-systems | Campaign Systems \| Adamant | ⚠️ C, weak | Campaign Management System: Track KOLs in One View \| Adamant | Adds specificity |
| /solutions/marketing-strategy | Marketing Strategy \| Adamant | ⚠️ C, vague | Marketing Automation: Strategy That Scales \| Adamant | Names the product category |
| /founder | Founder \| Adamant | ✅ N | **Keep** "About Adamant — Why We Built It \| Founder" | Adds N keyword |
| /demo | Campaign Hub — Demo \| Adamant | ✅ C | **Keep** | Good |

---

## Implementation Priority

### Phase 1: Intent Capture (Week 1)
1. Add "About Adamant" label to founder page
2. Update solution page titles with outcome + timeline
3. Add "See it in action" links from Solutions → Demo
4. Add "Book a call" CTA below the demo

### Phase 2: Intent Bridges (Week 2)
5. Create blog with 2 posts (I intent)
6. Create first case study page (C proof)
7. Add comparison table to Marketing Strategy page
8. Add "What you get in 2 weeks" checklist to all 3 solution pages

### Phase 3: Intent Completion (Week 3–4)
9. Build pricing page (T intent capture)
10. Create integrations page (C intent for tool-specific searchers)
11. Add geo-variants if serving specific regions
12. Add ROI calculator or template page (I+C intent)

---

*Intent-first SEO: Be what the user is looking for at the exact moment they search.*
