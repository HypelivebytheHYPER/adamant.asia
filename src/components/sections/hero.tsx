"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { easeSpring } from "@/lib/animation";
import { WaveCanvas } from "@/components/wave-canvas";
import type { SectionContent } from "@/data/content";

interface HeroProps {
  content: SectionContent;
}

export function Hero({ content }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-center md:items-end pb-10 md:pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <WaveCanvas />
      </div>
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />

      <motion.div className="container relative z-10" style={{ opacity: contentOpacity, y: contentY }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeSpring }}
          className="max-w-3xl"
        >
          <h1 className="text-hero text-foreground font-serif">
            {content.headline}
          </h1>
          <p className="mt-5 text-lead text-stone max-w-md">{content.body}</p>
          <motion.a
            href={content.ctaLink}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary mt-7"
          >
            {content.ctaText}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
