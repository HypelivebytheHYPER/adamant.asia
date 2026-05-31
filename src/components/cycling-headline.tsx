"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CyclingHeadlineProps {
  messages: string[];
  interval?: number;
  className?: string;
}

function AnimatedText({ text }: { text: string }) {
  const words = text.split(" ");
  let charCount = 0;

  return (
    <span className="inline-block">
      {words.map((word, wordIdx) => {
        const chars = Array.from(word);
        const wordStart = charCount;
        charCount += chars.length;

        return (
          <span key={`${wordIdx}-${word}`} className="inline-block whitespace-nowrap">
            {chars.map((char, charIdx) => {
              const globalIdx = wordStart + charIdx;
              return (
                <motion.span
                  key={`${globalIdx}-${char}`}
                  initial={{ opacity: 0, rotateX: -90, y: 20 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  exit={{ opacity: 0, rotateX: 90, y: -20 }}
                  transition={{
                    duration: 0.5,
                    delay: globalIdx * 0.025,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="inline-block origin-bottom"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {char}
                </motion.span>
              );
            })}
            {wordIdx < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </span>
  );
}

export function CyclingHeadline({
  messages,
  interval = 4500,
  className,
}: CyclingHeadlineProps) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pauseRef = useRef(false);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % messages.length);
  }, [messages.length]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      if (!pauseRef.current) next();
    }, interval);
    return () => clearInterval(timer);
  }, [interval, next, mounted]);

  // Render plain text on SSR + initial client render to avoid
  // framer-motion initial={{ opacity: 0 }} hiding the headline.
  // Use <span> because the parent (hero.tsx) already wraps us in <h1>.
  if (!mounted) {
    return <span className={className}>{messages[0]}</span>;
  }

  return (
    <span
      className={className}
      onMouseEnter={() => (pauseRef.current = true)}
      onMouseLeave={() => (pauseRef.current = false)}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          <AnimatedText text={messages[index]} />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
