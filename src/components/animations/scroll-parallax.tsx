"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { easeSmooth } from "@/lib/animation";

interface ScrollParallaxProps {
  children: ReactNode;
  offset?: number;
  direction?: "up" | "down";
  className?: string;
}

/** Default offset tuned for smooth, jank-free parallax. */
const DEFAULT_OFFSET = 20;

/**
 * Scroll-driven parallax wrapper inspired by Magic UI's FeatureScroll.
 * Applies a subtle y-transform based on scroll progress for depth.
 *
 * Default offset: 20px (gentle editorial feel)
 * Use 30-40px for decorative backgrounds, 12-18px for content elements.
 */
export function ScrollParallax({
  children,
  offset = DEFAULT_OFFSET,
  direction = "up",
  className = "",
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const startY = direction === "up" ? offset : -offset;
  const endY = direction === "up" ? -offset : offset;

  const y = useTransform(scrollYProgress, [0, 1], [startY, endY], {
    ease: easeSmooth,
  });

  return (
    <div ref={ref} className={cn(className)}>
      <motion.div
        style={{ y }}
        className="will-change-transform motion-reduce:will-change-auto"
      >
        {children}
      </motion.div>
    </div>
  );
}
