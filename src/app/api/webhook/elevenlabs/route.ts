import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { BitableClient, authFromEnv } from "@/lib/lark-api";
import {
  sendTelegramMessage,
  formatVoiceCallNotification,
} from "@/lib/telegram";
import { getWebhookSecret } from "@/lib/elevenlabs-config";

/**
 * POST /api/webhook/elevenlabs
 * Receives ElevenLabs Conversational AI webhooks.
 *
 * Configure in ElevenLabs dashboard:
 *   https://elevenlabs.io/app/conversational-ai → Agent → Webhooks
 *
 * Events sent:
 *   - conversation_initiated
 *   - conversation_turn
 *   - conversation_ended
 *   - post_call_transcription
 *
 * Requires:
 *   WEBHOOK_SECRET_ELEVENLABS_ADAMANT — used to verify the X-ElevenLabs-Signature header
 * Optional:
 *   LARK_BASE_APP_TOKEN + LARK_TABLE_ID_CALLS — writes transcripts to Lark Base
 */

const WEBHOOK_SECRET = getWebhookSecret();
const BASE_APP_TOKEN = process.env.LARK_BASE_APP_TOKEN;
const TABLE_ID_CALLS = process.env.LARK_TABLE_ID_CALLS;

/* ------------------------------------------------------------------ */
// Deduplication: conversation_id + event_timestamp
/* ------------------------------------------------------------------ */

interface DedupEntry {
  ts: number;
}

const DEDUP_TTL_MS = 5 * 60_000; // 5 minutes
const dedup = new Map<string, DedupEntry>();

function isDuplicate(conversationId: string, eventTimestamp: number): boolean {
  const key = `${conversationId}:${eventTimestamp}`;
  const now = Date.now();
  const existing = dedup.get(key);
  if (existing && now - existing.ts < DEDUP_TTL_MS) {
    return true;
  }
  dedup.set(key, { ts: now });
  // Prune old entries
  for (const [k, v] of dedup) {
    if (now - v.ts > DEDUP_TTL_MS) dedup.delete(k);
  }
  return false;
}

/* ------------------------------------------------------------------ */
// Signature verification (manual HMAC — more reliable than SDK)
/* ------------------------------------------------------------------ */

async function verifySignature(
  payload: string,
  signature: string | null,
): Promise<Record<string, unknown> | null> {
  if (!WEBHOOK_SECRET || !signature) {
    console.warn("[webhook/elevenlabs] missing secret or signature");
    return null;
  }

  // ElevenLabs format: "t=<unix_ts>,v0=<hex_hmac>"
  const tMatch = signature.match(/t=(\d+)/);
  const v0Match = signature.match(/v0=([a-f0-9]+)/);

  if (!tMatch || !v0Match) {
    console.warn("[webhook/elevenlabs] signature format mismatch");
    return null;
  }

  const timestamp = tMatch[1];
  const expectedSig = v0Match[1];

  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(WEBHOOK_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );

    const signedPayload = encoder.encode(`${timestamp}.${payload}`);
    const sigBuffer = await crypto.subtle.sign("HMAC", key, signedPayload);
    const actualSig = Array.from(new Uint8Array(sigBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (actualSig !== expectedSig) {
      console.warn("[webhook/elevenlabs] signature mismatch");
      return null;
    }

    // Timestamp tolerance: 5 minutes
    const now = Date.now() / 1000;
    const ts = parseInt(timestamp, 10);
    if (Math.abs(now - ts) > 300) {
      console.warn("[webhook/elevenlabs] timestamp too old");
      return null;
    }

    return JSON.parse(payload) as Record<string, unknown>;
  } catch (err) {
    console.error("[webhook/elevenlabs] verify error:", err);
    return null;
  }
}

/* ------------------------------------------------------------------ */
// Payload types
/* ------------------------------------------------------------------ */

interface TranscriptTurn {
  role: "agent" | "user";
  message: string;
  time_in_call_secs: number;
}

interface PostCallData {
  agent_id: string;
  conversation_id: string;
  status: string;
  transcript: TranscriptTurn[];
  metadata: {
    start_time_unix_secs: number;
    call_duration_secs: number;
    cost: number;
    termination_reason: string;
  };
  analysis: {
    call_successful: string;
    transcript_summary: string;
  };
  conversation_initiation_client_data?: {
    dynamic_variables?: Record<string, string>;
  };
}

interface WebhookPayload {
  type: string;
  event_timestamp: number;
  data: PostCallData;
}

/* ------------------------------------------------------------------ */
// Background processor
/* ------------------------------------------------------------------ */

async function processPostCallTranscription(payload: WebhookPayload) {
  const data = payload.data;
  const meta = data.metadata ?? ({} as typeof data.metadata);
  const analysis = data.analysis ?? ({} as typeof data.analysis);
  const dynamicVars =
    data.conversation_initiation_client_data?.dynamic_variables;

  // Defensive extraction — ElevenLabs may omit fields in edge cases
  const duration = meta.call_duration_secs ?? 0;
  const cost = meta.cost ?? 0;
  const callSuccessful = analysis.call_successful ?? "unknown";
  const summary = analysis.transcript_summary ?? "";
  const terminationReason = meta.termination_reason ?? "";

  // Send Telegram notification first (before potential failures)
  const telegramMsg = formatVoiceCallNotification({
    userName: dynamicVars?.user_name || "",
    conversationId: data.conversation_id,
    duration,
    cost,
    callSuccessful,
    summary,
    terminationReason,
  });
  console.log(
    "[elevenlabs:post_call] sending Telegram notification for",
    data.conversation_id,
  );
  try {
    const ok = await sendTelegramMessage(telegramMsg);
    console.log(
      "[elevenlabs:post_call] Telegram notification:",
      ok ? "sent" : "failed",
    );
  } catch (err) {
    console.error(
      "[elevenlabs:post_call] Telegram error:",
      err instanceof Error ? err.message : err,
    );
  }

  const record = {
    "Conversation ID": data.conversation_id,
    "Agent ID": data.agent_id,
    Status: data.status,
    Duration: duration,
    Cost: cost,
    "Call Successful": callSuccessful,
    Summary: summary,
    Transcript: JSON.stringify(data.transcript ?? []),
    "User Name": dynamicVars?.user_name || "",
    "Started At": (meta.start_time_unix_secs ?? 0) * 1000,
    "Event At": payload.event_timestamp * 1000,
    "Termination Reason": terminationReason,
  };

  console.log("[elevenlabs:post_call] record prepared", {
    conversationId: data.conversation_id,
    duration,
    cost,
  });

  if (!BASE_APP_TOKEN || !TABLE_ID_CALLS) {
    console.log(
      "[elevenlabs:post_call] skipping Base write — LARK_BASE_APP_TOKEN or LARK_TABLE_ID_CALLS not set",
    );
    return;
  }

  try {
    const auth = await authFromEnv();
    const client = new BitableClient(auth);
    await client.batchCreateRecords(BASE_APP_TOKEN, TABLE_ID_CALLS, [
      { fields: record },
    ]);
    console.log("[elevenlabs:post_call] written to Base", {
      conversationId: data.conversation_id,
      table: TABLE_ID_CALLS,
    });
    return;
  } catch (err) {
    console.error("[elevenlabs:post_call] Base write failed", err);
  }
}

/* ------------------------------------------------------------------ */
// Route handler
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-elevenlabs-signature");
  let bodyText: string;
  try {
    bodyText = await request.text();
  } catch (err) {
    console.error("[webhook/elevenlabs] failed to read body:", err);
    return NextResponse.json({ ok: false, error: "Bad body" }, { status: 400 });
  }
  console.log(
    "[webhook/elevenlabs] hit — signature present:",
    !!signature,
    "length:",
    bodyText.length,
  );

  // Verify signature (constructEvent validates signature + timestamp + parses JSON)
  const event = await verifySignature(bodyText, signature);
  if (!event) {
    return NextResponse.json(
      { ok: false, error: "Invalid signature" },
      { status: 401 },
    );
  }

  const payload = event as unknown as WebhookPayload;

  const eventType = payload.type;
  const eventTimestamp = payload.event_timestamp;
  const data = payload.data;
  const conversationId = data?.conversation_id;

  // Deduplicate using conversation_id + event_timestamp
  if (conversationId && isDuplicate(conversationId, eventTimestamp)) {
    console.log("[webhook/elevenlabs] duplicate event, skipping", {
      eventType,
      conversationId,
      eventTimestamp,
    });
    return NextResponse.json({ ok: true, dedup: true });
  }

  // Log receipt
  console.log("[webhook/elevenlabs] received", {
    eventType,
    conversationId,
    eventTimestamp: new Date(eventTimestamp * 1000).toISOString(),
  });

  // Acknowledge immediately, process in background
  switch (eventType) {
    case "post_call_transcription": {
      after(async () => {
        await processPostCallTranscription(payload);
      });
      break;
    }
    case "conversation_initiated": {
      after(() => {
        console.log("[webhook/elevenlabs] conversation initiated", {
          conversationId,
        });
      });
      break;
    }
    case "conversation_turn": {
      after(() => {
        console.log("[webhook/elevenlabs] turn", {
          conversationId,
          turns: data?.transcript?.length,
        });
      });
      break;
    }
    case "conversation_ended": {
      after(() => {
        console.log("[webhook/elevenlabs] conversation ended", {
          conversationId,
        });
      });
      break;
    }
    default:
      console.log("[webhook/elevenlabs] unhandled event:", eventType);
  }

  return NextResponse.json({ ok: true, received: true });
}
