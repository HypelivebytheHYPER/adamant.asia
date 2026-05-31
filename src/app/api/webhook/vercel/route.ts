import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/webhook/vercel
 * Receives Vercel Deploy Status webhooks.
 *
 * Configure in Vercel Dashboard → adamant.asia → Settings → Git → Deploy Hooks
 * Or via Vercel API: https://vercel.com/docs/rest-api/endpoints/webhooks
 *
 * Requires:
 *   WEBHOOK_SECRET_VERCEL — used to verify the x-vercel-signature header
 */

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET_VERCEL;

async function verifySignature(payload: string, signature: string | null): Promise<boolean> {
  if (!WEBHOOK_SECRET || !signature) return false;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(WEBHOOK_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
  const sigBytes = Uint8Array.from(
    signature.match(/.{2}/g)?.map((b) => parseInt(b, 16)) || []
  );
  const payloadBytes = encoder.encode(payload);
  return crypto.subtle.verify("HMAC", key, sigBytes, payloadBytes);
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-vercel-signature");
  const bodyText = await request.text();

  // Verify signature
  if (WEBHOOK_SECRET) {
    const valid = await verifySignature(bodyText, signature);
    if (!valid) {
      return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
    }
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(bodyText);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Log and act on deploy status
  const type = payload.type as string | undefined;
  const state = (payload.payload as Record<string, unknown> | undefined)?.state as string | undefined;
  const project = (payload.payload as Record<string, unknown> | undefined)?.name as string | undefined;
  const url = (payload.payload as Record<string, unknown> | undefined)?.inspectorUrl as string | undefined;

  console.log("[webhook/vercel]", { type, state, project, url });

  // TODO: forward to Slack, Lark, email, etc.
  // Example: if state === "READY", notify team on Slack

  return NextResponse.json({ ok: true, received: true });
}
