"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface AnimatedListItemProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Single item for AnimatedList — springs in with scale + opacity.
 */
export function AnimatedListItem({ children, className }: AnimatedListItemProps) {
  const reducedMotion = useReducedMotion();

  const animations: MotionProps = {
    initial: reducedMotion ? { opacity: 0 } : { scale: 0.85, opacity: 0, y: -8 },
    animate: reducedMotion ? { opacity: 1 } : { scale: 1, opacity: 1, y: 0 },
    exit: reducedMotion ? { opacity: 0 } : { scale: 0.85, opacity: 0, y: 8 },
    transition: { type: "spring", stiffness: 350, damping: 35 },
  };

  return (
    <motion.div {...animations} layout className={cn("mx-auto w-full", className)}>
      {children}
    </motion.div>
  );
}

interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  startOnView?: boolean;
}

/**
 * AnimatedList — sequentially reveals children one by one.
 * Inspired by MagicUI's animated-list component.
 * Uses Framer Motion AnimatePresence for spring animations.
 */
export const AnimatedList = React.memo(function AnimatedList({
  children,
  className,
  delay = 800,
  staggerDelay = 1200,
  startOnView = true,
}: AnimatedListProps) {
  const [index, setIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  // Intersection Observer to start animation when in view
  useEffect(() => {
    if (!startOnView || hasStarted) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  // Sequential reveal timer
  useEffect(() => {
    if (!hasStarted) return;

    if (reducedMotion) {
      setIndex(childrenArray.length - 1);
      return;
    }

    if (index < childrenArray.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, index === 0 ? delay : staggerDelay);
      return () => clearTimeout(timer);
    }
  }, [index, delay, staggerDelay, hasStarted, childrenArray.length, reducedMotion]);

  const itemsToShow = useMemo(() => {
    return childrenArray.slice(0, index + 1).reverse();
  }, [index, childrenArray]);

  return (
    <div ref={containerRef} className={cn("flex flex-col gap-3", className)}>
      <AnimatePresence mode="popLayout">
        {itemsToShow.map((item, i) => (
          <AnimatedListItem key={(item as React.ReactElement).key ?? `item-${i}`}>
            {item}
          </AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  );
});
