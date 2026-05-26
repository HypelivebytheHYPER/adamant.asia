"use client";

import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface LensProps {
  zoomFactor?: number;
  lensSize?: number;
  isStatic?: boolean;
  ariaLabel?: string;
  children: React.ReactNode;
  className?: string;
}

export function Lens({
  zoomFactor = 2,
  lensSize = 150,
  isStatic = false,
  ariaLabel = "Zoom Area",
  children,
  className,
}: LensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });
  const [, render] = useState(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isStatic || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      posRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      render((n) => n + 1);
    },
    [isStatic]
  );

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  const { x, y } = posRef.current;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", isStatic ? "" : "cursor-none", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
    >
      {/* Normal view */}
      {children}

      {/* Magnified lens overlay */}
      {!isStatic && isVisible && containerRef.current && (
        <div
          className="pointer-events-none absolute rounded-full border border-primary/40 shadow-2xl overflow-hidden"
          style={{
            width: lensSize,
            height: lensSize,
            left: x - lensSize / 2,
            top: y - lensSize / 2,
            zIndex: 50,
          }}
          aria-hidden="true"
        >
          {/* Scaled clone positioned to create zoom effect */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              width: containerRef.current.offsetWidth * zoomFactor,
              height: containerRef.current.offsetHeight * zoomFactor,
              transform: `translate(${-x * zoomFactor + lensSize / 2}px, ${-y * zoomFactor + lensSize / 2}px)`,
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
