<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Adamant.asia — Agent Design Reference

## Typography System

All text MUST use design tokens. Never hardcode font sizes, weights, or families.

| Token | Font | Size | Weight | Line Height | Usage |
|-------|------|------|--------|-------------|-------|
| `text-hero` | Newsreader (serif) | clamp(2–4rem) | 400 | 1.1 | Hero headline only |
| `text-display` | Newsreader (serif) | clamp(1.5–2.25rem) | 400 | 1.2 | Section headings (h2) |
| `text-headline` | Newsreader (serif) | clamp(1–1.25rem) | 400 | 1.3 | Card titles, sub-headings |
| `text-lead` | Newsreader (serif) | clamp(0.94–1.06rem) | 400 | 1.55 | Intro paragraphs, pull quotes |
| `text-body` | **Geist Sans** (sans) | clamp(1–1.06rem) | 400 | 1.65 | Body text, descriptions |
| `text-caption` | Geist Sans (sans) | clamp(0.75–0.81rem) | 400 | 1.5 | Labels, metadata |
| `text-micro` | Geist Sans (sans) | 0.6875rem | 500 | — | Uppercase labels, stage names |
| `text-ui` | Geist Sans (sans) | 0.9375rem | 400 | 1.5 | Navigation, buttons |
| `text-chapter` | Newsreader (serif) | clamp(6–12rem) | 400 | 1 | Watermark numbers |

**Rules:**
- Serif (Newsreader) is for **editorial voice** — headlines, quotes, hero text
- Sans (Geist) is for **functional text** — body, UI, captions, navigation
- **Never use `font-medium` or `tracking-tight` ad-hoc** — bake into token if needed
- Italic emphasis (`<em>`) is preferred over bold for highlighting

## Color Tokens (Light Mode Only — No Dark Mode)

| Token | Value | Usage |
|-------|-------|-------|
| `--foreground` | `#1b1b18` | Primary text, dark surfaces |
| `--background` | `#f2f2ee` | Page background |
| `--primary` | `#0f766e` | Teal — CTAs, links, accent |
| `--accent` | `#9a4707` | Amber — micro labels, highlights |
| `--stone` | `#6b6560` | Secondary text (fg-secondary) |
| `--dim` | `#7a746d` | Tertiary text, disabled |
| `--verse` | `#4a4a45` | Deep warm gray — card accents |
| `--surface` | `#ffffff` | Card backgrounds |
| `--surface-raised` | `#fafaf8` | Elevated surfaces |
| `--warm` | `#f5f0e8` | Gradient backgrounds |
| `--border` | `color-mix(...)` | Subtle borders |
| `--destructive` | `#b91c1c` | Error states |

**Inverse palette** (for dark surfaces only: `bg-foreground`, marquee, footer):
| Token | Value | Contrast on `#1b1b18` |
|-------|-------|----------------------|
| `--inverse` | `#f2f2ee` | 15.4:1 |
| `--inverse-weak` | `#b8b3aa` | 8.3:1 |
| `--inverse-muted` | `#8a847a` | 4.7:1 |

**Rules:**
- `text-dim` and `text-stone` are for **light surfaces only**
- Dark surfaces MUST use `text-inverse*` family
- Never use `text-muted-foreground` — use `text-stone`
- **No dark mode** — the site is warm cream by design. No `prefers-color-scheme`, no `dark:` variants.

## Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `section-pad` | clamp(3rem, 5vw+1rem, 5.5rem) | Section vertical padding |
| `space-block-sm` | clamp(2rem, 3vw+0.5rem, 3.5rem) | Small gap between blocks |
| `space-block` | clamp(2.5rem, 4vw+0.5rem, 4.5rem) | Standard gap between blocks |
| `space-block-lg` | clamp(3rem, 4vw+1rem, 5rem) | Large gap, top+bottom |
| `space-strip` | clamp(1.25rem, 2vw+0.25rem, 2rem) | Footer/marquee strip padding |
| `gap-fluid` | clamp(1rem, 2vw+0.25rem, 2rem) | Grid gap |
| `gap-fluid-lg` | clamp(1.5rem, 3vw+0.5rem, 3rem) | Large grid gap |

Raw Tailwind spacing (`p-5`, `gap-4`, `mb-5`) is acceptable for **micro-layout within components**. Tokens handle macro rhythm between sections.

## Component Inventory

| Component | Location | Purpose |
|-----------|----------|---------|
| `Navigation` | `components/navigation.tsx` | Fixed nav, scroll state, mobile menu |
| `ScrollProgress` | `components/scroll-progress.tsx` | Top reading progress bar |
| `ScrollReveal` | `components/scroll-reveal.tsx` | Intersection Observer fade+slide |
| `BlurFade` | `components/blur-fade.tsx` | Opacity + translateY entrance |
| `ScrollParallax` | `components/scroll-parallax.tsx` | Scroll-driven y-transform wrapper |
| `Marquee` / `MarqueeText` | `components/marquee.tsx` | CSS infinite scroll band |
| `TrustedBy` | `components/trusted-by.tsx` | Orbiting circles integration showcase |
| `OrbitingCircles` | `components/orbiting-circles.tsx` | Dual-orbit animation for tool icons |
| `Terminal` | `components/terminal.tsx` | macOS terminal with typing animation |
| `DottedMap` | `components/dotted-map.tsx` | SVG world map with pulse markers |
| `Text3DFlip` | `components/text-3d-flip.tsx` | Per-character 3D flip animation |
| `WaveCanvas` | `components/wave-canvas.tsx` | WebGL wave shader hero background |
| `CornerPlus` | `components/ui/corner-plus.tsx` | Architectural corner accent marks |
| `WorkflowDiagram` | `components/workflow-nodes.tsx` | SVG node graphs with animated connections |
| `KOLDashboardMockup` | `components/kol-dashboard-mockup.tsx` | Pure CSS dashboard UI mockup |
| `JsonLd` | `components/json-ld.tsx` | Structured data for SEO |
| `ContactForm` | `components/contact-form.tsx` | Dark-section contact form |
| `PlatformLogos` | `components/platform-logos.tsx` | Monochrome SVG marks for integrations |

**Removed components (do not re-add):**
| Component | Why Removed |
|-----------|-------------|
| `BentoGrid` / `BentoCard` | Unused, added visual complexity without conversion impact |
| `FlickeringGrid` | Unused, canvas animation hurt INP |
| `AnimatedList` | Caused scroll freeze — sequential JS timers blocked interaction |
| `SectionLoader` | Dynamic imports caused jank on scroll — sections now imported directly |

## Section Flow

```
Navigation (fixed)
  ↓
Hero — "Build once. Run forever."
  ↓
TrustedBy — Orbiting circles (LINE, Lark, WhatsApp, Slack, Google, Notion, Shopify, Stripe)
  ↓
Problem — Before/After (chaos notifications vs. system terminal)
  ↓
Process — "From chaos to system in two weeks." (4-phase pipeline)
  ↓
Progress — KOL Campaign Dashboard mockup
  ↓
Proof — 4 transformation cards + stats + quote marquee
  ↓
Contact — Dark CTA with dotted map + terminal + form
  ↓
Marquee — "Build once. Run forever. • Systems, not slogans. • ..."
  ↓
Footer
```

## Wire Logic Rules

- Nav links: `#problem`, `#process`, `#proof`, `#contact`
- Footer nav: `#main` (Home), `#problem`, `#process`, `#proof`, `#contact`
- All CTAs scroll to `#contact` or `#problem`
- Email: `mailto:hello@adamant.asia`
- Mobile menu links close menu on click (`closeMobile` callback)
- `aria-hidden="true"` on all decorative elements (marquees, orbit paths)
- All platform logos in TrustedBy are decorative (`aria-hidden`)

## Performance Rules

- **No dynamic imports** for below-fold sections — import directly in `page.tsx`
- **No sequential JS animation timers** — use CSS animations or simple `BlurFade` entrance only
- **Respect `prefers-reduced-motion`** — all animated components check this hook
- **IntersectionObserver pause** for WebGL/canvas — `WaveCanvas` pauses when off-screen
- `console.error` guarded by `NODE_ENV !== "production"`

## Build

```bash
npm run build
```

Must produce clean static export with zero errors.
