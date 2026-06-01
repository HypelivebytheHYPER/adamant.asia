"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useConversation, useConversationClientTool } from "@elevenlabs/react";
import type { ConnectionType } from "@elevenlabs/client";
import { useRouter, usePathname } from "next/navigation";
import { AGENT_ID } from "@/lib/elevenlabs-config";
import { VoiceAgentContextProvider, type VoiceAgentState } from "./voice-agent-context";

/**
 * VoiceAgentController — Persistent conversation manager
 *
 * Lives in layout.tsx so it survives page navigations.
 * Registers all client tools and exposes conversation state via context.
 *
 * Client tools:
 *   - book_call     → dispatches custom event (page listens and opens modal)
 *   - show_pricing  → client-side router.push (no page reload)
 *   - show_services → scrolls to #solutions or navigates home with hash
 *   - show_process  → scrolls to #process or navigates home with hash
 */
export function VoiceAgentController({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [micMuted, setMicMuted] = useState(false);
  const scrollTargetRef = useRef<string | null>(null);

  const {
    startSession,
    endSession,
    status,
    isSpeaking,
    isListening,
    isMuted,
    setMuted,
    getOutputByteFrequencyData,
  } = useConversation({
    micMuted,
    onConnect: () => console.log("[ConvAI] connected — agent ready"),
    onError: (error) => console.error("[ConvAI] error:", error),
    onDisconnect: (details) =>
      console.log("[ConvAI] disconnected", details ? `reason: ${JSON.stringify(details)}` : ""),
    onModeChange: (mode) => console.log("[ConvAI] mode:", mode),
    onStatusChange: (status) => console.log("[ConvAI] status:", status),
    onDebug: (info) => console.log("[ConvAI] debug:", info),
  });

  /* ------------------------------------------------------------------ */
  // Client tools
  /* ------------------------------------------------------------------ */

  useConversationClientTool("book_call", async () => {
    window.dispatchEvent(new CustomEvent("adamant:book-call"));
    return "Opening the booking form now.";
  });

  useConversationClientTool("show_pricing", async () => {
    router.push("/pricing");
    return "Taking you to our pricing page.";
  });

  useConversationClientTool("show_services", async () => {
    scrollToSection("solutions", "Here's what we build.");
    return "Here's what we build.";
  });

  useConversationClientTool("show_process", async () => {
    scrollToSection("process", "This is how we work.");
    return "This is how we work.";
  });

  useConversationClientTool("scroll_to_section", async (parameters) => {
    const section = (parameters as Record<string, string>).section;
    const validSections = ["hero", "platforms", "showcase", "problem", "solutions", "process", "model", "reviews", "faq", "contact"];
    if (!section || !validSections.includes(section)) {
      return `I don't have a section called "${section || ""}". I can scroll to: ${validSections.join(", ")}.`;
    }
    scrollToSection(section, `Scrolling to ${section}.`);
    return `Scrolling to ${section}.`;
  });

  useConversationClientTool("silent_handoff", async (parameters) => {
    const reason = (parameters as Record<string, string>).reason || "auto_handoff";
    // End the call immediately
    endSession();
    // Dispatch a silent event for downstream processing (webhook will capture transcript)
    window.dispatchEvent(new CustomEvent("adamant:silent-handoff", {
      detail: { reason, timestamp: Date.now() },
    }));
    return "Handed off to the Adamant team. We will reach out within 24 hours.";
  });

  function scrollToSection(id: string, message: string) {
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    scrollTargetRef.current = id;
    router.push(`/#${id}`);
  }

  /* ------------------------------------------------------------------ */
  // Timeout guards — prevent runaway / stuck calls
  /* ------------------------------------------------------------------ */

  const INACTIVITY_TIMEOUT_MS = 20_000; // end if user is silent while listening for 20s
  const MAX_CALL_DURATION_MS = 5 * 60_000; // hard cap at 5 minutes
  const CONNECT_TIMEOUT_MS = 15_000; // abort if stuck connecting for 15s
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxDurationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const connectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const isConnected = status === "connected";
    const isConnecting = status === "connecting";

    // Connection timeout: abort if stuck in "connecting" too long
    if (isConnecting && !connectTimerRef.current) {
      connectTimerRef.current = setTimeout(() => {
        console.log("[ConvAI] connection timeout, ending session");
        endSession();
        window.dispatchEvent(new CustomEvent("adamant:silent-handoff", {
          detail: { reason: "connection_timeout", timestamp: Date.now() },
        }));
      }, CONNECT_TIMEOUT_MS);
    }
    if (!isConnecting && connectTimerRef.current) {
      clearTimeout(connectTimerRef.current);
      connectTimerRef.current = null;
    }

    // Max-duration hard cap
    if (isConnected && !maxDurationTimerRef.current) {
      maxDurationTimerRef.current = setTimeout(() => {
        console.log("[ConvAI] max call duration reached, ending session");
        endSession();
        window.dispatchEvent(new CustomEvent("adamant:silent-handoff", {
          detail: { reason: "max_duration_reached", timestamp: Date.now() },
        }));
      }, MAX_CALL_DURATION_MS);
    }
    if (!isConnected && maxDurationTimerRef.current) {
      clearTimeout(maxDurationTimerRef.current);
      maxDurationTimerRef.current = null;
    }

    // Inactivity: if agent is listening and user stays silent, end call
    if (isConnected && isListening && !isSpeaking) {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(() => {
        console.log("[ConvAI] user inactivity timeout, ending session");
        endSession();
        window.dispatchEvent(new CustomEvent("adamant:silent-handoff", {
          detail: { reason: "user_inactivity", timestamp: Date.now() },
        }));
      }, INACTIVITY_TIMEOUT_MS);
    } else {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
    }

    return () => {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
      // max-duration and connect timers are singletons that survive across
      // effect re-runs; we clear them only on disconnect (handled above)
      // or in the component-unmount case below.
    };
  }, [status, isListening, isSpeaking, endSession]);

  // Unmount safety: clean up all timers so a stale endSession never fires
  useEffect(() => {
    return () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (maxDurationTimerRef.current) clearTimeout(maxDurationTimerRef.current);
      if (connectTimerRef.current) clearTimeout(connectTimerRef.current);
    };
  }, []);

  /* ------------------------------------------------------------------ */
  // Scroll to hash after navigation
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    if (scrollTargetRef.current) {
      const id = scrollTargetRef.current;
      scrollTargetRef.current = null;
      // Give the DOM time to render
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  /* ------------------------------------------------------------------ */
  // Also handle native hash scroll on homepage
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.slice(1);
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  /* ------------------------------------------------------------------ */
  // Expose state
  /* ------------------------------------------------------------------ */

  const state: VoiceAgentState = {
    status,
    isSpeaking,
    isListening,
    isMuted,
    getOutputByteFrequencyData,
    startSession: useCallback(
      (opts: { agentId: string; connectionType?: ConnectionType }) => startSession(opts),
      [startSession]
    ),
    endSession: useCallback(() => endSession(), [endSession]),
    setMuted: useCallback((muted: boolean) => {
      setMuted(muted);
      setMicMuted(muted);
    }, [setMuted]),
  };

  return (
    <VoiceAgentContextProvider value={state}>
      {children}
    </VoiceAgentContextProvider>
  );
}
