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
| `text-hero` | Newsreader (serif) | clamp(1.75–5.5rem) | 400 | 1.08 | Hero headline only |
| `text-display` | Newsreader (serif) | clamp(1.5–3.5rem) | 400 | 1.12 | Section headings (h2) |
| `text-headline` | Newsreader (serif) | clamp(1.125–2rem) | 400 | 1.2 | Card titles, sub-headings |
| `text-lead` | Newsreader (serif) | clamp(1–1.25rem) | 400 | 1.6 | Intro paragraphs, pull quotes |
| `text-body` | **Geist Sans** (sans) | clamp(1–1.0625rem) | 400 | 1.65 | Body text, descriptions |
| `text-caption` | Geist Sans (sans) | clamp(0.81–0.875rem) | 400 | 1.5 | Labels, metadata |
| `text-micro` | Geist Sans (sans) | 0.6875rem | 500 | — | Uppercase labels, stage names |
| `text-ui` | Geist Sans (sans) | 0.9375rem | 400 | 1.5 | Navigation, buttons |
| `text-chapter` | Newsreader (serif) | clamp(6–12rem) | 400 | 1 | Watermark numbers |

**Rules:**
- Serif (Newsreader) is for **editorial voice** — headlines, quotes, hero text
- Sans (Geist) is for **functional text** — body, UI, captions, navigation
- **Never use `font-medium` or `tracking-tight` ad-hoc** — bake into token if needed
- Italic emphasis (`<em>`) is preferred over bold for highlighting

## Stage Labels (Chapter Markers)

Every section has a chapter marker in the top-right corner:

| Chapter | Label | Section ID | Color |
|---------|-------|-----------|-------|
| 01 | **DISCOVER** | `#problem` | `text-stone/[0.4]` |
| 02 | **DESIGN** | `#process` | `text-stone/[0.4]` |
| 03 | **DELIVER** | `#progress` | `text-stone/[0.4]` |
| 04 | **BUILD** | `#proof` | `text-stone/[0.4]` |

Structure:
```tsx
<div className="absolute top-[5%] right-[5%] select-none pointer-events-none" aria-hidden="true">
  <span className="text-micro text-stone/[0.4] block text-right mb-2">LABEL</span>
  <span className="text-chapter leading-none block">01</span>
</div>
```

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--foreground` | `#1b1b18` | Primary text |
| `--background` | `#f2f2ee` | Page background |
| `--primary` | `#0f766e` | Teal — CTAs, accents, links |
| `--accent` | `#b45309` | Amber — micro labels, highlights |
| `--stone` | `#6b6560` | Secondary text |
| `--dim` | `#9c9c96` | Tertiary text, disabled |
| `--surface` | `#ffffff` | Card backgrounds |
| `--surface-raised` | `#fafaf8` | Elevated surfaces |
| `--warm` | `#f5f0e8` | Gradient backgrounds |
| `--border` | `rgba(27,27,24,0.07)` | Subtle borders |

**Button colors must use tokens:**
- `.btn-primary`: `background: var(--foreground)`, `color: var(--primary-foreground)`
- `.btn-secondary`: transparent bg, `border: var(--border)`

## Component Inventory

| Component | Location | Purpose |
|-----------|----------|---------|
| `Navigation` | `components/navigation.tsx` | Fixed nav with scroll state, mobile menu |
| `ScrollProgress` | `components/scroll-progress.tsx` | Top reading progress bar |
| `ScrollReveal` | `components/scroll-reveal.tsx` | Intersection Observer fade+slide |
| `ScrollSectionHeader` | `components/scroll-section.tsx` | Micro → Title → Description stagger |
| `ScrollParallax` | `components/scroll-parallax.tsx` | Scroll-driven y-transform wrapper |
| `Marquee` | `components/marquee.tsx` | CSS infinite scroll band |
| `TrustedBy` | `components/trusted-by.tsx` | Social proof logo/city strip |
| `BentoGrid` / `BentoCard` | `components/bento-grid.tsx` | Responsive grid with hover effects |
| `DottedMap` | `components/dotted-map.tsx` | SVG world map with pulse markers |

## Section Flow

```
Navigation (fixed)
  ↓
Hero — "What's your problem? Show us the mess."
  ↓
TrustedBy — "Trusted by teams across Southeast Asia"
  ↓
Marquee — "Messy is the method."
  ↓
Problem (01 DISCOVER) — Seven mess types
  ↓
Marquee — "Unpack • Break • Build • Learn"
  ↓
Process (02 DESIGN) — Four phases
  ↓
Progress (03 DELIVER) — Stats + milestones
  ↓
Proof (04 BUILD) — Bento grid + testimonials
  ↓
Partner — CTA with dotted map
  ↓
Marquee — "Workflows for the determined."
  ↓
Footer
```

## Wire Logic Rules

- Nav links: `#problem`, `#process`, `#proof`, `#partner`
- Footer nav must match header nav exactly
- All CTAs use `mailto:hello@adamant.asia`
- Mobile menu links close menu on click (`closeMobile` callback)
- `aria-hidden="true"` on all decorative elements (chapter markers, marquees)

## Build

```bash
npm run build
```

Must produce clean static export with zero errors.
