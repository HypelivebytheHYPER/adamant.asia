"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface TerminalProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

/**
 * Terminal — macOS-style terminal window.
 * Wraps children (TypingAnimation, AnimatedSpan) in a styled terminal chrome.
 */
export function Terminal({ children, className, title = "adamant" }: TerminalProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-foreground overflow-hidden shadow-xl",
        className
      )}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/10">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary/70" />
        </div>
        <span className="text-xs text-inverse-muted font-mono ml-2">{title}</span>
      </div>
      {/* Terminal body */}
      <div className="p-4 font-mono text-sm">
        {children}
      </div>
    </div>
  );
}

interface TypingAnimationProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  startOnView?: boolean;
  onComplete?: () => void;
}

/**
 * TypingAnimation — types out text character by character.
 * Inspired by MagicUI's Terminal typing effect.
 */
export function TypingAnimation({
  children,
  className,
  duration = 40,
  delay = 0,
  startOnView = true,
  onComplete,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!startOnView || isInView) {
      const timer = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(timer);
    }
  }, [startOnView, isInView, delay]);

  useEffect(() => {
    if (!started) return;

    if (reducedMotion) {
      setDisplayedText(children);
      onComplete?.();
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, duration);

    return () => clearInterval(interval);
  }, [started, children, duration, reducedMotion, onComplete]);

  return (
    <motion.span
      ref={ref}
      className={cn("text-inverse/90", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {displayedText}
      {started && displayedText.length < children.length && (
        <span className="inline-block w-2 h-4 bg-primary/80 ml-0.5 animate-pulse align-text-bottom" />
      )}
    </motion.span>
  );
}

interface AnimatedSpanProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * AnimatedSpan — fades in a terminal line.
 */
export function AnimatedSpan({ children, className, delay = 0 }: AnimatedSpanProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={cn("text-inverse/70", className)}
      initial={{ opacity: 0, y: -3 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -3 }}
      transition={{
        duration: reducedMotion ? 0 : 0.3,
        delay: reducedMotion ? 0 : delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
