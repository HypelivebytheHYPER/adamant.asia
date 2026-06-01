<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Adamant.asia — Agent Design Reference

## Domain

**Production URL:** `https://adamant.asia`
**Vercel org:** `hypelives-projects`
**Contact:** `sam@adamant.asia`
**WhatsApp:** `+65 8921 1191`

---

## Page Structure & Section IDs

The homepage is a single-page with deep-linkable section IDs:

```
Navigation (fixed, scroll-aware, accepts links prop)
  ↓
#hero       — Cycling headline + WebGL wave background (content-driven)
  ↓
#platforms  — Trusted platforms bar
  ↓
#showcase   — Editorial image showcase
  ↓
#problem    — Before/After comparison
  ↓
#solutions  — Device frame showcase
  ↓
#process    — 4-phase timeline + inline contact form
  ↓
#model      — Editorial model section
  ↓
#reviews    — Testimonial carousel
  ↓
#faq        — Accordion FAQ + marquee
  ↓
#contact    — Dark CTA with contact form
  ↓
Footer      — Logo, nav links, email + WhatsApp
```

**Section IDs (top to bottom):** hero, platforms, showcase, problem, solutions, process, model, reviews, faq, contact

Voice agent can scroll to any via "scroll_to_section" tool.

**Other pages:**
| Route | File | Description |
|-------|------|-------------|
| `/pricing` | `app/pricing/page.tsx` | Dual-currency pricing with unlock gate |
| `/founder` | `app/founder/page.tsx` | Async SC, data from Lark Base Config table |
| `/solutions/[slug]` | `app/solutions/[slug]/page.tsx` | generateStaticParams — 4 solution pages |
| `/dashboard` | `app/dashboard/page.tsx` | Mobile preview demo (noindex) |
| `/demo` | `app/demo/page.tsx` | Campaign hub demo (noindex) |

---

## Content Architecture

### Data Flow

`src/data/content.ts` is the **static source of truth** for all marketing copy. It exports typed interfaces and the `siteContent` object that drives every section.

**Some dynamic data** (founder page metadata) comes from Lark Base "Config" table via `src/lib/site-config.ts`.

**Do NOT** hardcode marketing text in section components — always pull from content.ts via props.

### Adding New Content

1. Add interface in `src/data/content.ts`
2. Add content to `siteContent` object
3. Wire into section props in `src/app/(home)/page.tsx`
4. Consume in section component

---

## Component Inventory

### Section Components (render order)

| Component | File | Props | Notes |
|-----------|------|-------|-------|
| `Hero` | `sections/hero.tsx` | `{ content }` | Cycling headline, wave bg, CTA |
| `TrustedPlatforms` | `sections/trusted-platforms.tsx` | `()` | Logos: LINE, Lark, WhatsApp, Slack, Google, Notion, Shopify, Stripe |
| `ShowcaseCards` | `sections/showcase-cards.tsx` | `()` | Editorial image showcase with parallax |
| `Problem` | `sections/problem.tsx` | `{ content }` | Before/after comparison cards |
| `Solutions` | `sections/solutions.tsx` | `{ content }` | Wraps `SolutionScrollShowcase` |
| `Process` | `sections/process.tsx` | `{ content, phases }` | Timeline + `<ContactForm inline />` |
| `Model` | `sections/model.tsx` | `{ content }` | Editorial model section |
| `StatsBar` | `sections/stats-bar.tsx` | `{ stats }` | Number stats row |
| `Reviews` | `sections/reviews.tsx` | `{ content, testimonials }` | Carousel with before/after |
| `FAQ` | `sections/faq.tsx` | `{ items }` | Accordion + marquee |
| `Contact` | `sections/contact.tsx` | `{ content, contactInfo }` | Reuses `<ContactForm variant="dark" />` |
| `Footer` | `components/footer.tsx` | `{ content, navLinks, year }` | Logo, nav, email, WhatsApp |
| `Navigation` | `components/navigation.tsx` | `{ links }` | Fixed nav, mobile menu, CTA pill |

### UI & Feature Components

| Component | File | Purpose |
|-----------|------|---------|
| `DeviceFrame` | `components/ui/iphone.tsx` | iPhone 15 Pro frame — renders `children` as screen |
| `ContactForm` | `components/contact-form.tsx` | Universal form, `variant="light\|dark"`, `inline` mode |
| `ContactModal` | `components/contact-modal.tsx` | Modal wrapper for `<ContactForm inline />` |
| `PricingClient` | `components/pricing-client.tsx` | Currency toggle + unlock gate |
| `CampaignHubDemo` | `components/campaign-hub-demo.tsx` | Interactive dashboard preview |
| Device screens | `components/device-screens/` | 4 live UIs: SaaS Build, Marketing, AI Workflow, KOL |
| `WaveCanvas` | `components/wave-canvas.tsx` | WebGL hero, pauses off-screen, DPR capped at 1.5 |
| `EditorialImage` | `components/editorial-image.tsx` | Parallax with `useReducedMotion` guard |
| `ScrollProgress` | `components/scroll-progress.tsx` | Smooth trailing progress bar |
| `BlurFade` | `components/animations/blur-fade.tsx` | Opacity + translateY entrance |
| `ScrollParallax` | `components/animations/scroll-parallax.tsx` | Scroll-driven y-transform |
| `ScrollReveal` | `components/animations/scroll-reveal.tsx` | Intersection Observer fade+slide |
| `SolutionScrollShowcase` | `registry/magicui/feature-scroll.tsx` | Sticky-scroll device cards |
| `Terminal` | `components/terminal.tsx` | macOS-style typing animation |
| `DottedMap` | `components/dotted-map.tsx` | SVG world map with pulse markers |
| `OrbitingCircles` | `components/orbiting-circles.tsx` | Dual-orbit animation |
| `Marquee` | `components/marquee.tsx` | CSS infinite scroll |
| `TrustedBy` | `components/trusted-by.tsx` | Platform logo grid |
| `TestimonialCarousel` | `components/testimonial-carousel.tsx` | Horizontal scroll |
| `CyclingHeadline` | `components/cycling-headline.tsx` | Typewriter rotating messages |
| `ElevenLabsOrb` | `components/elevenlabs-orb.tsx` | Hero page voice orb |
| `FloatingVoiceWidget` | `components/floating-voice-widget.tsx` | Mini voice widget |
| `OrbVisualizer` | `components/orb-visualizer.tsx` | Frequency visualization |
| `VoiceAgentController` | `components/voice-agent-controller.tsx` | Persistent `useConversation()` |
| `VoiceAgentContext` | `components/voice-agent-context.tsx` | Conversation state context |
| `VoiceAgentProvider` | `components/voice-agent-provider.tsx` | Context provider |
| `JsonLd` | `components/json-ld.tsx` | Organization + WebSite + Service schema |
| `BreadcrumbJsonLd` | `components/breadcrumb-json-ld.tsx` | BreadcrumbList schema |
| `Text3DFlip` | `components/text-3d-flip.tsx` | Per-character 3D flip |
| `WorkflowNodes` | `components/workflow-nodes.tsx` | SVG node graphs |
| `PlatformLogos` | `components/platform-logos.tsx` | Monochrome SVG marks |

### Services / Utilities

| Module | File | Purpose |
|--------|------|---------|
| Lark API | `lib/lark-api.ts` | Lark Base REST client |
| Site config | `lib/site-config.ts` | Lark Config table fetcher (founder page) |
| Pricing | `lib/pricing.ts` | Server-side pricing + fallback |
| Site constants | `lib/site.ts` | `SITE_URL`, `CONTACT_EMAIL`, `SOCIAL_PROFILES` |
| Telegram | `lib/telegram.ts` | Bot API + notification formatters |
| ElevenLabs config | `lib/elevenlabs-config.ts` | AGENT_ID, API_BASE, voice |
| Animation | `lib/animation.ts` | Shared easing curves |
| Tokens | `lib/tokens.ts` | Theme color tokens |
| Utils | `lib/utils.ts` | `cn()` (clsx + tailwind-merge) |
| SEO images | `lib/seo-image-protocol.ts` | Alt text + metadata helpers |
| Reduced motion | `lib/hooks/use-reduced-motion.ts` | `prefers-reduced-motion` observer |

---

## Typography System

| Token | Font | Size | Weight | Line Height | Usage |
|-------|------|------|--------|-------------|-------|
| `text-hero` | Newsreader (serif) | clamp(2–4rem) | 400 | 1.1 | Hero headline only |
| `text-display` | Newsreader (serif) | clamp(1.5–2.25rem) | 400 | 1.2 | Section headings (h2) |
| `text-headline` | Newsreader (serif) | clamp(1–1.25rem) | 400 | 1.3 | Card titles, sub-headings |
| `text-lead` | Newsreader (serif) | clamp(0.94–1.06rem) | 400 | 1.55 | Intro paragraphs |
| `text-body` | **Geist Sans** (sans) | clamp(1–1.06rem) | 400 | 1.65 | Body text, descriptions |
| `text-caption` | Geist Sans (sans) | clamp(0.75–0.81rem) | 400 | 1.5 | Labels, metadata |
| `text-micro` | Geist Sans (sans) | 0.6875rem | 500 | — | Uppercase labels |
| `text-ui` | Geist Sans (sans) | 0.9375rem | 400 | 1.5 | Navigation, buttons |
| `text-chapter` | Newsreader (serif) | clamp(6–12rem) | 400 | 1 | Watermark numbers |

**Rules:**
- Serif (Newsreader) = editorial voice — headlines, quotes, hero
- Sans (Geist) = functional text — body, UI, captions, nav
- Never use `font-medium` or `tracking-tight` ad-hoc
- Italic (`<em>`) preferred over bold for emphasis

---

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--foreground` | `#1b1b18` | Primary text, dark surfaces |
| `--background` | `#f2f2ee` | Page background |
| `--primary` | `#0f766e` | Teal — CTAs, links, accent |
| `--accent` | `#9a4707` | Amber — micro labels |
| `--stone` | `#6b6560` | Secondary text |
| `--dim` | `#7a746d` | Tertiary text |
| `--verse` | `#4a4a45` | Deep warm gray |
| `--surface` | `#ffffff` | Card backgrounds |
| `--surface-raised` | `#fafaf8` | Elevated surfaces |
| `--warm` | `#f5f0e8` | Gradient backgrounds |
| `--border` | `color-mix(...)` | Subtle borders |
| `--destructive` | `#b91c1c` | Error states |

**Inverse palette** (dark surfaces: `bg-foreground`, footer, contact):
| Token | Value | Contrast |
|-------|-------|----------|
| `--inverse` | `#f2f2ee` | 15.4:1 |
| `--inverse-weak` | `#b8b3aa` | 8.3:1 |
| `--inverse-muted` | `#8a847a` | 4.7:1 |

**Rules:**
- `text-dim` / `text-stone` = light surfaces only
- Dark surfaces MUST use `text-inverse*` family
- **No dark mode** — warm cream by design. No `prefers-color-scheme`, no `dark:` variants.

---

## Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `section-pad` | clamp(3rem, 5vw+1rem, 5.5rem) | Section vertical padding |
| `space-block-sm` | clamp(2rem, 3vw+0.5rem, 3.5rem) | Small gap |
| `space-block` | clamp(2.5rem, 4vw+0.5rem, 4.5rem) | Standard gap |
| `space-block-lg` | clamp(3rem, 4vw+1rem, 5rem) | Large gap |
| `space-strip` | clamp(1.25rem, 2vw+0.25rem, 2rem) | Footer/marquee strip padding |
| `gap-fluid` | clamp(1rem, 2vw+0.25rem, 2rem) | Grid gap |
| `gap-fluid-lg` | clamp(1.5rem, 3vw+0.5rem, 3rem) | Large grid gap |

---

## Lead Capture & Notifications

### Form Entry Points

| Location | Fields | Source | API |
|----------|--------|--------|-----|
| Homepage CTA button | name, email, company, phone, message | "Contact Section" | `/api/pricing-lead` |
| Homepage /#contact | name, email, company, phone, message | "Contact Section" | `/api/pricing-lead` |
| Process section form | name, email, company, phone, message | "Contact Section" | `/api/pricing-lead` |
| Homepage hero modal | name, email, company, phone, message | "Contact Section" | `/api/pricing-lead` |
| Pricing unlock gate | name, email, company, phone, message | "Pricing Page" | `/api/pricing-lead` |

**Phone field is optional** across all forms.

### Data Flow

```
Form submission
  -> /api/pricing-lead (POST)
    ├── Rate limit: 5 req/min per IP
    ├── Validate: name (>=2 chars), email (regex)
    ├── Sanitize: slice limits (name 100, email/company/phone 200, message 2000)
    ├── Write to Lark Base "Pricing Leads" table (fallback if Phone column missing)
    └── Fire Telegram notification (non-blocking, best-effort)
```

### Telegram Notifications

All notifications go to `TELEGRAM_CHAT_ID` group via `@adamanasiabot`.

**Lead notification format:**
```
📩 New Lead — Contact Section     (or 💰 for Pricing Page)

Name: [Name]
Email: [email]
📱 Phone/WhatsApp: [number]       (only if provided)
💬 Chat on WhatsApp              (clickable wa.me link)
Company: [Company]
Message: [message, truncated at 400 chars]

📧 Reply by email               (clickable mailto link)
```

**Voice call summary format:**
```
🎙️ Voice Call Ended

User: [name or Anonymous]
ID: conv_xxx
Duration: Xm Ys
Outcome: Yes / No / unknown
Ended by: [reason]

Summary: [AI-generated transcript summary, truncated at 500 chars]
```

---

## Voice Agent (ElevenLabs ConvAI)

### Architecture

Persistent session in `layout.tsx` — survives page navigation via Next.js client-side routing.

```
layout.tsx
  -> VoiceAgentProvider (context)
    -> VoiceAgentController (useConversation — persistent, registers tools)
      ├── {children} (all pages)
      └── FloatingVoiceWidget (mini orb on all pages when active)
```

### Client Tools (6)

| Tool | Trigger | Action |
|------|---------|--------|
| `book_call` | "Book a call" | Opens contact modal |
| `show_pricing` | "Show pricing" | Navigates to `/pricing` |
| `show_services` | "What do you build?" | Scrolls to `#solutions` |
| `show_process` | "How does it work?" | Scrolls to `#process` |
| `scroll_to_section` | "Show me [section]" | Scrolls to any valid section ID |
| `silent_handoff` | No question 10-15s | Ends call, triggers webhook |

### Timeout Guards

| Timer | Duration | Condition | Reason |
|-------|----------|-----------|--------|
| Connection timeout | 15s | Connecting > 15s | `connection_timeout` |
| User inactivity | 20s | Listening + user silent | `user_inactivity` |
| Max call duration | 5min | Connected from start | `max_duration_reached` |

### Webhook Handler

`src/app/api/webhook/elevenlabs/route.ts`:
- **HMAC verification** via Web Crypto API (manual, NOT SDK `constructEvent`)
- Returns **200 OK immediately**; heavy work dispatched via Next.js `after()`
- **Dedup**: 5-minute window by `conversation_id:event_timestamp`
- **Events handled:** `post_call_transcription` (writes to Lark + Telegram), `conversation_initiated`, `conversation_turn`, `conversation_ended`
- **Now sends real-time Telegram call summary**

### Config

| Setting | Value |
|---------|-------|
| Agent ID | `agent_5901ksshk9j6e1ft19n7ye6hm16k` |
| Voice | JBFqnCBsd6RMkjVDRZzb (George) |
| Model | `eleven_multilingual_v2` |
| LLM | gemini-2.0-flash |
| First message | "Hello! I'm Adamant's AI receptionist. How can I help you today?" |

### ⚠️ Critical Dashboard Setting — `text_only` Override

**This is a PER-AGENT setting in the ElevenLabs dashboard, NOT code.** Each agent ID has its own independent configuration. Changing this for the Adamant agent does NOT affect other projects.

| Setting | Location | Required Value | Why |
|---------|----------|----------------|-----|
| `text_only` | Dashboard → Overrides → Conversation config override | `false` (or removed) | If `true`, the agent rejects WebRTC voice audio and only accepts text input. The orb will connect then immediately disconnect. |

**Where to check:**
1. ElevenLabs Dashboard → Conversational AI → Adamant Receptionist
2. Tab: **Overrides**
3. Section: **"Conversation config override"**
4. Field: `conversation.text_only` → must be `false` or absent

**Symptom of wrong setting:**
- User clicks orb → orb shows "listening" → immediately disconnects
- Browser console shows WebRTC connection closed by server
- No error in application code — the agent config itself blocks voice

**Other projects using the same codebase:** Each project uses a different `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`. Agent overrides are per-ID and completely isolated.

---

## Pricing

### Dual Currency

Pricing page displays **SGD $** and **THB ฿** with a toggle:
- Toggle state: `useState<"SGD" | "THB">("SGD")`
- Prices pulled from Lark Base with per-tier `sgd`/`thb` fields
- Fallback data in `src/lib/pricing.ts`
- Payment terms: "Invoiced in SGD or THB as agreed."

### Unlock Gate

- New visitors see a form (name, email, company, phone, message)
- After submit -> pricing reveals
- Unlock state stored in `localStorage` key: `adamant:pricing:unlock`
- Reset via "Lock pricing" link

---

## Security Headers

Applied to all routes via `next.config.ts`:

| Header | Value |
|--------|-------|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(self), geolocation=()` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| **CSP** | See `next.config.ts` |

---

## Wire Logic Rules

- **Nav links:** Home, Solutions, Process, Reviews, Pricing, Founder, Contact
- **Footer nav:** Home, all solutions, Process, Pricing, Founder, Contact
- **Internal navigation:** Always use Next.js `<Link>` — bare `<a>` or `window.location` kills voice session
- **Email:** `mailto:sam@adamant.asia`
- **WhatsApp:** `https://wa.me/6589211191` (static link to our number)
- **All CTAs scroll to** `#contact`, `#process`, or navigate to `/pricing`
- `aria-hidden="true"` on decorative elements only

---

## Performance Rules

- **No dynamic imports** for below-fold sections
- **No sequential JS animation timers** — CSS animations or `BlurFade` entrance only
- **Respect `prefers-reduced-motion`** — all animated components check `useReducedMotion`
- **WaveCanvas pauses when off-screen** — IntersectionObserver stops rAF loop
- DPR capped at 1.5x for WebGL canvas
- `powerPreference: "low-power"` on WebGL context

---

## Build & Deploy

```bash
pnpm install
pnpm run build    # Production build
```

**Deploy:** `vercel --prod`

Must produce clean build with zero errors.

---

## Historical Docs (Archived — Do Not Follow)

These files exist for reference but are out of date:

| File | Status |
|------|--------|
| `AUDIT_REPORT.md` | Pre-launch audit, mostly resolved |
| `BASE_AUDIT_REPORT.md` | Lark Base schema audit (old) |
| `BASE_FULL_AUDIT_REPORT.md` | Extended Base audit (old) |
| `SECTION_ARCHITECTURE.md` | Section flow changed since May 2026 |
| `KEYWORD_INTENT_PLAN.md` | SEO keyword strategy (old) |
| `CLAUDE.md` | Obsolete Claude Code config |
