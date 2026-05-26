# Adamant.asia

Workflow systems for teams that move fast.

**Live:** [adamantasia.vercel.app](https://adamantasia.vercel.app)
**Production:** [adamantasia-q1tbs6s71-hypelives-projects.vercel.app](https://adamantasia-q1tbs6s71-hypelives-projects.vercel.app)

---

## What We Do

We design workflows that run themselves — connecting your tools into one automated system.

**Typical engagement:** 2 weeks from first conversation to running system.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.6 (App Router, ISR) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| Fonts | Newsreader (editorial) + Geist Sans/Mono (UI) |
| Content CMS | Lark Base (team-editable tables) |
| Content Sync | `scripts/sync-from-lark.mjs` |
| Package Manager | pnpm 9.15.4 |
| Deploy | Vercel (ISR + deploy hooks) |

---

## Design System

- **Light mode only** — warm cream (#f2f2ee) and ink (#1b1b18). No dark mode toggle.
- **Tokens:** QBDS-inspired semantic naming (`--fg-*`, `--fill-*`, `--stroke-*`, `--surface-*`)
- **Typography:** Newsreader serif for editorial voice, Geist Sans for functional text
- **Motion:** CSS animations where possible (GPU-composited). `prefers-reduced-motion` respected everywhere.

---

## Development

```bash
pnpm install
pnpm run dev
```

### Content Workflow

All marketing copy lives in **Lark Base** tables. Team members edit there. Developers sync to code via:

```bash
# Pull latest content from Lark Base → src/data/content.ts
pnpm run sync

# Review diff, then commit
git add src/data/content.ts && git commit -m "content: sync from Lark Base"
git push
```

### Deploy Hook (Team-triggered rebuilds)

Anyone with the deploy hook URL or secret can trigger a rebuild:

```bash
# Via Vercel deploy hook (no auth)
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_JkiUov6OBpXqwzpcDBqBpmoXTD00/ff5StTdzDA

# Via /api/deploy (requires DEPLOY_SECRET)
curl -X POST https://adamantasia.vercel.app/api/deploy \
  -H "Authorization: Bearer YOUR_SECRET" \
  -H "Content-Type: application/json"
```

### Available Scripts

```bash
pnpm run dev        # Local dev server
pnpm run sync       # Pull content from Lark Base → content.ts
pnpm run build      # Production build (uses latest content.ts)
pnpm run build:sync # Sync then build
pnpm run analyze    # Bundle analysis
pnpm run lint       # ESLint
```

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (home)/                   # Route group — homepage
│   │   ├── page.tsx              # Section assembly (ISR 1h)
│   │   ├── loading.tsx           # Suspense loading UI
│   │   └── error.tsx             # Error boundary
│   ├── api/
│   │   └── deploy/
│   │       └── route.ts          # POST to trigger Vercel redeploy
│   ├── globals.css               # Design tokens + Tailwind
│   ├── layout.tsx                # Root layout, fonts, metadata
│   ├── not-found.tsx             # 404 page
│   ├── opengraph-image.tsx       # Dynamic OG image (auto-discovered)
│   ├── robots.ts                 # robots.txt (auto-generated)
│   └── sitemap.ts                # sitemap.xml (auto-generated)
│
├── sections/                     # Page sections (co-located modules)
│   ├── index.ts                  # Barrel export
│   ├── hero.tsx
│   ├── problem.tsx
│   ├── solutions.tsx
│   ├── process.tsx
│   ├── proof.tsx
│   ├── contact.tsx
│   └── stats-bar.tsx
│
├── components/                   # Shared UI components
│   ├── animations/               # Framer Motion animation primitives
│   │   ├── blur-fade.tsx
│   │   ├── scroll-parallax.tsx
│   │   ├── scroll-reveal.tsx
│   │   └── smooth-scroll.tsx
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   └── corner-plus.tsx
│   ├── footer.tsx                # Shared footer
│   ├── navigation.tsx            # Fixed nav
│   ├── marquee.tsx               # CSS infinite scroll
│   ├── scroll-progress.tsx       # Top reading progress bar
│   ├── wave-canvas.tsx           # WebGL wave shader hero bg
│   ├── workflow-nodes.tsx        # SVG pipeline diagrams
│   └── contact-form.tsx          # Contact form
│
├── data/
│   └── content.ts                # Team-editable content source of truth
│
├── lib/
│   ├── lark-api.ts               # Lark Base REST API client
│   ├── utils.ts                  # cn() and helpers
│   ├── animation.ts              # Framer Motion easings
│   └── tokens.ts                 # Design token mappings
│
scripts/
└── sync-from-lark.mjs            # Build-time Lark Base → content.ts sync
```

---

## Section Flow

```
Navigation (fixed)
  ↓
Hero — "Build once. Run forever."
  ↓
Problem — "Your team asks you for everything."
  ↓
Solutions — 4 feature cards
  ↓
Process — "How it works." (4-step pipeline)
  ↓
StatsBar — 47 teams, 2 weeks, 30 days, 0 spreadsheets
  ↓
Proof — Testimonials + stats + quote marquee
  ↓
Contact — Form + email
  ↓
Marquee — "Build once. Run forever. • Systems, not slogans. • ..."
  ↓
Footer
```

---

## Lark Base Content Tables

| Table | Purpose | Records |
|-------|---------|---------|
| Sections | Headlines, subheads, body, CTA text | 7 |
| Solutions | Feature cards (icon, title, description) | 4 |
| Testimonials | Case study cards (Proof) | 4 |
| Stats | Stats bar values | 4 |
| Process Phases | 4-step pipeline cards | 4 |
| Marquee Items | Marquee text | 8 |

**Base URL:** https://hypelive.sg.larksuite.com/base/XY8IbUHh3aNI2AsWI0tl0YllgSd

---

## Security

PostCSS is pinned via `pnpm.overrides` to `>=8.5.10` to patch XSS vulnerability `GHSA-qx2v-qp2m-jg93`.

```bash
pnpm audit  # Run before deploy
```

---

## Contact

hello@adamant.asia
