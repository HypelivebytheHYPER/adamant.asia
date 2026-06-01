import { NextRequest, NextResponse } from "next/server";
import {
  getApiKey,
  getVoiceId,
  getModelId,
  VOICE_SETTINGS,
  API_BASE_URL,
} from "@/lib/elevenlabs-config";

/**
 * POST /api/tts
 * Converts text to speech using ElevenLabs API.
 *
 * Body: { text: string }
 * Returns: audio/mpeg stream
 *
 * Requires ELEVENLABS_API_KEY environment variable.
 */

const MAX_TEXT_LENGTH = 5000;
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  const apiKey = getApiKey();

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "ELEVENLABS_API_KEY not configured" },
      { status: 500 },
    );
  }

  let body: { text?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const text = body.text?.trim();
  if (!text) {
    return NextResponse.json(
      { ok: false, error: "Missing 'text' field" },
      { status: 400 },
    );
  }

  const clientIP =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(clientIP)) {
    return NextResponse.json(
      { ok: false, error: "Rate limit exceeded" },
      { status: 429 },
    );
  }

  if (text.length > MAX_TEXT_LENGTH) {
    return NextResponse.json(
      { ok: false, error: `Text too long (max ${MAX_TEXT_LENGTH} chars)` },
      { status: 413 },
    );
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/text-to-speech/${getVoiceId()}/stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: getModelId(),
          output_format: "mp3_44100_128",
          voice_settings: VOICE_SETTINGS,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error("[tts] ElevenLabs error:", errorText);
      return NextResponse.json(
        { ok: false, error: "TTS service temporarily unavailable" },
        { status: 502 },
      );
    }

    const audioStream = response.body;
    if (!audioStream) {
      return NextResponse.json(
        { ok: false, error: "No audio stream returned" },
        { status: 502 },
      );
    }

    return new NextResponse(audioStream, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "private, max-age=300",
      },
    });
  } catch (err) {
    console.error("[tts] Request failed:", err);
    return NextResponse.json(
      { ok: false, error: "TTS request failed" },
      { status: 500 },
    );
  }
}
