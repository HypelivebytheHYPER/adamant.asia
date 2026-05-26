"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { easeSpring } from "@/lib/animation";
import { WaveCanvas } from "@/components/wave-canvas";
import { ProjectShowcase } from "@/components/project-showcase";
import { CyclingHeadline } from "@/components/cycling-headline";
import type { SectionContent } from "@/data/content";

interface HeroProps {
  content: SectionContent;
}

export function Hero({ content }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <WaveCanvas />
      </div>
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />

      <motion.div
        className="container relative z-10 pt-28 pb-16 md:pt-32 md:pb-20"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeSpring }}
            className="max-w-lg"
          >
            <CyclingHeadline
              messages={[
                "Think fast, we help build faster.",
                "Your campaign. One dashboard.",
                "Your spreadsheet chaos. Solved.",
                "Built in two weeks. Runs forever.",
              ]}
              interval={3500}
              className="text-hero text-foreground font-serif leading-[1.05]"
            />
            <p className="mt-5 text-lead text-stone max-w-md leading-relaxed">
              {content.body}
            </p>
            <motion.a
              href={content.ctaLink}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary mt-7 inline-block"
            >
              {content.ctaText}
            </motion.a>
          </motion.div>

          {/* Right: Showcase Carousel */}
          <div className="hidden lg:flex justify-center">
            <ProjectShowcase />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
