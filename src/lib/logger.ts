/**
 * In-memory ring-buffer logger for runtime diagnostics.
 * Vercel serverless functions are ephemeral, so this only captures
 * the current invocation + any warm-instance history.
 *
 * Critical errors are also forwarded to Telegram for immediate alert.
 *
 * SSE: emit events via global EventTarget so /api/admin/logs-sse can push
 * real-time updates without polling.
 */

import { sendTelegramMessage } from "./telegram";

interface LogEntry {
  t: string; // ISO timestamp
  lvl: "info" | "warn" | "error";
  src: string; // source module
  msg: string;
  meta?: Record<string, unknown>;
}

const MAX_LOGS = 200;
const buffer: LogEntry[] = [];

/* ------------------------------------------------------------------ */
// Shared EventTarget for SSE subscribers (same-instance only)
/* ------------------------------------------------------------------ */

class LogEventTarget extends EventTarget {
  emit(entry: LogEntry) {
    this.dispatchEvent(new CustomEvent("log", { detail: entry }));
  }
}

export const logEmitter = new LogEventTarget();

/* ------------------------------------------------------------------ */

function push(lvl: LogEntry["lvl"], src: string, msg: string, meta?: Record<string, unknown>) {
  const entry: LogEntry = {
    t: new Date().toISOString(),
    lvl,
    src,
    msg,
    ...(meta ? { meta } : {}),
  };
  buffer.push(entry);
  if (buffer.length > MAX_LOGS) buffer.shift();

  // Emit for SSE subscribers
  try {
    logEmitter.emit(entry);
  } catch {
    // Emitter may not exist in all environments
  }

  // Echo to console for Vercel logs
  const prefix = `[${entry.t.slice(11, 19)}][${src}]`;
  if (lvl === "error") console.error(prefix, msg, meta ?? "");
  else if (lvl === "warn") console.warn(prefix, msg, meta ?? "");
  else console.log(prefix, msg, meta ?? "");

  // Forward critical errors to Telegram (fire-and-forget, don't await)
  if (lvl === "error" && src !== "logger/telegram") {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (chatId && botToken) {
      const text = `🚨 <b>Adamant Error</b>\n\n<b>Source:</b> ${src}\n<b>Message:</b> ${msg.slice(0, 400)}\n<b>Time:</b> ${entry.t}\n${meta ? `<b>Meta:</b> <code>${JSON.stringify(meta).slice(0, 300)}</code>` : ""}`;
      sendTelegramMessage({ text, parse_mode: "HTML" }).catch(() => {
        // Prevent infinite loop — don't log Telegram failures
      });
    }
  }
}

export const logger = {
  info: (src: string, msg: string, meta?: Record<string, unknown>) => push("info", src, msg, meta),
  warn: (src: string, msg: string, meta?: Record<string, unknown>) => push("warn", src, msg, meta),
  error: (src: string, msg: string, meta?: Record<string, unknown>) => push("error", src, msg, meta),
  getLogs: (limit = 100): LogEntry[] => buffer.slice(-limit),
  clear: () => { buffer.length = 0; },
};
