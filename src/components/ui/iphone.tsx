"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Legacy flat frame — for dashboard/page.tsx live UI                */
/* ------------------------------------------------------------------ */

interface DeviceFrameLegacyProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function DeviceFrameLegacy({ children, className, title }: DeviceFrameLegacyProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[340px] overflow-hidden rounded-[28px] border border-border/60 bg-background shadow-xl shadow-foreground/[0.04]",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border/40 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-chart-3/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-chart-2/80" />
        {title && (
          <span className="ml-2 text-[10px] font-medium text-stone/60">{title}</span>
        )}
      </div>
      <div className="aspect-[390/780] overflow-hidden">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Realistic iPhone 15 Pro Frame — renders live UI inside            */
/* ------------------------------------------------------------------ */

interface DeviceFrameProps {
  children: React.ReactNode;
  className?: string;
  rotate?: "left" | "right" | "none";
}

export function DeviceFrame({
  children,
  className,
  rotate = "none",
}: DeviceFrameProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    rotate === "left" ? [14, 0, -8] : rotate === "right" ? [-14, 0, 8] : [10, 0, -10]
  );

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-4, 0, 4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.6, 1, 1, 0.6]);

  return (
    <div ref={ref} className={cn("relative mx-auto w-full max-w-[320px]", className)}>
      <motion.div
        style={{
          rotateY,
          rotateX,
          scale,
          opacity,
          transformStyle: "preserve-3d",
          perspective: 1200,
          willChange: "transform",
        }}
        className="relative"
      >
        {/* Outer metallic bezel */}
        <div className="relative rounded-[52px] bg-gradient-to-b from-[#d4d4d8] via-[#a1a1aa] to-[#52525b] p-[2.5px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.1)]">
          {/* Inner black bezel */}
          <div className="relative rounded-[50px] bg-black p-[10px]">
            {/* Screen */}
            <div className="relative overflow-hidden rounded-[40px] bg-[#0a0a0a] aspect-[390/780]">
              {/* Live UI */}
              <div className="absolute inset-0">{children}</div>

              {/* Glass reflection overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.06]" />

              {/* Dynamic Island */}
              <div className="absolute top-3 left-1/2 z-20 h-[28px] w-[110px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_1px_2px_rgba(255,255,255,0.08)]" />

              {/* Bottom home indicator */}
              <div className="absolute bottom-2 left-1/2 z-20 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-white/20" />
            </div>
          </div>

          {/* Side buttons */}
          <div className="absolute -right-[2px] top-[100px] h-7 w-[2px] rounded-r-full bg-[#71717a]" />
          <div className="absolute -right-[2px] top-[150px] h-12 w-[2px] rounded-r-full bg-[#71717a]" />
          <div className="absolute -right-[2px] top-[210px] h-12 w-[2px] rounded-r-full bg-[#71717a]" />
          <div className="absolute -left-[2px] top-[110px] h-6 w-[2px] rounded-l-full bg-[#71717a]" />
          <div className="absolute -left-[2px] top-[170px] h-9 w-[2px] rounded-l-full bg-[#71717a]" />
          <div className="absolute -left-[2px] top-[230px] h-9 w-[2px] rounded-l-full bg-[#71717a]" />

          {/* Antenna bands */}
          <div className="absolute right-[60px] -top-[1px] h-[2px] w-6 rounded-full bg-[#a1a1aa]/60" />
          <div className="absolute left-[60px] -bottom-[1px] h-[2px] w-6 rounded-full bg-[#a1a1aa]/60" />
        </div>

        {/* Soft floor shadow */}
        <div className="absolute -bottom-6 left-1/2 h-8 w-[80%] -translate-x-1/2 rounded-full bg-black/[0.12] blur-xl" />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Static frame — no scroll animation                                */
/* ------------------------------------------------------------------ */

interface StaticDeviceFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function StaticDeviceFrame({
  children,
  className,
}: StaticDeviceFrameProps) {
  return (
    <div
      className={cn("relative mx-auto w-full max-w-[320px]", className)}
      style={{ perspective: 1200 }}
    >
      <div
        className="relative"
        style={{
          transform: "rotateY(-8deg) rotateX(2deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Outer metallic bezel */}
        <div className="relative rounded-[52px] bg-gradient-to-b from-[#d4d4d8] via-[#a1a1aa] to-[#52525b] p-[2.5px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.1)]">
          {/* Inner black bezel */}
          <div className="relative rounded-[50px] bg-black p-[10px]">
            {/* Screen */}
            <div className="relative overflow-hidden rounded-[40px] bg-[#0a0a0a] aspect-[390/780]">
              <div className="absolute inset-0">{children}</div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.06]" />
              <div className="absolute top-3 left-1/2 z-20 h-[28px] w-[110px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_1px_2px_rgba(255,255,255,0.08)]" />
              <div className="absolute bottom-2 left-1/2 z-20 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-white/20" />
            </div>
          </div>

          {/* Side buttons */}
          <div className="absolute -right-[2px] top-[100px] h-7 w-[2px] rounded-r-full bg-[#71717a]" />
          <div className="absolute -right-[2px] top-[150px] h-12 w-[2px] rounded-r-full bg-[#71717a]" />
          <div className="absolute -right-[2px] top-[210px] h-12 w-[2px] rounded-r-full bg-[#71717a]" />
          <div className="absolute -left-[2px] top-[110px] h-6 w-[2px] rounded-l-full bg-[#71717a]" />
          <div className="absolute -left-[2px] top-[170px] h-9 w-[2px] rounded-l-full bg-[#71717a]" />
          <div className="absolute -left-[2px] top-[230px] h-9 w-[2px] rounded-l-full bg-[#71717a]" />
          <div className="absolute right-[60px] -top-[1px] h-[2px] w-6 rounded-full bg-[#a1a1aa]/60" />
          <div className="absolute left-[60px] -bottom-[1px] h-[2px] w-6 rounded-full bg-[#a1a1aa]/60" />
        </div>
        <div className="absolute -bottom-6 left-1/2 h-8 w-[80%] -translate-x-1/2 rounded-full bg-black/[0.12] blur-xl" />
      </div>
    </div>
  );
}
