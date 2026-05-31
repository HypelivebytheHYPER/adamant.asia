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

export async function POST(request: NextRequest) {
  const apiKey = getApiKey();

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "ELEVENLABS_API_KEY not configured" },
      { status: 500 }
    );
  }

  let body: { text?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const text = body.text?.trim();
  if (!text) {
    return NextResponse.json(
      { ok: false, error: "Missing 'text' field" },
      { status: 400 }
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
      }
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      return NextResponse.json(
        { ok: false, error: "ElevenLabs API error", detail: errorText },
        { status: 502 }
      );
    }

    const audioStream = response.body;
    if (!audioStream) {
      return NextResponse.json(
        { ok: false, error: "No audio stream returned" },
        { status: 502 }
      );
    }

    return new NextResponse(audioStream, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "private, max-age=300",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "TTS request failed", detail: String(err) },
      { status: 500 }
    );
  }
}
