"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
}

/**
 * ScrollProgress — Smooth progress bar that follows scroll position.
 *
 * Uses useSpring for buttery interpolation instead of direct scroll mapping,
 * so the bar feels fluid rather than sticky during fast scrolls.
 */
export function ScrollProgress({ className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-px origin-left",
        "bg-linear-to-r from-primary via-accent to-primary",
        className
      )}
      style={{ scaleX }}
    />
  );
}
