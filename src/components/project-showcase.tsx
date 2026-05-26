"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lens } from "@/components/ui/lens";
import { easeSpring } from "@/lib/animation";

interface Slide {
  imageUrl: string;
  title: string;
  description: string;
  tag1: string;
  tag2: string;
}

const slides: Slide[] = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    title: "Campaign Dashboard",
    description: "Live submissions, approvals, and rankings — all in one view.",
    tag1: "Case Study",
    tag2: "Live",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    title: "KOL Leaderboard",
    description: "Gamified creator rankings with real-time performance scoring.",
    tag1: "Dealer Program",
    tag2: "Live",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    title: "Social Command Centre",
    description: "Multi-platform scheduling, approvals, and analytics in one dashboard.",
    tag1: "Multi-brand",
    tag2: "Live",
  },
];

const AUTO_INTERVAL = 4000; // ms

export function ProjectShowcase() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseRef = useRef(false);

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!pauseRef.current) goNext();
    }, AUTO_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goNext]);

  // Pause on hover
  const handleMouseEnter = () => {
    pauseRef.current = true;
  };
  const handleMouseLeave = () => {
    pauseRef.current = false;
  };

  const current = slides[index];

  // Slide animation variants — always forward
  const variants = {
    enter: { opacity: 0, x: direction * 24, scale: 0.97 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: direction * -24, scale: 0.97 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: easeSpring }}
      className="w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="rounded-2xl border border-border/60 bg-surface overflow-hidden shadow-lg">
        {/* Image with lens zoom + auto-slide */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-foreground/[0.03]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.5,
                ease: [0.32, 0.72, 0, 1], // smooth decelerate
              }}
              className="absolute inset-0"
            >
              <Lens
                zoomFactor={2}
                lensSize={140}
                isStatic={false}
                ariaLabel={`Project preview: ${current.title}`}
                className="w-full h-full"
              >
                <img
                  src={current.imageUrl}
                  alt={current.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </Lens>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-5 bg-background/80"
                    : "w-1.5 bg-background/40 hover:bg-background/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Card info — also animates on slide change */}
        <div className="p-5 min-h-[6.5rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary uppercase tracking-wider">
                  {current.tag1}
                </span>
                <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-medium text-accent uppercase tracking-wider">
                  {current.tag2}
                </span>
              </div>
              <h3 className="text-headline text-foreground font-medium mb-1">
                {current.title}
              </h3>
              <p className="text-caption text-stone leading-relaxed">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
