import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/telemetry
 * Receives console logs from real browsers for debugging.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || !body.logs) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { logs, userAgent, url, timestamp } = body;

  for (const line of logs) {
    console.log(`[CLIENT:${line.type}] ${line.msg}`);
  }
  console.log(`[CLIENT:meta] ua=${userAgent} url=${url} ts=${timestamp}`);

  return NextResponse.json({ ok: true });
}
