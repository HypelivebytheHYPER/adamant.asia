# Adamant Section Architecture
## Current State — May 2026

---

## Section Flow

```
┌─────────────────────────────────────────────────────────────┐
│  HERO     →  "Build once. Run forever."                     │
│  Neuro: Identity mirror + dopamine priming                  │
├─────────────────────────────────────────────────────────────┤
│  TRUSTEDBY →  Orbiting tool integrations                    │
│  LINE, Lark, WhatsApp, Slack, Google, Notion, Shopify, Stripe│
├─────────────────────────────────────────────────────────────┤
│  PROBLEM  →  "Your team asks you for everything."           │
│  Before: Chaotic notifications (LINE, Email, Team, Orders)  │
│  After: Terminal showing auto-responses                     │
├─────────────────────────────────────────────────────────────┤
│  PROCESS  →  "From chaos to system in two weeks."           │
│  4 phases: Map → Design → Build → Run                       │
│  Pipeline diagram + numbered phase cards                    │
├─────────────────────────────────────────────────────────────┤
│  PROGRESS →  KOL Campaign Dashboard                         │
│  "KOL campaigns used to take 6 hours. Now they take 6 min." │
│  Pure CSS dashboard mockup + before/after stats             │
├─────────────────────────────────────────────────────────────┤
│  PROOF    →  "Built for how you work."                      │
│  4 transformation stories (Thida, Min, Sarin, Ploy)         │
│  Stats bar + auto-scrolling quote marquee                   │
├─────────────────────────────────────────────────────────────┤
│  CONTACT  →  "Fix your workflow."                           │
│  Terminal booking + contact form + dotted map               │
├─────────────────────────────────────────────────────────────┤
│  MARQUEE  →  "Build once. Run forever."                     │
│  CSS-infinite editorial band                                │
├─────────────────────────────────────────────────────────────┤
│  FOOTER   →  Links + copyright                              │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
src/
├── app/
│   ├── globals.css          # Design system (Cora + QBDS)
│   ├── layout.tsx           # Root layout (fonts, metadata)
│   └── page.tsx             # Direct section imports (no lazy loading)
├── components/
│   ├── navigation.tsx       # Fixed nav (no glass, solid transitions)
│   ├── scroll-reveal.tsx    # Framer Motion scroll animations
│   ├── blur-fade.tsx        # Opacity + translateY entrance
│   ├── scroll-parallax.tsx  # Scroll-driven y-transform
│   ├── marquee.tsx          # CSS infinite scroll band
│   ├── orbiting-circles.tsx # Dual-orbit animation component
│   ├── terminal.tsx         # macOS terminal with typing animation
│   ├── workflow-nodes.tsx   # SVG node graphs with connections
│   ├── kol-dashboard-mockup.tsx  # Pure CSS dashboard UI
│   ├── dotted-map.tsx       # SVG world map with pulse markers
│   ├── text-3d-flip.tsx     # Per-character 3D flip animation
│   ├── wave-canvas.tsx      # WebGL wave shader hero background
│   ├── contact-form.tsx     # Dark-section contact form
│   ├── platform-logos.tsx   # Monochrome SVG brand marks
│   └── sections/
│       ├── hero.tsx         # "Build once. Run forever."
│       ├── problem.tsx      # Before/After notifications + terminal
│       ├── process.tsx      # 4-phase pipeline + cards
│       ├── progress.tsx     # KOL Dashboard mockup
│       ├── proof.tsx        # Transformation stories + stats
│       ├── contact.tsx      # Dark CTA + terminal + form
│       └── footer.tsx       # Links + copyright
```

---

## QBDS Token Architecture Integration

### What We Adopted from QuantumBlack Design System

| QBDS Pattern | Adamant Adaptation | File |
|-------------|-------------------|------|
| `--fg-*` tokens | `--color-fg-primary`, `--fg-secondary`, `--fg-tertiary` | globals.css |
| `--fill-*` tokens | `--color-fill-primary`, `--fill-secondary`, `--fill-muted` | globals.css |
| `--stroke-*` tokens | `--color-stroke-primary`, `--stroke-secondary`, `--stroke-active` | globals.css |
| `--surface-*` tokens | `--color-surface-primary`, `--surface-secondary`, `--surface-base` | globals.css |
| State layer overlays | `--color-overlay-hover`, `--overlay-pressed`, `--overlay-disabled` | globals.css |
| Elevation system | `shadow-rest`, `shadow-hover`, `shadow-active` | globals.css |
| `.radius-mode` | 8px default radius (Adamant is always radius-mode) | globals.css |
| Button state gradients | `hover:[background-image:linear-gradient(...)]` pattern | btn-primary |
| `.state-hover` utility | Background overlay on hover (not color change) | globals.css |

### What We Rejected from QBDS

| QBDS Pattern | Why Rejected | Adamant Choice |
|-------------|-------------|----------------|
| Inter font | Not editorial enough | Newsreader serif |
| Slate/Mist palette | Too cold, too corporate | Warm cream/ink |
| Sharp radius default | Too harsh for editorial | 8px always |
| `--bs-*` Bootstrap tokens | Tailwind v4 native | Custom tokens |
| Dark mode | Warmth is our brand, no toggle | **Light-only, removed entirely** |
| Dashboard layouts | Marketing site, not app | Editorial sections |

---

## Neuropsychology by Section

### Hero — Prefrontal Cortex + Dopamine
- "Build once. Run forever." = aspiration (dopamine release)
- "Systems for teams that move fast" = identity (prefrontal activation)
- Wave shader background = visual novelty (attention capture)

### TrustedBy — Social Proof Through Motion
- 8 tools orbiting central hub = "everything connects to us"
- Dual-orbit animation = visual interest without cognitive load
- Logos are recognizable channel marks = trust transfer

### Problem — Threat Detection + Relief
- "Your team asks you for everything" = pain recognition
- Chaotic notifications = vivid threat (amygdala activation)
- Terminal showing auto-responses = immediate relief

### Process — Cognitive Ease
- 4 steps = optimal chunking (4±1 rule)
- "Map → Design → Build → Run" = narrative arc
- "two weeks" = specific timeframe (reduces uncertainty)
- Numbered cards (01-04) = progressive disclosure

### Progress — Concrete Proof
- Dashboard mockup = mental simulation ("this could be mine")
- "6 hours → 6 minutes" = concrete before/after
- "1 dashboard" = specificity → credibility

### Proof — Social Validation
- 4 real names (Thida, Min, Sarin, Ploy) = human-scale trust
- Before/after per card = transformation story
- Stats bar (47 teams, 4 countries) = social proof at scale
- Quote marquee = continuous reinforcement

### Contact — Low-Friction Conversion
- Terminal booking = novelty + system metaphor
- "Fix your workflow" = problem-focused, not salesy
- "No pitch" = removes friction
- Dotted map (Bangkok + Singapore) = geographic credibility

---

## QBDS Color Token Mapping

| QBDS Token | Adamant Token | Value |
|-----------|---------------|-------|
| `--text-primary` | `--foreground` | #1b1b18 |
| `--text-secondary` | `--stone` | #6b6560 |
| `--text-tertiary` | `--dim` | #7a746d |
| `--text-disabled` | `--dim` | #7a746d |
| `--text-primary-inverse` | `--background` | #f2f2ee |
| `--fill-primary` | `--primary` | #0f766e |
| `--fill-secondary` | `--secondary` | #e8e8e3 |
| `--fill-muted` | `--muted` | #e8e8e3 |
| `--border-divider` | `--border` | color-mix(...) |
| `--border-primary` | `--stroke-secondary` | color-mix(...) |
| `--surface-primary` | `--card` | #ffffff |
| `--surface-secondary` | `--surface-raised` | #fafaf8 |
| `--surface-base` | `--background` | #f2f2ee |
| `--stateslayer-overlay-hover` | `--overlay-hover` | color-mix(...) |
| `--stateslayer-overlay-pressed` | `--overlay-pressed` | color-mix(...) |

---

## Performance Architecture

| Decision | Before | After | Why |
|----------|--------|-------|-----|
| Section loading | `dynamic()` lazy load | Direct import in `page.tsx` | Eliminated scroll jank |
| Phase card animation | `AnimatedList` (JS timers) | Static grid + `BlurFade` | Removed 4s freeze |
| Notification reveal | `AnimatedList` (JS timers) | Static list | Removed 8s freeze |
| Terminal delays | 5s cumulative | 2.6s cumulative | Faster perceived load |
| Dark mode | `prefers-color-scheme` block | **Removed entirely** | No toggle, no design, dead code |

---

*Architecture v4.0 — May 2026*
*Light-mode only · No lazy loading · Static-first*
