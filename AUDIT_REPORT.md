# Adamant.asia — Complete Audit Report
## Neuropsychology × Design Thinking × Cora.ai × McKinsey Vizro

---

## 1. NEUROPSYCHOLOGY 2026 METHODOLOGY APPLIED

### Cognitive Load Theory (Sweller, 1988; Updated 2024)
**Principle**: Working memory has 4±1 chunks. Every design decision either reduces or increases cognitive load.

**Adamant Application**:
| Current | Problem | Fix |
|---------|---------|-----|
| 6 stat cards in Problem section | 6 chunks = overload | Reduce to 4, use pattern not data |
| 6 solution cards | Grid fatigue | 3 prominent + "and more" |
| 4 process steps | Good — within chunk limit | Keep, but add visual rhythm |
| Word cycling in hero (4 words) | Attention split | Reduce to 3, slower cycle |

### Aesthetic-Usability Effect (Tractinsky, 1997)
**Principle**: Beautiful things are perceived as more usable. But "beautiful" in 2026 = restraint, not decoration.

**Cora.ai proves this**: No glass, no glow, no gradients on text. Warm cream + one serif + generous whitespace = perceived trustworthiness.

### Von Restorff Effect (Isolation Effect)
**Principle**: Items that stand out are more likely to be remembered.

**Adamant Application**: The italic accent word in headlines IS the Von Restorff item. It must be:
- Exactly ONE per section
- Meaningfully different from surrounding text
- Consistently styled (italic + teal)

### Serial Position Effect
**Principle**: People remember first and last items best.

**Adamant Application**:
- Hero = first impression (must be unforgettable)
- CTA = last impression (must be actionable)
- Middle sections = process (can be longer, will be skimmed)

### Processing Fluency (Reber et al., 2004)
**Principle**: Easy to process = more trustworthy, more beautiful, more true.

**Adamant Application**:
- Warm gray scale (#1b1b18 not #000) = easier on eyes = more trustworthy
- One serif for everything = unified processing = more editorial
- Left-aligned text = natural reading direction = more fluent

### The Mere Exposure Effect (Zajonc, 1968)
**Principle**: Familiarity breeds liking. But novelty breeds attention.

**Adamant Balance**: Warm palette feels familiar (paper, ink). Teal accent feels novel (SEA, nature). The tension creates interest without alienation.

---

## 2. DESIGN THINKING METHOD APPLIED

### Stage 1: Empathize — Who Is the User?
**Persona**: "Determined Solo" — 25-45, SEA-based, runs a small business or creative practice. Uses LINE, Google Sheets, Facebook. Has a big vision but is drowning in repetitive tasks. Not technical. Values craft over scale.

**Empathy Map**:
- **Says**: "I know AI could help but I don't know where to start"
- **Thinks**: "Enterprise tools are not for me. I'm too small."
- **Feels**: Overwhelmed, determined, slightly lonely in their ambition
- **Does**: Works late, uses Excel, handles everything themselves

### Stage 2: Define — The Core Problem
> "Determined individuals in Southeast Asia are losing their vision to repetitive work because existing AI tools are built for enterprise scale, not human scale."

### Stage 3: Ideate — The Adamant Solution
Not "AI workflows." Not "automation." The solution is **momentum** — the feeling that your work is moving forward even when you're not pushing it.

### Stage 4: Prototype — The Website as Proof
The website IS the prototype. Every section must prove we understand the user's pain:
1. Hero: "We see your vision"
2. Problem: "We know the gap"
3. Promise: "We believe in determination"
4. Process: "We make it simple"
5. Solutions: "We build what you need"
6. CTA: "Let's start"

### Stage 5: Test — The Ogilvy Test
Every headline must pass: Would you say this to your spouse? Would they understand? Would they care?

---

## 3. CORA.AI VISUAL AUDIT — WHAT TO ADOPT

### ✅ ADOPT: Warm Gray Scale
| Adamant Current | Cora Exact | Recommendation |
|-----------------|------------|----------------|
| #1A1A19 | #1b1b18 | Use #1b1b18 (warmer, softer) |
| #F8F7F4 | #f2f2ee | Use #f2f2ee (creamier, more editorial) |
| #6B6B67 | #70706c | Use #6B6560 (slightly warmer) |
| #9C9C96 | #92928e | Keep #9C9C96 (good middle ground) |

### ✅ ADOPT: Unified Serif Typography
**Cora**: Tiempo Text for EVERYTHING. Inter ONLY for nav/UI.
**Adamant**: Newsreader for headlines, Geist Sans for body.
**Fix**: Make Newsreader the PRIMARY reading font. Geist Sans ONLY for UI chrome (nav, buttons, labels).

### ✅ ADOPT: Gradient Hero Overlay
**Cora technique**: Image + layered gradient (cream → transparent → cream)
**Adamant**: Currently solid gradient. Needs image + overlay for depth.

### ✅ ADOPT: 8px Button Radius (Not Pill)
**Cora**: 8px radius. Subtle. Disciplined.
**Adamant**: Currently pill (rounded-full). Too casual. Too SaaS.
**Fix**: 8px radius for all buttons.

### ✅ ADOPT: Gradient Border Buttons
**Cora**: Dark gray (#393939) with subtle white gradient edge
**Adamant**: Currently solid fill. Add subtle gradient edge for luminosity.

### ❌ REJECT: No Glassmorphism
**Cora**: No blur, no frosted glass.
**Adamant**: Currently has `backdrop-filter: blur(20px)` in nav.
**Fix**: Remove glass. Use solid color transitions.

### ❌ REJECT: No Centered Text
**Cora**: Left-aligned editorial.
**Adamant**: CTA section is centered. Fix to left-aligned or asymmetric.

---

## 4. McKINSEY VIZRO PATTERNS — WHAT TO ADOPT

### ✅ ADOPT: CSS Custom Properties Architecture
**Vizro**: Extensive `--Dash-*` and `--mantine-*` tokens with semantic naming.
**Adamant**: Has tokens but inconsistent usage (hardcoded hexes in components).
**Fix**: All colors must use CSS variables. No hardcoded hexes in TSX.

### ✅ ADOPT: Component State Tokens
**Vizro**: `--Dash-Fill-Interactive-Strong`, `--Dash-Fill-Weak`, `--Dash-Text-Disabled`
**Adamant**: Missing semantic state tokens.
**Fix**: Add `--color-interactive`, `--color-disabled`, `--color-hover` tokens.

### ✅ ADOPT: Theme-Aware Color System
**Vizro**: `[data-bs-theme="dark"]` and `[data-bs-theme="light"]` with full token overrides.
**Adamant**: No dark mode (correct — warm palette is the brand).
**Fix**: Keep light-only but make tokens theme-ready for future.

### ✅ ADOPT: Card Elevation System
**Vizro**: `box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2)` — subtle, directional.
**Adamant**: Has `shadow-soft`, `shadow-card`, `shadow-float` — good but needs refinement.
**Fix**: Single shadow system with 3 levels: rest, hover, active.

### ❌ REJECT: Bootstrap Dependency
**Vizro**: Heavy Bootstrap theming.
**Adamant**: Tailwind v4. Keep it. More modern, more flexible.

### ❌ REJECT: Dashboard Layout Patterns
**Vizro**: Grid layouts, control panels, nav bars — all dashboard-specific.
**Adamant**: Marketing site. Not applicable.

---

## 5. FILE-BY-FILE AUDIT

### globals.css — INCONSISTENCIES FOUND

| Issue | Severity | Fix |
|-------|----------|-----|
| `--color-paper` not defined in @theme inline | Medium | Add to @theme inline |
| `--color-ink` not defined in @theme inline | Medium | Add to @theme inline |
| `--color-teal` not defined in @theme inline | Medium | Add to @theme inline |
| `--color-amber` not defined in @theme inline | Medium | Add to @theme inline |
| `--ease-spring` defined but not used in @theme | Low | Keep as utility |
| `glass` utility exists (violates Cora no-glass rule) | High | Remove or replace |
| `shadow-soft` uses rgba(0,0,0,0.04) — too subtle | Low | Increase to 0.06 |
| `--font-hero` defined in :root but not in @theme | Low | Add to @theme |
| No `--color-interactive` or `--color-hover` tokens | Medium | Add semantic tokens |

### hero.tsx — INCONSISTENCIES FOUND

| Issue | Severity | Fix |
|-------|----------|-----|
| Word cycle: 4 words, 2.5s interval = too fast | Medium | 3 words, 3.5s interval |
| No image background (Cora has image + gradient) | High | Add subtle abstract image |
| Button uses `rounded-lg` (not pill, good) but no gradient border | Medium | Add gradient border effect |
| Headline uses `text-[clamp(...)]` instead of `text-hero` utility | Low | Use utility class |
| `not-italic` on `<em>` — contradicts brand italic pattern | High | Remove `not-italic`, let it be italic |

### navigation.tsx — INCONSISTENCIES FOUND

| Issue | Severity | Fix |
|-------|----------|-----|
| `backdrop-blur-md` on scroll (violates no-glass rule) | High | Remove blur, use solid bg transition |
| Mobile menu uses `AnimatePresence` (good) but no spring physics | Low | Add spring to mobile menu |
| CTA button uses `rounded-lg` (good, 8px direction) | — | Keep |
| No active state indicator on nav links | Medium | Add underline or color shift |

### problem.tsx — INCONSISTENCIES FOUND

| Issue | Severity | Fix |
|-------|----------|-----|
| 4 stat cards = good chunk size | — | Keep count |
| Hardcoded hexes: `#B45309`, `#1A1A19`, `#6B6B67` | High | Use CSS variables |
| Cards use `shadow-soft` + hover `shadow-card` (good) | — | Keep pattern |
| `bg-white` on cards (Cora uses warm surfaces) | Medium | Use `--surface-raised` |
| "1 size" stat feels forced/jokey | Medium | Replace with real stat |

### promise.tsx — INCONSISTENCIES FOUND

| Issue | Severity | Fix |
|-------|----------|-----|
| `bg-white` section background (Cora uses cream throughout) | Medium | Use `--background` |
| Hardcoded hexes throughout | High | Use CSS variables |
| Icon containers use `bg-[#E8F0EE]` — inconsistent with brand | Low | Use `--color-teal` at 10% opacity |
| Pillar cards use `bg-[#FAFAF8]` — close to `--surface-raised` | Low | Use token |
| "Human judgment, automated execution" — slightly jargon-y | Medium | Simplify |

### process.tsx — INCONSISTENCIES FOUND

| Issue | Severity | Fix |
|-------|----------|-----|
| `bg-gradient-warm` uses hardcoded gradient | Medium | Use CSS variable |
| Step numbers in `#C4C4BF` — good muted color | — | Keep |
| 4 steps = perfect chunk size | — | Keep |
| "No six-month roadmap" — negative framing (good, Ogilvy) | — | Keep |
| Cards use `bg-white` — should use `--surface` | Low | Use token |

### solutions.tsx — INCONSISTENCIES FOUND

| Issue | Severity | Fix |
|-------|----------|-----|
| 6 solution cards = overload (cognitive load) | High | Reduce to 3 or use accordion |
| Hardcoded hexes throughout | High | Use CSS variables |
| "Intelligent assistants" — slightly generic | Medium | Be more specific |
| "Content systems" — vague | Medium | "Content that writes itself" |
| "Data clarity" — abstract | Medium | "Reports that build themselves" |
| "Process automation" — jargon | Medium | "Your tools, talking" |
| "Meeting memory" — good, specific | — | Keep |
| "Communication rhythm" — slightly vague | Low | Keep or refine |

### cta.tsx — INCONSISTENCIES FOUND

| Issue | Severity | Fix |
|-------|----------|-----|
| Centered text (violates Cora left-align rule) | High | Left-align or asymmetric |
| `bg-[#1A1A19]` hardcoded | High | Use `--foreground` |
| Noise texture SVG inline — clever but heavy | Medium | Use CSS noise or remove |
| Buttons are `rounded-full` (pill) — violates Cora 8px rule | High | Use `rounded-lg` (8px) |
| "Book a discovery call" — slightly corporate | Medium | "Talk it through" |
| No form — just email link (good, reduces friction) | — | Keep |

### footer.tsx — INCONSISTENCIES FOUND

| Issue | Severity | Fix |
|-------|----------|-----|
| Hardcoded `bg-[#1A1A19]` | High | Use `--foreground` |
| Logo mark uses `rounded-full` (circle) — okay for mark | — | Keep |
| "Built for Southeast Asia" — good, specific | — | Keep |
| Border uses `rgba(255,255,255,0.06)` — should use token | Low | Use `--border` with opacity |

### scroll-reveal.tsx — INCONSISTENCIES FOUND

| Issue | Severity | Fix |
|-------|----------|-----|
| Easing `[0.25, 0.46, 0.45, 0.94]` — smooth but not springy | Low | Consider spring for hover states |
| `margin: "-80px"` trigger point — good, early reveal | — | Keep |
| No `prefers-reduced-motion` support | Medium | Add media query |

---

## 6. PRIORITY MATRIX

### P0 — Must Fix (Build-breaking or brand-breaking)
1. Remove all hardcoded hex colors from TSX files
2. Remove glassmorphism from navigation
3. Fix button radius to 8px (not pill)
4. Left-align CTA section
5. Reduce solution cards from 6 to 4 (cognitive load)

### P1 — Should Fix (Significant improvement)
6. Unify typography: Newsreader for body text, Geist Sans for UI only
7. Add gradient border effect to primary buttons
8. Add hero image + gradient overlay (Cora technique)
9. Simplify solution card copy
10. Add semantic state tokens to CSS

### P2 — Nice to Have (Polish)
11. Add `prefers-reduced-motion` support
12. Refine shadow system
13. Add active state to nav links
14. Optimize word cycle timing
15. Add subtle texture to dark sections

---

## 7. NEUROPSYCHOLOGY-COPY SYNTHESIS

### The Brain on "Determined"
- **Prefrontal cortex**: "Determined" activates goal-directed behavior circuits
- **Amygdala**: "Determined" reduces threat response (vs "enterprise" which triggers inadequacy)
- **Dopamine**: "Determined" primes reward anticipation

### The Brain on "Big vision doesn't need a big company"
- **Pattern recognition**: Negative framing ("doesn't need") is more memorable
- **Social comparison**: "Big company" triggers inferiority → "doesn't need" resolves it
- **Self-efficacy**: The reader feels capable, not inadequate

### The Brain on Warm Colors
- **Pupil response**: Warm grays cause less constriction than pure black = longer reading
- **Emotional association**: Cream = comfort, safety, trust
- **Cultural**: In SEA, warm tones = hospitality, respect

### The Brain on Left Alignment
- **Saccade pattern**: Left-aligned text follows natural F-pattern reading
- **Cognitive ease**: Predictable starting point = less mental effort
- **Editorial authority**: Left-aligned = newspaper = credible

---

*Audit completed: May 2026*
*Next step: Implement P0 fixes*
