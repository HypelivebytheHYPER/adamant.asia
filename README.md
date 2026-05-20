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
| Framework | Next.js 16 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Fonts | Newsreader (editorial) + Geist Sans/Mono (UI) |
| Deploy | Vercel |

---

## Design System

- **Light mode only** — warm cream (#f2f2ee) and ink (#1b1b18). No dark mode toggle, no `prefers-color-scheme` complexity.
- **Tokens:** QBDS-inspired semantic naming (`--fg-*`, `--fill-*`, `--stroke-*`, `--surface-*`)
- **Typography:** Newsreader serif for editorial voice, Geist Sans for functional text
- **Motion:** CSS animations where possible (GPU-composited). `prefers-reduced-motion` respected everywhere.

---

## Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Deploy (git-based, auto-deploys from `main`):

```bash
git push origin main
```

---

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Design tokens + utilities
│   ├── layout.tsx        # Root layout, fonts, metadata
│   └── page.tsx          # Section assembly
├── components/
│   ├── sections/         # Hero, Problem, Process, Progress, Proof, Contact, Footer
│   ├── navigation.tsx
│   ├── orbiting-circles.tsx
│   ├── terminal.tsx
│   ├── workflow-nodes.tsx
│   ├── kol-dashboard-mockup.tsx
│   └── ...
```

---

## Contact

hello@adamant.asia
