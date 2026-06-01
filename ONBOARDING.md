# Adamant.asia — Developer Onboarding

> AI Agency landing site with voice agent, lead capture, and Lark Base integration.
> **Stack:** Next.js 16 + React 19 + Tailwind CSS v4 + Vercel

---

## Quick Start (< 5 min)

```bash
# 1. Clone & install
pnpm install          # packageManager: pnpm@9.15.4

# 2. Env setup (copy from .env.example)
cp .env.example .env.local
# Fill in required vars — see "Environment Variables" below

# 3. Dev server
pnpm dev              # http://localhost:3000

# 4. Verify
pnpm test             # Vitest — 1 test file (contact-form.test.tsx)

# 5. Build check (optional)
pnpm build            # Static + SSG + dynamic API routes
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│  adamant.asia  (Next.js 16 App Router)                       │
├─────────────────────────────────────────────────────────────┤
│  Pages (App Router)                                         │
│    /              → Homepage (hero + sections)               │
│    /pricing       → Pricing tiers + lead form                │
│    /solutions/*   → 4 solution detail pages (SSG)            │
│    /founder       → Founder page                             │
│    /dashboard     → Internal dashboard                       │
│    /demo          → Demo page                                │
├─────────────────────────────────────────────────────────────┤
│  API Routes                                                  │
│    POST /api/pricing-lead      → Lark Base + Telegram        │
│    POST /api/webhook/elevenlabs→ HMAC verify → Base + TG     │
│    POST /api/webhook/vercel    → Vercel deploy hooks         │
│    POST /api/webhook/lark      → Lark event callbacks        │
│    POST /api/deploy            → Trigger Vercel deploy       │
│    GET  /api/tts               → ElevenLabs TTS proxy        │
├─────────────────────────────────────────────────────────────┤
│  Integrations                                                │
│    ElevenLabs ConvAI  → Voice agent orb (real-time WS)       │
│    Lark/Feishu Base   → Lead storage + Call transcripts      │
│    Telegram Bot       → Lead + Call notifications            │
│    Vercel             → Hosting + Edge cache + SpeedInsights │
└─────────────────────────────────────────────────────────────┘
```

### Key Data Flows

**Lead Capture:**

```
User submits form (pricing or contact)
  → POST /api/pricing-lead
    → Validates + rate limits
    → Writes to Lark Base "Pricing Leads" table
    → Sends Telegram 📩 notification (fire-and-forget)
    → Returns { ok: true }
```

**Voice Call End:**

```
ElevenLabs sends webhook (post_call_transcription)
  → POST /api/webhook/elevenlabs
    → HMAC-SHA256 signature verification
    → Deduplicate by conversation_id:event_timestamp
    → Background via after():
      → Sends Telegram 🎙️ notification
      → Writes to Lark Base "Call Transcripts" table
```

---

## Project Structure

```
adamant.asia/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (home)/             # Homepage route group
│   │   ├── api/                # API routes (serverless)
│   │   ├── [page].tsx          # Static + dynamic pages
│   │   ├── layout.tsx          # Root layout (VoiceAgentProvider)
│   │   └── globals.css         # Tailwind CSS v4 imports
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui primitives
│   │   ├── animations/         # Reusable animation components
│   │   ├── device-screens/     # Device mockup screens
│   │   ├── elevenlabs-orb.tsx  # Voice agent orb (homepage hero)
│   │   ├── floating-voice-widget.tsx  # Persistent call widget
│   │   ├── voice-agent-*.tsx   # Voice agent context/controller
│   │   ├── contact-form.tsx    # Lead capture form
│   │   ├── pricing-client.tsx  # Pricing page with form
│   │   └── ...
│   ├── sections/               # Page sections (homepage composition)
│   ├── lib/                    # Utilities + integrations
│   │   ├── elevenlabs-config.ts   # ConvAI config (AGENT_ID)
│   │   ├── lark-api.ts            # Lark Base API client
│   │   ├── telegram.ts            # Telegram Bot API
│   │   ├── site.ts                # SITE_URL constant
│   │   └── tokens.ts              # Design tokens
│   ├── data/                   # Static content data
│   ├── app/                    # registry/ (Magic UI components)
│   └── app/                    # sections/ types
├── public/                     # Static assets
│   └── images/showcase/        # Showcase screenshots
├── archive/                    # Archived audit/design docs
├── .env.example                # Required env vars template
├── next.config.ts              # Next.js config + security headers
├── vercel.json                 # Vercel deploy config
└── vitest.config.ts            # Test config
```

---

## Environment Variables

Copy `.env.example` → `.env.local` and fill these **required** vars:

| Variable                          | Purpose                       | Required For     |
| --------------------------------- | ----------------------------- | ---------------- |
| `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` | ConvAI agent ID               | Voice orb        |
| `ELEVENLABS_API_KEY_ADAMANT`      | TTS API calls (Adamant agent) | /api/tts         |
| `LARK_BASE_APP_TOKEN`             | Base app identifier           | Lead storage     |
| `LARK_TABLE_ID_PRICING_LEADS`     | Pricing leads table           | Lead storage     |
| `LARK_TABLE_ID_CALLS`             | Call transcripts table        | Voice logging    |
| `LARK_APP_ID` + `LARK_APP_SECRET` | Lark app auth                 | API access       |
| `TELEGRAM_BOT_TOKEN`              | Bot API token                 | Notifications    |
| `TELEGRAM_CHAT_ID`                | Target chat/group ID          | Notifications    |
| `WEBHOOK_SECRET_ELEVENLABS`       | Webhook HMAC key              | Signature verify |
| `DEPLOY_SECRET`                   | Deploy auth                   | /api/deploy      |

**Optional:**

- `ELEVENLABS_VOICE_ID` / `ELEVENLABS_MODEL_ID` — TTS voice selection
- `CF_API_TOKEN` / `CF_ACCOUNT_ID` — Cloudflare Workers AI
- `VERCEL_DEPLOY_HOOK_URL` — External deploy trigger

---

## Development Commands

```bash
# Dev (Turbopack by default)
pnpm dev              # localhost:3000

# Build (prod check)
pnpm build            # Static export + API routes

# Tests
pnpm test             # Vitest
# or
npx vitest            # Watch mode

# Lint
pnpm lint             # ESLint Next.js config

# Bundle analysis
pnpm analyze          # Opens bundle analyzer

# Lark content sync (if configured)
pnpm run sync         # Pulls Base content → content.ts
```

---

## Key Patterns & Conventions

### 1. Security Headers (next.config.ts)

All routes serve strict security headers:

- CSP with `connect-src` allowing `wss://api.elevenlabs.io` (WebSocket)
- `Permissions-Policy: microphone=(self)` for voice access
- `X-Frame-Options: DENY`, HSTS, referrer policy

### 2. Webhook Signature Verification

ElevenLabs webhooks use HMAC-SHA256:

```
Signature format: "t=<unix_ts>,v0=<hex_hmac>"
Signed payload:    "<unix_ts>.<raw_json_body>"
Tolerance:         5 minutes
```

Implementation: `src/app/api/webhook/elevenlabs/route.ts`

### 3. Client-Server Boundary

- `NEXT_PUBLIC_*` vars → inlined at build, visible in browser
- Server-only vars (no prefix) → stripped from client bundles
- `getWebhookSecret()`, `getApiKey()` are server-only helpers

### 4. Voice Agent State

- `VoiceAgentProvider` wraps layout (survives navigation)
- `useVoiceAgent()` context exposes: `startSession`, `endSession`, `status`, `isSpeaking`, `isListening`
- Timeout guards: 15s connect, 20s inactivity, 5min max call

### 5. Form → API Pattern

```tsx
// Client
const res = await fetch("/api/pricing-lead", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, company, phone, message, source }),
});

// Server
export async function POST(req: NextRequest) {
  // Rate limit → validate → write Base → send Telegram → return 200
}
```

---

## Testing

```bash
# Run all tests
pnpm test

# Current test coverage:
src/components/contact-form.test.tsx   # Form validation + submission mocking
```

To add tests, place `*.test.tsx` next to the component. Vitest + jsdom + React Testing Library are configured.

---

## Common Tasks

### Add a new API route

1. Create `src/app/api/new-route/route.ts`
2. Export `GET`/`POST`/`PUT`/`DELETE` handlers
3. Return `NextResponse.json({ ok: true })`

### Add a new page

1. Create `src/app/new-page/page.tsx`
2. Export default component (can be Server Component)
3. Add to `sitemap.ts` if public

### Update Lark Base schema

1. Modify fields in Lark Base UI
2. Update `TABLE_ID` in `.env.local` if new table
3. Update field names in `pricing-lead/route.ts` or `elevenlabs/route.ts`

### Add a new section to homepage

1. Create `src/sections/new-section.tsx`
2. Import in `src/app/(home)/page.tsx`
3. Add scroll target ID for nav links

---

## Troubleshooting

| Symptom                                      | Likely Cause                                       | Fix                                                                                                         |
| -------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| "Not supported" when clicking orb            | mic permission denied / CSP blocks wss             | Check `Permissions-Policy` includes `microphone=(self)`; verify `connect-src` has `wss://api.elevenlabs.io` |
| Webhook returns 401                          | Signature mismatch / stale timestamp               | Verify `WEBHOOK_SECRET_ELEVENLABS` matches ElevenLabs dashboard; check timestamp tolerance                  |
| No Telegram notification                     | Missing env vars / wrong chat ID                   | Check `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in Vercel env; bot must be in target group                |
| Lark Base write fails                        | Wrong app token / table ID / missing scope         | Verify `LARK_BASE_APP_TOKEN`, `LARK_TABLE_ID_*`; check Lark app permissions                                 |
| Form shows "Message sent" but no Base record | `LARK_BASE_APP_TOKEN` not set or Base auth expired | Check env vars; verify token hasn't expired                                                                 |
| Vercel build fails                           | Type error / import issue                          | Run `npx tsc --noEmit` locally before pushing                                                               |

---

## Deployment

```bash
# Automatic: push to main branch triggers Vercel deploy

# Manual via deploy hook:
curl -X POST https://adamant.asia/api/deploy \
  -H "Authorization: Bearer $DEPLOY_SECRET" \
  -H "Content-Type: application/json"
```

**Production URL:** https://adamant.asia  
**Vercel Dashboard:** hypelives-projects/adamant.asia

---

## Ownership & Contacts

| Area          | File(s)                                     | Notes                              |
| ------------- | ------------------------------------------- | ---------------------------------- |
| Voice Agent   | `elevenlabs-orb.tsx`, `voice-agent-*.tsx`   | ElevenLabs ConvAI SDK              |
| Lead Pipeline | `pricing-lead/route.ts`, `contact-form.tsx` | Lark Base + Telegram               |
| Webhooks      | `webhook/elevenlabs/route.ts`               | HMAC verify, background processing |
| Content       | `data/content.ts`, Lark Base sync           | Marketing copy + showcase data     |
| Styling       | `globals.css`, `tokens.ts`                  | Tailwind v4 + custom design tokens |

---

## External Resources

- **ElevenLabs Dashboard:** https://elevenlabs.io/app/conversational-ai
- **Lark Open Platform:** https://open.larksuite.com
- **Telegram BotFather:** https://t.me/botfather
- **Vercel Dashboard:** https://vercel.com/hypelives-projects/adamant.asia
- **Project AGENTS.md:** See root `AGENTS.md` for AI agent rules

---

_Last updated: 2026-05-31_  
_Maintainers: See GitHub repo contributors_
