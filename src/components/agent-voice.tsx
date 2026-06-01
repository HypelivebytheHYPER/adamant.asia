"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const VOICE_PHRASES = [
  "Same. But it doesn't have to be.",
  "Same. Want to hear what change sounds like?",
  "Same. Click to hear your agent speak.",
  "Same. Until you give it a voice.",
  "Same. But your AI assistant is ready to talk.",
];

const ROTATE_DURATION = 4000;

export function AgentVoice() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reducedMotion = useReducedMotion();

  // Rotate phrases visually
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % VOICE_PHRASES.length);
    }, ROTATE_DURATION);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current?.src?.startsWith("blob:")) {
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, []);

  const playCurrentPhrase = useCallback(async () => {
    const text = VOICE_PHRASES[index];

    if (isPlaying) {
      audioRef.current?.pause();
      if (audioRef.current?.src?.startsWith("blob:")) {
        URL.revokeObjectURL(audioRef.current.src);
      }
      audioRef.current = null;
      setIsPlaying(false);
      return;
    }

    setError(null);
    setIsPlaying(true);

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate speech");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        audioRef.current = null;
        URL.revokeObjectURL(url);
      };

      audio.onerror = () => {
        setIsPlaying(false);
        audioRef.current = null;
        URL.revokeObjectURL(url);
        setError("Audio playback failed");
      };

      await audio.play();
    } catch (err) {
      setIsPlaying(false);
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }, [index, isPlaying]);

  return (
    <div className="relative inline-flex flex-col items-center gap-3">
      <button
        onClick={playCurrentPhrase}
        className={cn(
          "group relative cursor-pointer select-none",
          "text-foreground font-serif",
          "transition-opacity duration-300",
          isPlaying && "opacity-90"
        )}
        style={{
          fontSize: "clamp(1.5rem, 3vw + 0.2rem, 2.25rem)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          fontWeight: 400,
        }}
        aria-label={isPlaying ? "Stop voice playback" : "Play agent voice"}
      >
        <span className="sr-only">
          {isPlaying ? "Stop voice playback" : "Play agent voice"}
        </span>

        <div className="overflow-hidden py-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="whitespace-nowrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            >
              {VOICE_PHRASES[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Play/pulse indicator */}
        <span className="absolute -left-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-4 h-4">
          <AnimatePresence>
            {isPlaying && !reducedMotion && (
              <>
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-primary"
                />
                <motion.span
                  initial={{ scale: 0.5, opacity: 0.5 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-primary"
                />
              </>
            )}
          </AnimatePresence>
          {!isPlaying && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-stone opacity-0 group-hover:opacity-60 transition-opacity duration-300"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </span>
      </button>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
