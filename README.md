# Adamant.asia

Workflow systems for teams that move fast.

**Live:** [adamant.asia](https://adamant.asia)
**Contact:** sam@adamant.asia / WhatsApp +65 8921 1191

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
| Map Rendering | `piri` (SVG dotted world map) |
| Voice AI | ElevenLabs ConvAI (`@elevenlabs/react`) + webhook ingestion |
| WebRTC | `livekit-client@2.16.1` (pinned) |
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
pnpm test           # Vitest (requires: pnpm install)
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
│   │   ├── deploy/
│   │   │   └── route.ts          # POST to trigger Vercel redeploy
│   │   └── webhook/
│   │       └── elevenlabs/
│   │           └── route.ts      # ElevenLabs webhook (HMAC verified)
│   ├── dashboard/
│   │   └── page.tsx              # Mobile preview dashboard
│   ├── globals.css               # Design tokens + Tailwind
│   ├── layout.tsx                # Root layout, fonts, metadata, VoiceAgentController
│   ├── not-found.tsx             # 404 page
│   ├── opengraph-image.tsx       # Dynamic OG image (auto-discovered)
│   ├── robots.ts                 # robots.txt (auto-generated)
│   └── sitemap.ts                # sitemap.xml (auto-generated)
│
├── sections/                     # Page sections (co-located modules)
│   ├── index.ts                  # Barrel export
│   ├── hero.tsx                  # id="hero"
│   ├── platforms.tsx             # id="platforms" — TrustedBy orbiting circles
│   ├── showcase.tsx              # id="showcase" — Model/showcase section
│   ├── problem.tsx               # id="problem"
│   ├── solutions.tsx             # id="solutions" — AnimatedBeam diagrams
│   ├── process.tsx               # id="process"
│   ├── model.tsx                 # id="model"
│   ├── reviews.tsx               # id="reviews" — Tweet-card carousel
│   ├── faq.tsx                   # id="faq" — FAQ + marquee
│   └── contact.tsx               # id="contact"
│
├── components/                   # Shared UI components
│   ├── animations/               # Framer Motion animation primitives
│   │   ├── blur-fade.tsx
│   │   ├── scroll-parallax.tsx
│   │   ├── scroll-reveal.tsx
│   │   └── smooth-scroll.tsx
│   ├── ui/                       # shadcn/ui components
│   │   ├── animated-beam.tsx     # SVG animated path between DOM nodes
│   │   ├── button.tsx
│   │   ├── corner-plus.tsx
│   │   ├── tweet-card.tsx        # Twitter/X-style testimonial card
│   │   └── client-tweet-card.tsx # react-tweet wrapper
│   ├── voice-agent-controller.tsx   # Persistent useConversation session (layout)
│   ├── voice-agent-context.tsx      # React context for voice state sharing
│   ├── floating-voice-widget.tsx    # Mini orb on non-home pages
│   ├── elevenlabs-orb.tsx           # Hero page voice orb (visual only)
│   ├── orb-visualizer.tsx           # Frequency data visualization
│   ├── footer.tsx                   # Shared footer
│   ├── logos.tsx                    # SVG brand logos
│   ├── navigation.tsx               # Fixed nav
│   ├── scroll-progress.tsx          # Top reading progress bar
│   ├── wave-canvas.tsx              # WebGL wave shader hero bg
│   ├── workflow-nodes.tsx           # SVG pipeline diagrams
│   └── contact-form.tsx             # Multi-step contact form
│
├── data/
│   └── content.ts                # Team-editable content source of truth
│
├── lib/
│   ├── lark-api.ts               # Lark Base REST API client
│   ├── utils.ts                  # cn() and helpers
│   ├── animation.ts              # Framer Motion easings
│   ├── tokens.ts                 # Design token mappings
│   └── elevenlabs-config.ts      # Agent ID, voice constants
│
scripts/
└── sync-from-lark.mjs            # Build-time Lark Base → content.ts sync
```

---

## Section Flow

Each section has a stable `id` for deep-linking and voice agent navigation:

```
Navigation (fixed)
  ↓
#hero       — "Think fast, we help build faster." (cycling headline + WebGL wave bg)
  ↓
#platforms  — TrustedBy — Orbiting circles (LINE, Lark, WhatsApp, Slack, Google, Notion, Shopify, Stripe)
  ↓
#showcase   — Model/Showcase section
  ↓
#problem    — "Sipped champagne in Paris?" (rotating dream phrases)
  ↓
#solutions  — AnimatedBeam diagrams (pain → system → outcomes)
  ↓
#process    — "How it works." (4-step timeline + Safari mockup)
  ↓
#model      — KOL Campaign Dashboard mockup
  ↓
#reviews    — Tweet-card carousel (auto-scroll, play/pause, before→after badges)
  ↓
#faq        — FAQ + marquee
  ↓
#contact    — Multi-step form + email
  ↓
Footer
```

---

## Lark Base Content Tables

| Table | Purpose | Records |
|-------|---------|---------|
| Sections | Headlines, subheads, body, CTA text | 7 |
| Testimonials | Case study cards (Reviews section) | 4 |
| Process Phases | 4-step pipeline cards | 4 |
| Call Transcripts | ElevenLabs webhook data (conversations, transcripts, costs) | dynamic |

**Base URL:** https://hypelive.sg.larksuite.com/base/XY8IbUHh3aNI2AsWI0tl0YllgSd

---

## Voice AI (ElevenLabs)

### Architecture

The voice agent uses a **persistent session** architecture. `VoiceAgentController` lives in `layout.tsx` and never unmounts, so the WebRTC call survives cross-page navigation.

```
layout.tsx
  ↓
VoiceAgentController (useConversation — persistent)
  ├─ VoiceAgentContextProvider
  │   ├─ {children} (all pages)
  │   └─ FloatingVoiceWidget (mini orb when connected)
  └─ ElevenLabsOrb (hero page visual)
```

### Agent Details

- **Agent ID:** `agent_5901ksshk9j6e1ft19n7ye6hm16k` ("Adamant Receptionist")
- **Voice:** George (`JBFqnCBsd6RMkjVDRZzb`)
- **Model:** `eleven_multilingual_v2`
- **LLM:** `gemini-2.0-flash`
- **Package:** `@elevenlabs/react@1.6.4`

### Client Tools (5)

The agent can trigger browser-side actions:

| Tool | Action |
|------|--------|
| `book_call` | Opens contact form |
| `show_pricing` | Navigates to `/pricing` |
| `show_services` | Scrolls to `#solutions` |
| `show_process` | Scrolls to `#process` |
| `scroll_to_section` | Scrolls to any homepage section by ID |

### Webhook

`POST /api/webhook/elevenlabs`:
- HMAC verified via `@elevenlabs/elevenlabs-js` (`constructEvent`)
- Returns 200 immediately; heavy work via `after()`
- Dedup: 5-min TTL by `conversation_id:event_timestamp`
- Writes transcripts to Lark Base "Call Transcripts" table

### Dashboard

`/dashboard` — Mobile preview page using `DeviceFrame`

---

## Security

PostCSS is pinned to `>=8.5.10` via `.npmrc` to patch XSS vulnerability `GHSA-qx2v-qp2m-jg93`.

```bash
pnpm audit  # Run before deploy
```

---

## Contact

hello@adamant.asia
