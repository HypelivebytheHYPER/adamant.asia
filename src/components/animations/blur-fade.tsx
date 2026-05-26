"use client";

import { useRef } from "react";
import { motion, useInView, type Transition, type UseInViewOptions } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { easeSmooth } from "@/lib/animation";

type MarginType = NonNullable<UseInViewOptions["margin"]>;

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  offset?: number;
  blur?: string;
  inViewMargin?: MarginType;
  once?: boolean;
}

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
  offset = 24,
  blur = "8px",
  inViewMargin = "-80px",
  once = true,
}: BlurFadeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: inViewMargin });
  const reducedMotion = useReducedMotion();

  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const shift =
    direction === "right" || direction === "down" ? -offset : offset;

  const transition: Transition = {
    delay: 0.04 + delay,
    duration,
    ease: easeSmooth,
  };

  // Skip blur on reduced-motion to protect INP
  const useBlur = !reducedMotion;

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        [axis]: shift,
        filter: useBlur ? `blur(${blur})` : "none",
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              [axis]: 0,
              filter: useBlur ? "blur(0px)" : "none",
            }
          : {
              opacity: 0,
              [axis]: shift,
              filter: useBlur ? `blur(${blur})` : "none",
            }
      }
      transition={transition}
      style={{ willChange: "opacity, transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
