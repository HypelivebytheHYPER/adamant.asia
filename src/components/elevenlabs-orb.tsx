"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mic, MicOff, Loader2, Calendar, Tag, Settings, Hammer } from "lucide-react";
import { AGENT_ID } from "@/lib/elevenlabs-config";
import { useVoiceAgent } from "./voice-agent-context";
import { OrbVisualizer } from "./orb-visualizer";

interface ElevenLabsOrbProps {
  onBookCall?: () => void;
}

/**
 * ElevenLabs ConvAI Receptionist Orb — Pure light aesthetic
 *
 * Inspired by ElevenLabs' ethereal sphere design:
 * - Pure light/energy sphere with warm-to-cool gradient
 * - No physical shading, no hard edges, no center elements
 * - Massive soft glow extending far beyond the sphere
 * - Subtle ring appears only when connected
 * - State communicated through glow color, intensity, and text only
 */
export function ElevenLabsOrb({ onBookCall }: ElevenLabsOrbProps) {
  const router = useRouter();
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

  const handleCall = useCallback(async () => {
    if (!AGENT_ID) {
      console.error("[ConvAI] AGENT_ID not configured");
      return;
    }
    if (isConnected) {
      endSession();
    } else {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err) {
        console.error("[ConvAI] microphone permission denied:", err);
        return;
      }
      startSession({ agentId: AGENT_ID, connectionType: "webrtc" as const });
    }
  }, [isConnected, startSession, endSession]);

  const handleToggleMute = useCallback(() => {
    setMuted(!isMuted);
  }, [isMuted, setMuted]);

  const quickActions = [
    { label: "Book a call", icon: Calendar, action: onBookCall },
    { label: "See pricing", icon: Tag, action: () => router.push("/pricing") },
    {
      label: "Our process",
      icon: Settings,
      action: () => {
        const el = document.getElementById("process");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push("/#process");
        }
      },
    },
    {
      label: "What we build",
      icon: Hammer,
      action: () => {
        const el = document.getElementById("solutions");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push("/#solutions");
        }
      },
    },
  ];

  // State colors — much richer, brighter center
  const brightCore = isSpeaking
    ? "rgba(224, 242, 254, 0.8)" // sky-100
    : isListening
      ? "rgba(220, 252, 231, 0.8)" // emerald-100
      : isConnecting
        ? "rgba(254, 243, 199, 0.8)" // amber-100
        : "rgba(255, 251, 235, 0.85)"; // warm white

  const warmCenter = isSpeaking
    ? "rgba(125, 211, 252, 0.6)"
    : isListening
      ? "rgba(110, 231, 183, 0.6)"
      : isConnecting
        ? "rgba(252, 211, 77, 0.6)"
        : "rgba(251, 191, 36, 0.6)";

  const coolMid = isSpeaking
    ? "rgba(56, 189, 248, 0.38)"
    : isListening
      ? "rgba(52, 211, 153, 0.38)"
      : isConnecting
        ? "rgba(251, 191, 36, 0.38)"
        : "rgba(20, 184, 166, 0.42)";

  const deepEdge = isSpeaking
    ? "rgba(14, 165, 233, 0.22)"
    : isListening
      ? "rgba(16, 185, 129, 0.22)"
      : isConnecting
        ? "rgba(245, 158, 11, 0.22)"
        : "rgba(15, 118, 110, 0.28)";

  const glowColor = isSpeaking
    ? "rgba(56, 189, 248, 0.5)"
    : isListening
      ? "rgba(52, 211, 153, 0.5)"
      : isConnecting
        ? "rgba(251, 191, 36, 0.45)"
        : "rgba(20, 184, 166, 0.45)";

  const ringColor = isSpeaking
    ? "rgba(56, 189, 248, 0.22)"
    : isListening
      ? "rgba(52, 211, 153, 0.22)"
      : "rgba(20, 184, 166, 0.2)";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center gap-5"
    >
      {/* Orb — clickable sphere */}
      <button
        onClick={handleCall}
        className="relative w-60 h-60 md:w-72 md:h-72 cursor-pointer transition-transform duration-300 hover:scale-[1.04] group"
        aria-label={
          isConnected ? "End voice call" : isConnecting ? "Connecting..." : "Start voice call"
        }
      >
        {/* === AMBIENT GLOW === */}
        <motion.div
          className="absolute inset-[-35%] rounded-full pointer-events-none"
          style={{
            background: isConnected
              ? `radial-gradient(circle, ${glowColor}50 0%, ${glowColor}18 40%, transparent 70%)`
              : `radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(20,184,166,0.1) 40%, transparent 70%)`,
            filter: "blur(24px)",
          }}
          animate={
            isConnected
              ? { scale: [1, 1.12, 1], opacity: [0.9, 1, 0.9] }
              : { scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }
          }
          transition={{
            duration: isConnected ? 2 : 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute inset-[-15%] rounded-full pointer-events-none"
          style={{
            background: isConnected
              ? `radial-gradient(circle, ${glowColor}40 0%, ${glowColor}12 45%, transparent 65%)`
              : `radial-gradient(circle, rgba(20,184,166,0.25) 0%, rgba(20,184,166,0.08) 45%, transparent 65%)`,
            filter: "blur(12px)",
          }}
          animate={
            isConnected
              ? { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }
              : { scale: [1, 1.05, 1], opacity: [0.5, 0.75, 0.5] }
          }
          transition={{
            duration: isConnected ? 1.8 : 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />

        {/* === SUBTLE RING (connected only) === */}
        {isConnected && (
          <motion.div
            className="absolute inset-[8%] rounded-full pointer-events-none"
            style={{ border: `1px solid ${ringColor}` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Pulse ring (connected) */}
        {isConnected && (
          <motion.div
            className="absolute inset-[4%] rounded-full pointer-events-none"
            style={{ border: `1.5px solid ${ringColor}` }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        {/* === THE SPHERE — pure light === */}
        <div className="absolute inset-0 rounded-full pointer-events-none">
          {/* Main body — overlapping warm + cool gradients for organic feel */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: [
                `radial-gradient(circle at 30% 25%, ${brightCore} 0%, transparent 40%)`,
                `radial-gradient(circle at 35% 30%, ${warmCenter} 0%, transparent 50%)`,
                `radial-gradient(circle at 65% 70%, ${coolMid} 0%, transparent 55%)`,
                `radial-gradient(circle at 50% 50%, ${deepEdge} 0%, transparent 70%)`,
              ].join(","),
            }}
          />

          {/* Soft inner warmth shift */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 60% 60%, ${deepEdge} 0%, transparent 45%)`,
            }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Soft rim */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: `inset 0 0 24px ${glowColor}18, 0 0 50px ${glowColor}15`,
            }}
          />

          {/* Visualizer — only when connected, very subtle */}
          {isConnected && (
            <div className="absolute inset-[-20%] pointer-events-none opacity-70">
              <OrbVisualizer
                getFrequencyData={getOutputByteFrequencyData}
                isActive={isConnected}
                size="md"
              />
            </div>
          )}
        </div>

        {/* === CENTER STATE (minimal) === */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {isConnecting ? (
            <Loader2 className="w-5 h-5 text-white/70 animate-spin" />
          ) : isConnected ? (
            <div className="flex items-center gap-[3px]">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-[3px] rounded-full bg-white/70"
                  animate={
                    isSpeaking
                      ? { height: [4, 14, 6, 16, 5] }
                      : { height: [4, 8, 5, 10, 5] }
                  }
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          ) : (
            /* Idle — tiny breathing dots */
            <div className="flex items-center gap-[3px] opacity-40 group-hover:opacity-80 transition-opacity duration-500">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-[3px] rounded-full bg-white/70"
                  animate={{ height: [5, 11, 5] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* === IDLE ATTENTION RING === */}
        {!isConnected && !isConnecting && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: `2px solid ${ringColor}` }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: [0.92, 1.18, 1.18], opacity: [0, 0.4, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeOut",
            }}
          />
        )}

        {/* === HOVER RING === */}
        {!isConnected && !isConnecting && (
          <div
            className="absolute inset-[-4%] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ border: `1.5px solid ${ringColor}` }}
          />
        )}

      </button>

      {/* Status — clickable, syncs with orb */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleCall}
          className="text-sm text-stone font-medium tracking-wide hover:text-foreground transition-colors duration-300 cursor-pointer"
        >
          {isConnected
            ? isSpeaking
              ? "Speaking..."
              : isListening
                ? "Listening..."
                : "Connected"
            : isConnecting
              ? "Connecting..."
              : "Tap to talk"}
        </button>

        {isConnected && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleMute();
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-stone hover:bg-white/10 transition-colors"
          >
            {isMuted ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
            {isMuted ? "Unmute" : "Mute"}
          </button>
        )}
      </div>

      {!isConnected && !isConnecting && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {quickActions.map(({ label, icon: Icon, action }) => (
            <button
              key={label}
              onClick={(e) => {
                e.stopPropagation();
                action?.();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-stone hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <Icon className="w-3 h-3" />
              {label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
