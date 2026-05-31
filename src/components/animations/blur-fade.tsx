"use client";

import { useRef } from "react";
import { motion, useInView, type Transition } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { easeSmooth } from "@/lib/animation";

interface SettleRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  offset?: number;
  once?: boolean;
}

/**
 * SettleReveal — 2026 pattern:
 * No blur (paint cost), no bounce.
 * Elements reveal gently with a small translate + opacity fade.
 * Triggers with positive margin so content is ALREADY settled
 * when it enters the viewport — no snap/pop sensation.
 */
export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  offset = 16,
  once = true,
}: SettleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Positive margin: trigger animation BEFORE element enters viewport
  // so it's already visible when scrolled into view — no snap
  const isInView = useInView(ref, { once, margin: "40px 0px" });
  const reducedMotion = useReducedMotion();

  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const shift = direction === "right" || direction === "down" ? -offset : offset;

  const transition: Transition = {
    delay: 0.04 + delay,
    duration,
    ease: easeSmooth,
  };

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, [axis]: shift }}
      animate={
        isInView
          ? { opacity: 1, [axis]: 0 }
          : { opacity: 0, [axis]: shift }
      }
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
