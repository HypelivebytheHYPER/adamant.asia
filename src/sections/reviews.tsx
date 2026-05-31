"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MagicTweet } from "@/components/ui/tweet-card";
import type { TestimonialContent } from "@/data/content";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewsProps {
  content: {
    headline?: string;
    subheadline?: string;
  };
  testimonials: TestimonialContent[];
}

export function Reviews({ content, testimonials }: ReviewsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const pauseUntilRef = useRef<number>(0);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  const scrollBy = (amount: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: "smooth" });
    // pause auto-scroll for 4s after manual interaction
    pauseUntilRef.current = Date.now() + 4000;
  };

  /* Continuous auto-scroll loop */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let raf: number;
    const speed = 0.9; // px per frame — visible but calm

    const tick = () => {
      const now = Date.now();
      const paused = isPaused || now < pauseUntilRef.current;

      if (!paused && el) {
        el.scrollLeft += speed;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) {
          el.scrollLeft = el.scrollLeft - half;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPaused]);

  /* Duplicate cards for seamless infinite loop */
  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="reviews" className="section-pad overflow-hidden scroll-mt-16">
      <div className="container relative">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 flex-1">
            {content.headline && (
              <h2 className="text-display text-foreground break-words">
                {content.headline}
              </h2>
            )}
            {content.subheadline && (
              <p className="mt-2 text-body text-stone">
                {content.subheadline}
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setIsPaused((p) => !p)}
              aria-label={isPaused ? "Play" : "Pause"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-stone transition-all hover:bg-muted hover:text-foreground"
            >
              {isPaused ? (
                <Play className="h-3.5 w-3.5" />
              ) : (
                <Pause className="h-3.5 w-3.5" />
              )}
            </button>
            <button
              onClick={() => scrollBy(-340)}
              disabled={!canScrollLeft}
              aria-label="Previous"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:bg-muted hover:scale-105",
                !canScrollLeft && "opacity-30 cursor-not-allowed hover:scale-100"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollBy(340)}
              disabled={!canScrollRight}
              aria-label="Next"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:bg-muted hover:scale-105",
                !canScrollRight && "opacity-30 cursor-not-allowed hover:scale-100"
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10"></div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 overflow-x-auto pb-4 pt-1 px-4 sm:px-8 scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {doubled.map((t, i) => (
            <motion.div
              key={`${t.name}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              className="snap-start flex-shrink-0 w-64 sm:w-72"
            >
              <MagicTweet tweet={t} />
            </motion.div>
          ))}
          {/* Spacer */}
          <div className="flex-shrink-0 w-6 sm:w-10"></div>
        </div>
      </div>
    </section>
  );
}
