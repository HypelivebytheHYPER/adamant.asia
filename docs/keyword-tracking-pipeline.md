# GSC → Lark Keyword-Tracking Pipeline

> Daily Google Search Console keyword data → Lark Base, with a benchmark dashboard.
> Built 2026-06-09. Companion to `google-setup-checklist.md` (which covers GSC *auth*).

## What it does

Every day, the most recent finalized day of Search Console **query** data is pulled,
categorized against a curated watchlist, and written into Lark Base. A dashboard then
visualizes position vs. a target benchmark — with the polluted/ambiguous `adamant`
queries separated from the real brand + commercial targets.

```
Lark TimerTrigger (daily 09:00, Asia/Bangkok)        workflow wkfLhqyvH3ctA12k
  └─> HTTPClientAction  POST https://adamant.asia/api/gsc/sync   (header x-sync-secret)
        └─> route pulls GSC by query (day = today−3, for data-lag)
              → categorizes vs "Keywords" master (auto-adds unknowns, inactive)
              → UPSERTS dated rows into "Keyword Daily" fact table (idempotent)
                    └─> "SEO Benchmark" dashboard updates itself
```

**Why this shape:** a Lark workflow can't pull GSC itself (no OAuth in `HTTPClientAction`),
and the `googleapis-mcp.hypelive.app` MCP can't be used (needs a server key + wrong tenant).
So GSC auth lives in our code (`src/lib/gsc-api.ts`), and Lark is just the daily trigger.

## Components

| Piece | Where |
|---|---|
| Sync endpoint | `src/app/api/gsc/sync/route.ts` (POST/GET, `x-sync-secret` auth, idempotent upsert) |
| GSC client | `src/lib/gsc-api.ts` (OAuth2, quota header) |
| Lark Base client | `src/lib/lark-api.ts` (tenant token → Bitable batch create/update) |
| Lark Base | "adamant Project" — base `XY8IbUHh3aNI2AsWI0tl0YllgSd` |
| Keywords master | table `tblKBFvMLvFXw7Kw` — Category / Market / Relevance / **Target Position** / Active |
| Keyword Daily (fact) | table `tblXvBkpuzcbl1gL` — Date, Keyword (link), Clicks/Impr/CTR/Position, **Gap to Target** (formula) |
| Dashboard | "SEO Benchmark" `blkAXcMOMuFXmoNO` (4 blocks) |
| Scheduled workflow | `wkfLhqyvH3ctA12k` ("Daily GSC → Keyword Daily sync") |

## Environment variables

All read via env (no hardcoded values; `loadConfig()` fails fast if any are missing):

| Var | Purpose |
|---|---|
| `GSC_CLIENT_ID` / `GSC_CLIENT_SECRET` / `GSC_REFRESH_TOKEN` | OAuth2 token (pitsanu@hypelive.io, GSC `siteOwner`, `webmasters.readonly`) |
| `GSC_QUOTA_PROJECT` | GCP project for API quota — `adamant-asia-seo` |
| `GSC_SITE_URL` | GSC property — `https://adamant.asia/` (trailing slash) |
| `GSC_KW_TABLE_ID` / `GSC_DAILY_TABLE_ID` | Lark table ids (above) |
| `GSC_KW_BASE_TOKEN` | Base token (falls back to `LARK_BASE_APP_TOKEN`) |
| `GSC_SYNC_SECRET` | shared secret with the Lark workflow's `x-sync-secret` header |
| `LARK_APP_ID` / `LARK_APP_SECRET` | Lark app (`cli_a8a819818eb9d029`) — must be a Base collaborator w/ edit rights |

> Service accounts are **not** usable for GSC here (Google bug since ~2026-04-20 blocks adding
> SA emails to Search Console). See `google-setup-checklist.md` for the OAuth2 protocol + re-mint steps.

## Activation (one-time)

1. **Deploy** adamant.asia (clean tree) so `/api/gsc/sync` is live.
2. Ensure `GSC_SYNC_SECRET` on Vercel matches the workflow's `x-sync-secret`.
3. **Test:** `curl -H "x-sync-secret: <secret>" "https://adamant.asia/api/gsc/sync?day=2026-06-06"`
   → `{success, day, queries, created, updated, new_keywords}`.
4. **Enable** the schedule:
   `lark-cli base +workflow-enable --base-token XY8IbUHh3aNI2AsWI0tl0YllgSd --workflow-id wkfLhqyvH3ctA12k --as user`

## Helper scripts (`node --env-file=.env.local scripts/<name>`)

| Script | Purpose |
|---|---|
| `gsc-test.mjs` | Verify GSC auth + list sitemaps + SG top queries |
| `gsc-inspect.mjs` | URL Inspection (index status) per page |
| `gsc-cleanup-sitemaps.mjs` | Delete bogus page-as-sitemap entries (`--apply`, needs write scope) |
| `seo-audit.mjs` | Credential-free crawl audit (status/canonical/noindex/title) |
| `seo-check.mjs` | GSC search performance + PageSpeed/CWV combined |

## Notes / gotchas

- **Idempotent:** re-running the same day updates existing rows (dedupe key = `"day · keyword"` Snapshot), so retries/double-fires don't duplicate.
- **Date is dynamic** (`today − 3`, for GSC's ~2–3-day data lag); override with `?day=YYYY-MM-DD` for backfill.
- **Benchmark focus:** the `Category` field separates `Brand-Core`/`Brand-Modifier`/`Target-Commercial` from `Generic-Ambiguous` (the polluted bare `adamant`) and `Noise` (e.g. "adamant meaning in malayalam"), so the dashboard tracks real targets, not dictionary noise.
