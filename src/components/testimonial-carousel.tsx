"use client";

import { useRef, useEffect, useState } from "react";
import type { TestimonialContent } from "@/data/content";

interface TestimonialCardProps {
  testimonial: TestimonialContent;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { name, industry, before, after, quote } = testimonial;
  const initial = name[0];

  return (
    <div className="flex-shrink-0 w-[300px] sm:w-[320px] rounded-xl border border-border bg-surface p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
      {/* Header: avatar + name + industry */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-inverse text-xs font-medium">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="text-caption text-foreground font-medium leading-tight truncate">
            {name}
          </p>
          <p className="text-[10px] text-stone leading-tight truncate">{industry}</p>
        </div>
      </div>

      {/* Before → After badge */}
      <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.03] border border-border/50 px-2.5 py-1">
        <span className="text-[10px] text-stone line-through decoration-accent/40">
          {before}
        </span>
        <span className="text-[10px] text-primary">→</span>
        <span className="text-[10px] text-foreground font-medium">{after}</span>
      </div>

      {/* Quote */}
      <p className="text-body text-foreground/80 leading-relaxed italic">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}

interface TestimonialCarouselProps {
  testimonials: TestimonialContent[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);
  const scrollPos = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = 0.6; // pixels per frame

    const animate = () => {
      if (!isPaused && el) {
        scrollPos.current += speed;

        // Reset when scrolled past half (since we duplicate cards)
        const maxScroll = el.scrollWidth / 2;
        if (scrollPos.current >= maxScroll) {
          scrollPos.current = 0;
        }

        el.scrollLeft = scrollPos.current;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused]);

  // Duplicate cards for seamless infinite scroll
  const doubled = [...testimonials, ...testimonials];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10" />

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden py-2"
        style={{ scrollBehavior: "auto" }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}
