/**
 * telegram.ts — Send notifications via Telegram Bot API
 *
 * Environment:
 *   TELEGRAM_BOT_TOKEN  → Bot token from @BotFather
 *   TELEGRAM_CHAT_ID    → Target chat ID (your personal chat, or group chat)
 */

const API_BASE = "https://api.telegram.org/bot";

/** Direct chat link for WhatsApp replies in notifications */
const WHATSAPP_CHAT_URL = "https://wa.me/message/BSROJ4X2IRGOH1";

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
    lines.push(`<a href="${WHATSAPP_CHAT_URL}">💬 Chat on WhatsApp</a>`);
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
  const { userName, conversationId, duration, callSuccessful, summary, terminationReason } = payload;
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

/** Format a daily GSC performance summary for Telegram */
export function formatGscDailyReport(payload: {
  period: string;
  worldwide: { clicks: number; impressions: number; ctr: number; position: number };
  singapore: { clicks: number; impressions: number; ctr: number; position: number };
  prevWorldwide: { clicks: number; impressions: number; ctr: number; position: number };
  topQueries: Array<{ query: string; clicks: number; impressions: number; position: number }>;
  topPages: Array<{ path: string; clicks: number; impressions: number }>;
}): TelegramMessage {
  const { period, worldwide, singapore, prevWorldwide, topQueries, topPages } = payload;

  const fmt = (n: number) => new Intl.NumberFormat("en-SG").format(Math.round(n));
  const pct = (n: number) => `${(n * 100).toFixed(1)}%`;
  const arrow = (n: number) => (n > 0 ? "↗️" : n < 0 ? "↘️" : "➡️");
  const sign = (n: number) => (n > 0 ? "+" : "");
  const delta = (curr: number, prev: number) => {
    const d = curr - prev;
    return `${arrow(d)} ${sign(d)}${fmt(d)}`;
  };
  const deltaPct = (curr: number, prev: number) => {
    const d = curr - prev;
    return `${arrow(d)} ${sign(d)}${pct(d)}`;
  };
  const deltaPos = (curr: number, prev: number) => {
    const d = prev - curr; // lower position is better
    return `${arrow(d)} ${sign(d)}${d.toFixed(1)}`;
  };

  const lines = [
    `📊 <b>Adamant Daily SEO Report</b>`,
    `<i>${escapeHtml(period)}</i>`,
    "",
    `<b>🌐 Worldwide</b>`,
    `Clicks: ${fmt(worldwide.clicks)} ${delta(worldwide.clicks, prevWorldwide.clicks)}`,
    `Impressions: ${fmt(worldwide.impressions)} ${delta(worldwide.impressions, prevWorldwide.impressions)}`,
    `CTR: ${pct(worldwide.ctr)} ${deltaPct(worldwide.ctr, prevWorldwide.ctr)}`,
    `Avg position: ${worldwide.position.toFixed(1)} ${deltaPos(worldwide.position, prevWorldwide.position)}`,
    "",
    `<b>🇸🇬 Singapore</b>`,
    `Clicks: ${fmt(singapore.clicks)}`,
    `Impressions: ${fmt(singapore.impressions)}`,
    `CTR: ${pct(singapore.ctr)}`,
    `Avg position: ${singapore.position.toFixed(1)}`,
    "",
    `<b>🔍 Top queries</b>`,
    ...topQueries.slice(0, 5).map((r, i) => {
      const q = r.query.length > 30 ? r.query.slice(0, 27) + "…" : r.query;
      return `${i + 1}. ${escapeHtml(q)} — ${fmt(r.clicks)} clicks, ${fmt(r.impressions)} impr`;
    }),
    "",
    `<b>📄 Top pages</b>`,
    ...topPages.slice(0, 5).map((r, i) => {
      return `${i + 1}. ${escapeHtml(r.path || "/")} — ${fmt(r.clicks)} clicks`;
    }),
  ];

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
