"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface OrbitingCirclesProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
}

/**
 * OrbitingCircles — MagicUI-style orbital animation.
 * Icons orbit around a center point using pure CSS transforms.
 * Supports multiple nested orbits with different speeds/directions.
 */
export function OrbitingCircles({
  children,
  className,
  reverse,
  duration = 20,
  delay = 0,
  radius = 160,
  path = true,
}: OrbitingCirclesProps) {
  const items = React.Children.toArray(children);
  const angleStep = 360 / items.length;

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: radius * 2, height: radius * 2 }}
    >
      {/* Optional orbit path ring */}
      {path && (
        <div
          className="absolute rounded-full border border-border/20"
          style={{
            width: radius * 2,
            height: radius * 2,
          }}
        />
      )}

      {/* Orbiting items */}
      {items.map((child, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            animation: `orbit-${reverse ? "reverse" : "normal"} ${duration}s linear infinite`,
            animationDelay: `${delay - (i * duration) / items.length}s`,
            width: 0,
            height: 0,
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              transform: `translateX(${radius}px)`,
            }}
          >
            {child}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Center hub for the orbit — typically a logo or central icon.
 */
export function OrbitHub({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative z-10 flex items-center justify-center rounded-full bg-foreground text-background shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
