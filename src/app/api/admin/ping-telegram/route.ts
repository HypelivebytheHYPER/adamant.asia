import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage, formatVoiceCallNotification } from "@/lib/telegram";
import { getWebhookSecret } from "@/lib/elevenlabs-config";

/**
 * POST /api/admin/ping-telegram
 * Send a test Telegram notification to verify bot + chat ID.
 * Requires X-Admin-Secret header matching WEBHOOK_SECRET_ELEVENLABS_ADAMANT.
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-admin-secret");
  const expected = getWebhookSecret();

  if (!expected || secret !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json(
      { ok: false, error: "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured" },
      { status: 503 },
    );
  }

  const testMsg = formatVoiceCallNotification({
    userName: "Test User",
    conversationId: "test-conv-" + Date.now(),
    duration: 42,
    cost: 0.02,
    callSuccessful: "true",
    summary: "This is a test ping from Adamant webhook diagnostics.",
    terminationReason: "user_ended",
  });

  try {
    const ok = await sendTelegramMessage(testMsg);
    return NextResponse.json({
      ok,
      message: ok ? "Test message sent" : "Failed to send",
      chatIdSet: true,
      chatIdPrefix: chatId.slice(0, 4) + "...",
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}
