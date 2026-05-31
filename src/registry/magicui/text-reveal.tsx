"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeSmooth } from "@/lib/animation";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "p" | "h2" | "h3" | "span";
  delay?: number;
  speed?: number;
}

/**
 * TextReveal — scroll-driven word-by-word text reveal.
 * Inspired by MagicUI text-reveal pattern.
 *
 * Usage:
 *   <TextReveal>Adamant builds marketing systems with transparent pricing.</TextReveal>
 *
 * Each word fades from muted to full color as the user scrolls the element
 * into view. Creates a dramatic reading cadence without heavy GSAP dependency.
 */
export function TextReveal({
  children,
  className,
  as: Tag = "p",
  delay = 0,
  speed = 0.04,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: speed, delayChildren: delay },
    },
  };

  const child = {
    hidden: {
      opacity: 0.15,
      y: 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: easeSmooth,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      <Tag className="inline">
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={child}
            className="inline-block mr-[0.25em] will-change-transform"
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}

/**
 * TextRevealByLine — reveals line by line instead of word by word.
 * Better for shorter punchy statements.
 */
export function TextRevealByLine({
  children,
  className,
  as: Tag = "p",
  delay = 0,
  speed = 0.12,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const lines = children.split("\n").filter(Boolean);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: speed, delayChildren: delay },
    },
  };

  const child = {
    hidden: { opacity: 0.12, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeSmooth },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("flex flex-col", className)}
    >
      {lines.map((line, i) => (
        <Tag key={i} className="inline">
          <motion.span variants={child} className="inline-block will-change-transform">
            {line}
          </motion.span>
        </Tag>
      ))}
    </motion.div>
  );
}
