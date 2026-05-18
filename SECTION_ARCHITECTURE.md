# Adamant Section Architecture
## The Six-P Narrative Framework + QBDS Integration

---

## The Six-P Story Arc

Every great story follows a pattern. We distilled the hero's journey into six P's — each a section, each a psychological beat:

```
┌─────────────────────────────────────────────────────────────┐
│  HERO     →  The Hook                                       │
│  "Big vision determined doesn't need a big company."        │
│  Neuro: Identity mirror + dopamine priming                  │
├─────────────────────────────────────────────────────────────┤
│  PROBLEM  →  The Fire (Ogilvy: open with the fire)          │
│  "Most AI is built for corporations, not craftsmen."        │
│  Neuro: Threat detection → empathy → relief                 │
├─────────────────────────────────────────────────────────────┤
│  PROCESS  →  The Path                                       │
│  "From conversation to workflow in two weeks."              │
│  Neuro: Cognitive ease → action confidence                  │
├─────────────────────────────────────────────────────────────┤
│  PROGRESS →  The Proof (measurable, not promised)           │
│  "Momentum you can measure."                                │
│  Neuro: Concrete numbers → credibility → trust              │
├─────────────────────────────────────────────────────────────┤
│  PROOF    →  The Product (what we actually build)           │
│  "Tools that disappear into your day."                      │
│  Neuro: Specificity → mental simulation → desire            │
├─────────────────────────────────────────────────────────────┤
│  PARTNER  →  The Invitation (not a demand)                  │
│  "Your vision is adamant. So are we."                       │
│  Neuro: Low friction → conversation → conversion            │
└─────────────────────────────────────────────────────────────┘
```

---

## Why These Six P's Work

### 1. Hook → Problem (Tension)
The hero section makes a bold claim. The problem section validates the reader's frustration. This creates narrative tension: "You feel this. We see it."

### 2. Problem → Process (Relief)
After acknowledging the pain, we immediately offer the path. Not a vague promise — a specific process. This releases tension.

### 3. Process → Progress (Credibility)
Anyone can describe a process. Progress adds numbers. "Two weeks" becomes real when paired with "12 hours saved."

### 4. Progress → Proof (Specificity)
Progress says "it works." Proof says "here's exactly what you get." Four concrete solutions. No abstraction.

### 5. Proof → Partner (Conversion)
After seeing the product, the reader is ready. Partner is not "Contact us" — it is "Your vision is adamant. So are we." Identity + invitation.

---

## The P's We Rejected

| Rejected P | Why | Replacement |
|-----------|-----|-------------|
| Promise | Too vague, too SaaS | **Progress** (measurable) |
| Pricing | Too early in story | **Partner** (conversation first) |
| Platform | Enterprise speak | **Proof** (specific tools) |
| People | Social proof too soon | Integrated into Progress |
| Philosophy | Abstract, not actionable | Integrated into Problem |
| Product | Too broad | **Proof** (specific solutions) |

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
| Dark mode emphasis | Warmth is our brand | Light-only |
| Dashboard layouts | Marketing site, not app | Editorial sections |

---

## File Structure

```
src/
├── app/
│   ├── globals.css          # Design system (Cora + QBDS + Neuro)
│   ├── layout.tsx           # Root layout (fonts, metadata)
│   └── page.tsx             # Six-P assembly
├── components/
│   ├── navigation.tsx       # Fixed nav (no glass, solid transitions)
│   ├── scroll-reveal.tsx    # Framer Motion scroll animations
│   └── sections/
│       ├── hero.tsx         # The Hook
│       ├── problem.tsx      # The Fire
│       ├── process.tsx      # The Path
│       ├── progress.tsx     # The Proof (measurable)
│       ├── proof.tsx        # The Product (specific)
│       ├── partner.tsx      # The Invitation
│       └── footer.tsx       # The Close
```

---

## Neuropsychology by Section

### Hero — Prefrontal Cortex + Dopamine
- "Big vision" = aspiration (dopamine release)
- "determined" = identity (prefrontal activation)
- "doesn't need" = negative framing (amygdala + memory)

### Problem — Threat Detection + Empathy
- "corporations" = out-group (threat)
- "craftsmen" = in-group (identity)
- "fifty seats" = specific, vivid (hippocampus encoding)

### Process — Cognitive Ease
- 4 steps = optimal chunking (4±1 rule)
- "Map → Design → Build → Run" = narrative arc
- "two weeks" = specific timeframe (reduces uncertainty)

### Progress — Credibility Through Numbers
- "2 weeks / 30 days / 12 hrs / 1 person" = concrete
- "I forgot the system was there" = social proof
- Numbers = left brain validation

### Proof — Mental Simulation
- "Conversations that know your business" = specific use case
- "Your tools, talking" = vivid metaphor
- 4 solutions = chunk limit respected

### Partner — Low-Friction Conversion
- "Your vision is adamant" = identity fusion
- "So are we" = brand as mirror
- "Talk it through" = conversation, not transaction

---

## The Ogilvy Test: Section by Section

| Section | Headline | Spouse Test |
|---------|----------|-------------|
| Hero | "Big vision determined doesn't need a big company." | ✓ Would say, ✓ Understands, ✓ Cares |
| Problem | "Most AI is built for corporations, not craftsmen." | ✓ Would say, ✓ Understands, ✓ Cares |
| Process | "From conversation to workflow in two weeks." | ✓ Would say, ✓ Understands, ✓ Cares |
| Progress | "Momentum you can measure." | ✓ Would say, ✓ Understands, ✓ Cares |
| Proof | "Tools that disappear into your day." | ✓ Would say, ✓ Understands, ✓ Cares |
| Partner | "Your vision is adamant. So are we." | ✓ Would say, ✓ Understands, ✓ Cares |

---

## QBDS Color Token Mapping

| QBDS Token | Adamant Token | Value |
|-----------|---------------|-------|
| `--text-primary` | `--foreground` | #1b1b18 |
| `--text-secondary` | `--stone` | #6b6560 |
| `--text-tertiary` | `--dim` | #9c9c96 |
| `--text-disabled` | `--dim` | #9c9c96 |
| `--text-primary-inverse` | `--background` | #f2f2ee |
| `--fill-primary` | `--primary` | #0f766e |
| `--fill-secondary` | `--secondary` | #e8e8e3 |
| `--fill-muted` | `--muted` | #e8e8e3 |
| `--border-divider` | `--border` | rgba(27,27,24,0.07) |
| `--border-primary` | `--stroke-secondary` | rgba(27,27,24,0.12) |
| `--surface-primary` | `--card` | #ffffff |
| `--surface-secondary` | `--surface-raised` | #fafaf8 |
| `--surface-base` | `--background` | #f2f2ee |
| `--stateslayer-overlay-hover` | `--overlay-hover` | rgba(15,118,110,0.06) |
| `--stateslayer-overlay-pressed` | `--overlay-pressed` | rgba(15,118,110,0.12) |

---

*Architecture v3.0 — May 2026*
*Six-P Narrative + QBDS Tokens + Neuropsychology*
