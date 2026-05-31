"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { easeSpring } from "@/lib/animation";
import { altPortfolio } from "@/lib/seo-image-protocol";

interface Slide {
  imageUrl: string;
  title: string;
  description: string;
  tag1: string;
  tag2: string;
}

const slides: Slide[] = [
  {
    imageUrl: "/images/showcase/campaign-dashboard.png",
    title: "Campaign Dashboard",
    description: "Live submissions, approvals, and rankings.",
    tag1: "Case Study",
    tag2: "Live",
  },
  {
    imageUrl: "/images/showcase/kol-leaderboard.png",
    title: "KOL Leaderboard",
    description: "Gamified creator rankings with real-time scoring.",
    tag1: "Dealer Program",
    tag2: "Live",
  },
  {
    imageUrl: "/images/showcase/social-command-centre.png",
    title: "Social Command Centre",
    description: "Multi-platform scheduling and analytics.",
    tag1: "Multi-brand",
    tag2: "Live",
  },
  {
    imageUrl: "/images/showcase/ecommerce-full-stack.png",
    title: "E-commerce Full Stack",
    description: "End-to-end online store with inventory, payments, and fulfillment.",
    tag1: "E-commerce",
    tag2: "Live",
  },
];

const AUTO_INTERVAL = 4000;

export function ShowcaseCards() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const pauseRef = useRef(false);
  const reducedMotion = useReducedMotion();

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => {
      if (!pauseRef.current) goNext();
    }, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [goNext, reducedMotion]);

  const current = slides[index];

  const variants = {
    enter: { opacity: 0, x: direction * 20, scale: 0.98 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: direction * -20, scale: 0.98 },
  };

  return (
    <section id="showcase" className="section-pad bg-surface border-y border-border/30 scroll-mt-16">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-display text-foreground font-serif">Recent builds.</h2>
          <p className="text-lead text-stone mt-3">Systems we have shipped for teams like yours.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeSpring }}
          className="w-full max-w-2xl mx-auto"
          onMouseEnter={() => (pauseRef.current = true)}
          onMouseLeave={() => (pauseRef.current = false)}
        >
          <div className="rounded-xl border border-border/60 bg-surface overflow-hidden shadow-md">
            {/* Image */}
            <div className="relative w-full aspect-[21/9] overflow-hidden bg-surface-raised">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.imageUrl}
                    alt={altPortfolio(current.title, current.tag1, current.description)}
                    fill
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-contain"
                    priority={index === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Dot indicators */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 min-h-[16px] min-w-[16px] touch-target-sm ${
                      i === index
                        ? "w-6 bg-background/80"
                        : "w-2 bg-background/40 hover:bg-background/60"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-[9px] font-medium text-primary-foreground uppercase tracking-wider">
                      {current.tag1}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-[9px] font-medium text-accent-foreground uppercase tracking-wider">
                      {current.tag2}
                    </span>
                  </div>
                  <h3 className="text-caption text-foreground font-medium leading-snug">
                    {current.title}
                  </h3>
                  <p className="text-xs text-stone leading-snug">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
