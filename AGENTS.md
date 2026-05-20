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

## Stage Labels (Chapter Markers)

Every section has a chapter marker in the top-right corner:

| Chapter | Label | Section ID | Color |
|---------|-------|-----------|-------|
| 01 | **THE PROBLEM** | `#problem` | `text-stone/[0.4]` |
| 02 | **HOW IT WORKS** | `#process` | `text-stone/[0.4]` |
| 03 | **THE PROGRESS** | `#progress` | `text-stone/[0.4]` |
| 04 | **WHAT WE BUILD** | `#proof` | `text-stone/[0.4]` |

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
| `--border` | `rgba(27,27,24,0.07)` | Subtle borders |

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
| `TrustedBy` | `components/trusted-by.tsx` | Platform logo strip with off-page links |
| `BentoGrid` / `BentoCard` | `components/bento-grid.tsx` | 3D layered cards with hover depth |
| `DottedMap` | `components/dotted-map.tsx` | SVG world map with pulse markers |
| `Text3DFlip` | `components/text-3d-flip.tsx` | Per-character 3D flip animation |
| `WaveCanvas` | `components/wave-canvas.tsx` | WebGL wave shader hero background |
| `CornerPlus` | `components/ui/corner-plus.tsx` | Architectural corner accent marks |
| `FlickeringGrid` | `components/flickering-grid.tsx` | Animated grid texture background |
| `JsonLd` | `components/json-ld.tsx` | Structured data for SEO |
| `ContactForm` | `components/contact-form.tsx` | Dark-section contact form |

## Section Flow

```
Navigation (fixed)
  ↓
Hero — "Build once. Run forever."
  ↓
TrustedBy — Platform logo strip (LINE, Lark, Notion, etc.)
  ↓
Marquee — "Build once. Run forever. • Systems, not slogans. • ..."
  ↓
Problem (01 THE PROBLEM) — Three pain states + truth bars
  ↓
Process (02 HOW IT WORKS) — Four phases + quote
  ↓
Progress (03 THE PROGRESS) — Milestones + outcomes + quote
  ↓
Proof (04 WHAT WE BUILD) — Carousel + Bento grid + stats + testimonials
  ↓
Marquee — "Build once. Run forever. • ..."
  ↓
Contact — Dark CTA with dotted map + form
  ↓
Footer
```

## Wire Logic Rules

- Nav links: `#problem`, `#process`, `#proof`, `#contact`
- Footer nav: `#main` (Home), `#problem`, `#process`, `#proof`, `#contact`
- All CTAs scroll to `#contact` or `#problem`
- Email: `mailto:hello@adamant.asia`
- Mobile menu links close menu on click (`closeMobile` callback)
- `aria-hidden="true"` on all decorative elements (chapter markers, marquees)
- All platform logos in TrustedBy open in `target="_blank"` with `rel="noopener noreferrer"`

## 3D BentoCard Architecture

Cards use a layered depth system:

```
Layer 0: Deep cast shadow (multi-layer box-shadow)
Layer 1: Soft gradient wash (accent color, subtle)
Layer 2: Frosted surface (bg-surface/88 + backdrop-blur)
Layer 3: Noise grain overlay (SVG fractalNoise, 2.5% opacity)
Layer 4: Top bevel highlight (gradient line, simulates light)
Layer 5: Inner depth shadow (bottom-edge gradient, thickness)
Layer 6: Border + hover glow (border-primary/20 on hover)
Layer 7: Content (icon + title + body + CTA)
```

Hover interaction:
- Card lifts: `translateY(-8px) rotateX(2deg) rotateY(-1deg)`
- Icon floats: `scale(1.1) translateY(-2px)` with ambient glow
- Shadow expands: 3-level shadow system (rest → hover)
- CTA reveals: `opacity-0 → opacity-100` (desktop only)
- Border glows: accent-colored inner highlight

Props: `name`, `description`, `Icon`, `href`, `cta`, `gradient`, `accent`

## Build

```bash
npm run build
```

Must produce clean static export with zero errors.
