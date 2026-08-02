import { NextRequest } from "next/server";
import { logger, logEmitter } from "@/lib/logger";
import { getWebhookSecret } from "@/lib/elevenlabs-config";

/**
 * GET /api/admin/logs-sse
 * Server-Sent Events stream for real-time log updates.
 * Client connects once, server pushes new logs as they arrive.
 * Auto-reconnect handled by browser EventSource.
 *
 * Auth: checks ?secret= query param against WEBHOOK_SECRET_ELEVENLABS_ADAMANT
 * (EventSource cannot set custom headers, so we use query param + short expiry.)
 */

export const dynamic = "force-dynamic";

const KEEP_ALIVE_MS = 15_000; // send comment every 15s to keep connection alive
const MAX_DURATION_MS = 280_000; // close before Vercel 300s limit

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expected = getWebhookSecret();

  if (!expected || secret !== expected) {
    return new Response(
      JSON.stringify({ ok: false, error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send buffered logs immediately (last 50)
      const buffered = logger.getLogs(50);
      for (const log of buffered) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(log)}\n\n`));
      }

      // Subscribe to new logs
      const handler = (e: Event) => {
        const entry = (e as CustomEvent).detail;
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(entry)}\n\n`));
        } catch {
          // Stream closed
        }
      };
      logEmitter.addEventListener("log", handler);

      // Keep-alive timer
      const keepAlive = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(":ping\n\n"));
        } catch {
          clearInterval(keepAlive);
        }
      }, KEEP_ALIVE_MS);

      // Hard cap: close before Vercel kills us (clean disconnect → client auto-reconnects)
      const timeout = setTimeout(() => {
        clearInterval(keepAlive);
        logEmitter.removeEventListener("log", handler);
        try {
          controller.close();
        } catch {
          // already closed
        }
      }, MAX_DURATION_MS);

      // Cleanup on client disconnect
      request.signal.addEventListener("abort", () => {
        clearInterval(keepAlive);
        clearTimeout(timeout);
        logEmitter.removeEventListener("log", handler);
        try {
          controller.close();
        } catch {
          // already closed
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
