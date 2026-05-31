/**
 * telegram.ts — Send notifications via Telegram Bot API
 *
 * Environment:
 *   TELEGRAM_BOT_TOKEN  → Bot token from @BotFather
 *   TELEGRAM_CHAT_ID    → Target chat ID (your personal chat, or group chat)
 */

const API_BASE = "https://api.telegram.org/bot";

export interface TelegramMessage {
  text: string;
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
}

/** Send a message via Telegram Bot API. Returns true on success, false on failure. */
export async function sendTelegramMessage(
  message: TelegramMessage,
  botToken = process.env.TELEGRAM_BOT_TOKEN,
  chatId = process.env.TELEGRAM_CHAT_ID
): Promise<boolean> {
  if (!botToken || !chatId) {
    console.warn("[telegram] skipping: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set");
    return false;
  }

  const url = `${API_BASE}${botToken}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message.text,
        parse_mode: message.parse_mode || "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[telegram] HTTP error:", res.status, body.slice(0, 200));
      return false;
    }

    const data = (await res.json()) as { ok: boolean; description?: string };
    if (!data.ok) {
      console.error("[telegram] API error:", data.description);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[telegram] fetch error:", err instanceof Error ? err.message : err);
    return false;
  }
}

/** Format a lead notification for Telegram */
export function formatLeadNotification(payload: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  source?: string;
}): TelegramMessage {
  const { name, email, company, phone, message, source } = payload;
  const isPricing = source?.toLowerCase().includes("pricing");
  const icon = isPricing ? "💰" : "📩";
  const lines = [
    `${icon} <b>New Lead — ${escapeHtml(source || "Unknown")}</b>`,
    "",
    `<b>Name:</b> ${escapeHtml(name)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
  ];

  if (phone) {
    lines.push(`<b>📱 Phone/WhatsApp:</b> ${escapeHtml(phone)}`);
    // Clean digits for wa.me link
    const cleanDigits = phone.replace(/\D/g, "");
    if (cleanDigits) {
      lines.push(`<a href="https://wa.me/${cleanDigits}">💬 Chat on WhatsApp</a>`);
    }
  }
  if (company) lines.push(`<b>Company:</b> ${escapeHtml(company)}`);
  if (message) lines.push(`<b>Message:</b> ${escapeHtml(message.slice(0, 400))}`);

  lines.push("", `<a href="mailto:${encodeURIComponent(email)}">📧 Reply by email</a>`);

  return { text: lines.join("\n"), parse_mode: "HTML" };
}

/** Format a voice agent call summary notification for Telegram */
export function formatVoiceCallNotification(payload: {
  userName?: string;
  conversationId: string;
  duration: number;
  cost: number;
  callSuccessful: string;
  summary: string;
  terminationReason?: string;
}): TelegramMessage {
  const { userName, conversationId, duration, cost, callSuccessful, summary, terminationReason } = payload;
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const durationStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

  const lines = [
    `🎙️ <b>Voice Call Ended</b>`,
    "",
    `<b>User:</b> ${escapeHtml(userName || "Anonymous")}`,
    `<b>ID:</b> <code>${escapeHtml(conversationId)}</code>`,
    `<b>Duration:</b> ${durationStr}`,
    `<b>Outcome:</b> ${escapeHtml(callSuccessful || "unknown")}`,
  ];

  if (terminationReason && terminationReason !== "") {
    lines.push(`<b>Ended by:</b> ${escapeHtml(terminationReason)}`);
  }

  lines.push("", `<b>Summary:</b> ${escapeHtml(summary.slice(0, 500))}`);

  if (summary.length > 500) {
    lines.push("...(truncated — full transcript in Lark Base)");
  }

  return { text: lines.join("\n"), parse_mode: "HTML" };
}

/** Minimal HTML escape for Telegram HTML parse_mode */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
