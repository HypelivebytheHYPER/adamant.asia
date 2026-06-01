"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneOff, Mic, MicOff } from "lucide-react";
import { useVoiceAgent } from "./voice-agent-context";
import { OrbVisualizer } from "./orb-visualizer";
import { AGENT_ID } from "@/lib/elevenlabs-config";

/**
 * FloatingVoiceWidget — Persistent mini-orb for non-homepage pages
 *
 * Appears in the bottom-right corner when a conversation is active.
 * Lets users end the call or mute from any page.
 */
export function FloatingVoiceWidget() {
  const {
    status,
    isSpeaking,
    isListening,
    isMuted,
    getOutputByteFrequencyData,
    startSession,
    endSession,
    setMuted,
  } = useVoiceAgent();

  const isConnected = status === "connected";
  const isConnecting = status === "connecting";

  const handleCall = useCallback(() => {
    if (!AGENT_ID) return;
    if (isConnected) {
      endSession();
    } else {
      startSession({ agentId: AGENT_ID, connectionType: "webrtc" });
    }
  }, [isConnected, startSession, endSession]);

  const orbGradient = isConnected
    ? isSpeaking
      ? "from-[#38bdf8] to-[#3b82f6]"
      : isListening
        ? "from-[#34d399] to-[#22c55e]"
        : "from-[#60a5fa] to-[#6366f1]"
    : isConnecting
      ? "from-[#fbbf24] to-[#f97316]"
      : "from-[#6b6560] to-[#4a4a45]";

  return (
    <AnimatePresence>
      {(isConnected || isConnecting) && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        >
          {/* Status tooltip */}
          <div className="px-3 py-1.5 rounded-lg bg-foreground/90 border border-white/10 text-xs text-inverse-weak backdrop-blur-sm">
            {isSpeaking
              ? "Agent speaking..."
              : isListening
                ? "Listening..."
                : isConnecting
                  ? "Connecting..."
                  : "On call"}
          </div>

          {/* Mini orb */}
          <div className="relative w-14 h-14">
            <div
              className={`absolute inset-0 rounded-full blur-lg opacity-50 bg-gradient-to-br ${orbGradient}`}
            />
            <div
              className={`relative w-full h-full rounded-full bg-gradient-to-br ${orbGradient} shadow-lg flex items-center justify-center overflow-hidden`}
            >
              {isConnected && (
                <div className="absolute inset-0 opacity-60">
                  <OrbVisualizer
                    getFrequencyData={getOutputByteFrequencyData}
                    isActive={isConnected}
                    size="sm"
                  />
                </div>
              )}
              <button
                onClick={handleCall}
                className="relative z-10 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {isConnected ? (
                  <PhoneOff className="w-4 h-4 text-white" />
                ) : (
                  <Phone className="w-4 h-4 text-white animate-pulse" />
                )}
              </button>
            </div>
          </div>

          {/* Mute button */}
          {isConnected && (
            <button
              onClick={() => setMuted(!isMuted)}
              className="w-8 h-8 rounded-full bg-foreground/90 border border-white/10 flex items-center justify-center text-inverse-weak hover:bg-[#2a2a26] transition-colors"
            >
              {isMuted ? (
                <MicOff className="w-3.5 h-3.5" />
              ) : (
                <Mic className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
