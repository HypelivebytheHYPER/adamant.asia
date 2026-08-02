import { NextResponse } from "next/server";

/**
 * GET /api/health
 * Health check endpoint + diagnostic for Telegram & webhook config.
 */
export async function GET() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const webhookSecret = process.env.WEBHOOK_SECRET_ELEVENLABS_ADAMANT;

  // Verify Telegram bot token without exposing it
  let telegramBotOk = false;
  let telegramBotName: string | null = null;
  let telegramError: string | null = null;

  if (botToken) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${botToken}/getMe`, {
        cache: "no-store",
      });
      const data = (await res.json()) as { ok: boolean; result?: { username?: string }; description?: string };
      telegramBotOk = data.ok;
      telegramBotName = data.result?.username ?? null;
      if (!data.ok) telegramError = data.description ?? "getMe failed";
    } catch (e) {
      telegramError = e instanceof Error ? e.message : String(e);
    }
  }

  return NextResponse.json(
    {
      ok: true,
      status: "healthy",
      timestamp: new Date().toISOString(),
      diagnostics: {
        telegram: {
          botTokenSet: !!botToken,
          chatIdSet: !!chatId,
          botOk: telegramBotOk,
          botName: telegramBotName,
          error: telegramError,
        },
        webhook: {
          secretSet: !!webhookSecret,
          secretLength: webhookSecret?.length ?? 0,
        },
      },
    },
    { status: 200 },
  );
}
