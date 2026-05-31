"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { easeSpring } from "@/lib/animation";
import { WaveCanvas } from "@/components/wave-canvas";
import { ElevenLabsOrb } from "@/components/elevenlabs-orb";
import { CyclingHeadline } from "@/components/cycling-headline";
import { ContactModal } from "@/components/contact-modal";
import type { SectionContent } from "@/data/content";

interface HeroProps {
  content: SectionContent;
}

export function Hero({ content }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handler = () => setModalOpen(true);
    window.addEventListener("adamant:book-call", handler);
    return () => window.removeEventListener("adamant:book-call", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  return (
    <>
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <section id="hero"
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
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeSpring, delay: 0.1 }}
              className="max-w-lg"
            >
              <h1 className="text-hero text-foreground font-serif">
                <CyclingHeadline
                  messages={[
                    "AI tools built for your workflow.",
                    "Repeat work? Done before you start.",
                    "Built in two weeks. Runs forever.",
                    "Agency care. Product speed.",
                  ]}
                  interval={4000}
                />
              </h1>
              <p className="mt-5 text-lead text-stone max-w-md leading-relaxed">
                {content.body}
              </p>
              <motion.button
                onClick={() => setModalOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary mt-7 inline-block"
              >
                {content.ctaText}
              </motion.button>
            </motion.div>

            {/* Right: ElevenLabs Orb */}
            <div className="flex justify-center">
              <ElevenLabsOrb onBookCall={() => setModalOpen(true)} />
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
