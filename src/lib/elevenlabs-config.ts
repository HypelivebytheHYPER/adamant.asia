/**
 * Single source of truth for ElevenLabs configuration.
 *
 * Safe to import from both client and server components.
 * Non-NEXT_PUBLIC env vars are stripped by Next.js at build time
 * for client bundles — they will be undefined on the client.
 */

/* ------------------------------------------------------------------ */
// Constants (framework-agnostic)
/* ------------------------------------------------------------------ */

export const EMBED_SCRIPT_URL =
  "https://unpkg.com/@elevenlabs/convai-embed@latest/dist/convai-embed.js";

export const API_BASE_URL = "https://api.elevenlabs.io/v1";

export const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";
export const DEFAULT_MODEL_ID = "eleven_multilingual_v2";

export const VOICE_SETTINGS = {
  stability: 0.45,
  similarity_boost: 0.75,
  speed: 1.0,
  use_speaker_boost: true,
} as const;

/* ------------------------------------------------------------------ */
// Client-safe config (build-time inlined by Next.js)
/* ------------------------------------------------------------------ */

/** ConvAI agent ID — exposed to the browser via NEXT_PUBLIC_ prefix. */
export const AGENT_ID =
  process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ||
  "agent_5901ksshk9j6e1ft19n7ye6hm16k";

/* ------------------------------------------------------------------ */
// Server-only helpers (runtime, undefined in client bundles)
/* ------------------------------------------------------------------ */

/** API key for TTS and other server-side ElevenLabs calls.
 *
 * Checks `ELEVENLABS_API_KEY_ADAMANT` first (project-specific),
 * then falls back to `ELEVENLABS_API_KEY` (legacy / shared).
 */
export function getApiKey(): string | undefined {
  return (
    process.env.ELEVENLABS_API_KEY_ADAMANT || process.env.ELEVENLABS_API_KEY
  );
}

/** Secret for verifying incoming ElevenLabs webhooks. */
export function getWebhookSecret(): string | undefined {
  return process.env.WEBHOOK_SECRET_ELEVENLABS;
}

/** Voice ID for TTS — falls back to a default if not configured. */
export function getVoiceId(): string {
  return process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;
}

/** Model ID for TTS — falls back to a default if not configured. */
export function getModelId(): string {
  return process.env.ELEVENLABS_MODEL_ID || DEFAULT_MODEL_ID;
}
