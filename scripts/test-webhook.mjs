#!/usr/bin/env node
/**
 * Test script for ElevenLabs webhook endpoint.
 *
 * Usage:
 *   WEBHOOK_SECRET_ELEVENLABS=wsec_xxx node scripts/test-webhook.mjs
 *
 * Sends a mock post_call_transcription event with VALID HMAC signature.
 * Checks Telegram + Lark Base end-to-end.
 */

import crypto from "crypto";

const WEBHOOK_URL = process.env.WEBHOOK_TEST_URL || "https://adamant.asia/api/webhook/elevenlabs";
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET_ELEVENLABS;

if (!WEBHOOK_SECRET) {
  console.error("❌ Set WEBHOOK_SECRET_ELEVENLABS env var first");
  console.error("   Example: WEBHOOK_SECRET_ELEVENLABS=wsec_xxx node scripts/test-webhook.mjs");
  process.exit(1);
}

const now = Math.floor(Date.now() / 1000);
const conversationId = `test_${now}`;

const payload = JSON.stringify({
  type: "post_call_transcription",
  event_timestamp: now,
  data: {
    conversation_id: conversationId,
    agent_id: "agent_5901ksshk9j6e1ft19n7ye6hm16k",
    status: "ended",
    transcript: [
      { role: "agent", message: "Hi, I'm Adamant's AI assistant. How can I help?", time_in_call_secs: 0 },
      { role: "user", message: "I need a SaaS tool built in two weeks.", time_in_call_secs: 3 },
      { role: "agent", message: "Absolutely. Let's discuss your requirements.", time_in_call_secs: 6 },
    ],
    metadata: {
      start_time_unix_secs: now - 12,
      call_duration_secs: 12,
      cost: 0.03,
      termination_reason: "user_hangup",
    },
    analysis: {
      call_successful: "success",
      transcript_summary: "User inquired about building a SaaS tool in two weeks. Agent confirmed capability and offered to discuss requirements.",
    },
    conversation_initiation_client_data: {
      dynamic_variables: {
        user_name: "Alice Chen",
      },
    },
  },
});

const timestamp = now.toString();
const signedPayload = `${timestamp}.${payload}`;
const signature = crypto.createHmac("sha256", WEBHOOK_SECRET).update(signedPayload).digest("hex");

console.log("📡 Sending mock post_call_transcription to:", WEBHOOK_URL);
console.log("   Conversation ID:", conversationId);
console.log("   User Name:", "Alice Chen");
console.log("   Timestamp:", timestamp);
console.log("   Signature:", `t=${timestamp},v0=${signature.slice(0, 16)}...`);
console.log();

const res = await fetch(WEBHOOK_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-ElevenLabs-Signature": `t=${timestamp},v0=${signature}`,
  },
  body: payload,
});

const body = await res.text();
console.log("📨 Response:", res.status, body);

if (res.status === 200) {
  console.log("\n✅ Webhook accepted! Check:");
  console.log("   1. Telegram Agent group for 🎙️ 'Alice Chen' notification");
  console.log("   2. Lark Base 'Call Transcripts' table for new record");
  console.log("   3. Vercel logs: vercel logs adamant.asia");
} else {
  console.log("\n❌ Webhook rejected — check signature/secret");
  process.exit(1);
}
