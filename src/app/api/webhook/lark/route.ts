import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/webhook/lark
 * Receives Lark / Feishu event webhooks.
 *
 * Register URL in Lark Developer Console:
 *   https://open.larksuite.com/app → Event Subscriptions → Request URL
 *
 * Requires:
 *   LARK_VERIFICATION_TOKEN — for challenge verification
 *   LARK_ENCRYPT_KEY      — optional, for encrypted events
 */

const VERIFICATION_TOKEN = process.env.LARK_VERIFICATION_TOKEN;
const ENCRYPT_KEY = process.env.LARK_ENCRYPT_KEY;

function decryptEncrypt(encrypt: string): string {
  // Lark encrypts payloads with AES-CBC when encrypt_key is set.
  // For production, implement full AES decryption per Lark docs:
  // https://open.larksuite.com/document/server-side-api/event-subscription/encrypt-key
  // This stub returns the raw encrypt string so you know it needs wiring.
  console.warn("[webhook/lark] ENCRYPT_KEY is set but decryptEncrypt() is a stub");
  return encrypt;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  // 1. Challenge verification (URL validation)
  if (body.challenge && body.token === VERIFICATION_TOKEN) {
    return NextResponse.json({ challenge: body.challenge });
  }

  // 2. Decrypt if needed
  let event: Record<string, unknown> = body;
  if (ENCRYPT_KEY && body.encrypt) {
    const decrypted = decryptEncrypt(body.encrypt as string);
    try {
      event = JSON.parse(decrypted);
    } catch {
      return NextResponse.json({ ok: false, error: "Decrypt failed" }, { status: 400 });
    }
  }

  // 3. Token check
  if (VERIFICATION_TOKEN && event.token !== VERIFICATION_TOKEN) {
    return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 401 });
  }

  const eventType = event.header
    ? (event.header as Record<string, unknown>).event_type
    : event.type;

  console.log("[webhook/lark] event:", eventType);

  // TODO: handle events you care about
  // Examples:
  // - "im.message.receive_v1" → new message in chat
  // - "drive.file.created_v1" → new file in drive
  // - "bitable.record.created_v1" → new Base record

  return NextResponse.json({ ok: true });
}
