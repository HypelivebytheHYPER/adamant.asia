"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * SmoothScroll — 2026 pattern:
 * Native CSS scroll-behavior only.
 * Lenis removed: it creates momentum bounce on iOS, conflicts with
 * reduced-motion, and adds unnecessary JS payload for static sites.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.style.scrollBehavior = "auto";
    } else {
      document.documentElement.style.scrollBehavior = "smooth";
    }
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
