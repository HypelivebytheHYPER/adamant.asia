# Adamant.asia

Workflow systems for teams that move fast. Built in Bangkok & Singapore.

**Live:** [adamantasia.vercel.app](https://adamantasia.vercel.app)

---

## What We Do

We design workflows that run themselves — connecting LINE, Lark, WhatsApp, Shopify, Stripe, and the tools your team already uses into one automated system.

**Typical engagement:** 2 weeks from first conversation to running system.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, ISR) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Fonts | Newsreader (editorial) + Geist Sans/Mono (UI) |
| Content CMS | Lark Base (team-editable tables) |
| Content Sync | `scripts/sync-from-lark.mjs` |
| Package Manager | pnpm |
| Deploy | Vercel (ISR + deploy hooks) |

---

## Design System

- **Light mode only** — warm cream (#f2f2ee) and ink (#1b1b18). No dark mode toggle, no `prefers-color-scheme` complexity.
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
```

---

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Design tokens + utilities
│   ├── layout.tsx           # Root layout, fonts, metadata
│   ├── page.tsx             # Section assembly (ISR 1h)
│   └── api/
│       └── deploy/route.ts  # POST to trigger Vercel redeploy
├── data/
│   └── content.ts           # Team-editable content source of truth
├── lib/
│   ├── lark-api.ts          # Lark Base REST API client
│   ├── utils.ts             # cn() and helpers
│   ├── animation.ts         # Framer Motion easings
│   └── tokens.ts            # Design token mappings
├── components/
│   ├── navigation.tsx       # Fixed nav (accepts links prop)
│   ├── sections/
│   │   ├── hero.tsx         # Accepts content prop
│   │   ├── problem.tsx      # Accepts content + notifications props
│   │   ├── process.tsx      # Accepts content + phases + pipelineNodes props
│   │   ├── progress.tsx     # Accepts content + rows props
│   │   ├── proof.tsx        # Accepts content + testimonials + stats props
│   │   ├── contact.tsx      # Accepts content + contactInfo props
│   │   └── footer.tsx       # Accepts content + navLinks props
│   ├── terminal.tsx         # macOS terminal with typing animation
│   ├── orbiting-circles.tsx # Dual-orbit animation
│   ├── workflow-nodes.tsx   # SVG pipeline diagrams
│   └── ...
scripts/
└── sync-from-lark.mjs       # Build-time Lark Base → content.ts sync
```

---

## Lark Base Content Tables

| Table | Purpose | Records |
|-------|---------|---------|
| Sections | Headlines, subheads, CTA text | 7 |
| Testimonials | Case study cards (Proof) | 4 |
| Stats | Proof section stat bar | 4 |
| Process Phases | 4-step pipeline cards | 4 |
| Before After | Progress comparison rows | 3 |
| Notifications | Problem section demo cards | 6 |
| Marquee Items | Footer marquee text | 8 |

**Base URL:** https://hypelive.sg.larksuite.com/base/XY8IbUHh3aNI2AsWI0tl0YllgSd

---

## Contact

hello@adamant.asia
