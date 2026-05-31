import { NextRequest, NextResponse } from "next/server";
import { BitableClient, authFromEnv } from "@/lib/lark-api";
import { sendTelegramMessage, formatLeadNotification } from "@/lib/telegram";

const BASE_TOKEN = process.env.LARK_BASE_APP_TOKEN || process.env.LARK_BASE_TOKEN;
const TABLE_ID = process.env.LARK_TABLE_ID_PRICING_LEADS || "tbl3HSjoxqVzUN4m";

// Simple in-memory rate limiter (per IP, 5 requests per minute)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

/** Validate and sanitize email */
function isValidEmail(email: unknown): email is string {
  if (typeof email !== "string") return false;
  // RFC 5322 simplified regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(req);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Content-Type check
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "Content-Type must be application/json" },
        { status: 415 }
      );
    }

    const body = await req.json();
    const { name, email, company, phone, message, source = "Pricing Page" } = body;

    // Input validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { ok: false, error: "Name is required (min 2 characters)" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "A valid email is required" },
        { status: 400 }
      );
    }

    if (!BASE_TOKEN) {
      return NextResponse.json(
        { ok: false, error: "LARK_BASE_APP_TOKEN not configured" },
        { status: 500 }
      );
    }

    // Sanitize inputs
    const safeName = String(name).trim().slice(0, 100);
    const safeEmail = String(email).trim().toLowerCase().slice(0, 200);
    const safeCompany = String(company || "").trim().slice(0, 200);
    const safePhone = String(phone || "").trim().slice(0, 50);
    const safeMessage = String(message || "").trim().slice(0, 2000);
    const safeSource = String(source || "Pricing Page").slice(0, 100);

    const auth = await authFromEnv();
    const client = new BitableClient(auth);

    // Try writing with Phone field; if Lark table lacks it, fall back to base fields
    const fullFields = {
      Name: safeName,
      Email: safeEmail,
      Company: safeCompany,
      Phone: safePhone,
      Message: safeMessage,
      Source: safeSource,
    };

    const baseFields = {
      Name: safeName,
      Email: safeEmail,
      Company: safeCompany,
      Message: safeMessage,
      Source: safeSource,
    };

    try {
      await client.batchCreateRecords(BASE_TOKEN, TABLE_ID, [{ fields: fullFields }]);
    } catch (err: any) {
      // 1254045 = FieldNameNotFound — table doesn't have Phone column
      if (err?.code === 1254045 || err?.message?.includes("FieldNameNotFound")) {
        await client.batchCreateRecords(BASE_TOKEN, TABLE_ID, [{ fields: baseFields }]);
      } else {
        throw err;
      }
    }

    // Fire-and-forget Telegram notification (don't block response)
    sendTelegramMessage(
      formatLeadNotification({
        name: safeName,
        email: safeEmail,
        company: safeCompany,
        phone: safePhone,
        message: safeMessage,
        source: safeSource,
      })
    ).then((ok) => {
      console.log("[pricing-lead] Telegram:", ok ? "sent" : "failed");
    }).catch((err) => {
      console.error("[pricing-lead] Telegram error:", err instanceof Error ? err.message : err);
    });

    return NextResponse.json({ ok: true, telegram: { configured: !!process.env.TELEGRAM_BOT_TOKEN && !!process.env.TELEGRAM_CHAT_ID } });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[pricing-lead] error:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
