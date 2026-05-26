import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/deploy
 * Triggers a Vercel redeploy via Deploy Hook URL.
 *
 * GET /api/deploy
 * Health check — returns config status without triggering deploy.
 *
 * Set VERCEL_DEPLOY_HOOK_URL and DEPLOY_SECRET in Vercel env variables.
 * Get deploy hook from: Vercel Dashboard → adamant.asia → Settings → Git → Deploy Hooks
 *
 * Usage:
 *   curl -X GET  https://adamantasia.vercel.app/api/deploy
 *   curl -X POST https://adamantasia.vercel.app/api/deploy \
 *     -H "Authorization: Bearer YOUR_SECRET" \
 *     -H "Content-Type: application/json"
 */

/** GET — health check */
export async function GET() {
  const configured = !!(
    process.env.VERCEL_DEPLOY_HOOK_URL && process.env.DEPLOY_SECRET
  );

  return NextResponse.json({
    ok: true,
    status: "healthy",
    configured,
    timestamp: new Date().toISOString(),
    note: configured
      ? "POST with Authorization header to trigger deploy"
      : "Missing VERCEL_DEPLOY_HOOK_URL or DEPLOY_SECRET env vars",
  });
}

/** POST — trigger deploy */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const expected = `Bearer ${process.env.DEPLOY_SECRET}`;

  if (!process.env.DEPLOY_SECRET || authHeader !== expected) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized", status: 401 },
      { status: 401 }
    );
  }

  const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!hookUrl) {
    return NextResponse.json(
      { ok: false, error: "VERCEL_DEPLOY_HOOK_URL not configured", status: 500 },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(hookUrl, { method: "POST" });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { ok: false, error: "Deploy hook failed", detail: text, status: 502 },
        { status: 502 }
      );
    }

    const data = await res.json().catch(() => ({}));

    return NextResponse.json({
      ok: true,
      status: 200,
      message: "Deploy triggered. Updates visible in ~30-60s.",
      job: data.job || null,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Deploy trigger failed", detail: String(err), status: 500 },
      { status: 500 }
    );
  }
}
