"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  speed?: number;
  gap?: number;
  repeat?: number;
}

/**
 * CSS-based infinite marquee inspired by Magic UI's Marquee component.
 * Pure CSS animation for performance — no JS animation loop needed.
 *
 * Uses @keyframes marquee / marquee-vertical from globals.css.
 * Configurable via CSS variables: --duration, --gap.
 *
 * Accessibility:
 * - aria-hidden="true" on all marquee content (decorative only)
 * - Respects prefers-reduced-motion (animation disabled)
 */
export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  speed = 40,
  gap = 16,
  repeat = 4,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
      style={
        {
          "--duration": `${speed}s`,
          "--gap": `${gap}px`,
          gap: `${gap}px`,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around motion-safe:animate-marquee",
              {
                "flex-row": !vertical,
                "flex-col motion-safe:animate-marquee-vertical": vertical,
                "group-hover:[animation-play-state:paused]": pauseOnHover,
                "[animation-direction:reverse]": reverse,
              }
            )}
            style={{ gap: `${gap}px` }}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

/**
 * Pre-styled marquee text row for Adamant's editorial bands.
 * Uses text-display with low-opacity stone color.
 */
export function MarqueeText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-display text-stone/[0.15] leading-tight whitespace-nowrap select-none",
        className
      )}
    >
      {text}
    </span>
  );
}
