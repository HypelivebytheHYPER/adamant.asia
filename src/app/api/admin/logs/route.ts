import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { getWebhookSecret } from "@/lib/elevenlabs-config";

/**
 * GET /api/admin/logs
 * View recent in-memory logs. Requires X-Admin-Secret.
 */
export async function GET(request: NextRequest) {
  const secret = request.headers.get("x-admin-secret");
  const expected = getWebhookSecret();

  if (!expected || secret !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const limit = parseInt(request.nextUrl.searchParams.get("limit") ?? "100", 10);
  return NextResponse.json({ ok: true, logs: logger.getLogs(limit) });
}

/**
 * POST /api/admin/logs
 * Clear the in-memory log buffer. Requires X-Admin-Secret.
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-admin-secret");
  const expected = getWebhookSecret();

  if (!expected || secret !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { action?: string };
  if (body.action === "clear") {
    logger.clear();
    return NextResponse.json({ ok: true, cleared: true });
  }

  return NextResponse.json({ ok: false, error: "Unknown action. Use {action:'clear'}" }, { status: 400 });
}
