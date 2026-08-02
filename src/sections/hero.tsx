"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { easeSpring } from "@/lib/animation";
import { WaveCanvas } from "@/components/wave-canvas";
import { ElevenLabsOrb } from "@/components/elevenlabs-orb";
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
              initial={{ y: 24 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: easeSpring, delay: 0.1 }}
              className="max-w-xl"
            >
              {content.tag && (
                <p className="text-caption text-stone uppercase tracking-wider font-medium mb-4">
                  {content.tag}
                </p>
              )}
              <h1 className="text-hero text-foreground font-serif">
                {content.headline}
              </h1>
              <p className="mt-5 text-lead text-stone max-w-md leading-relaxed">
                {content.body}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {content.ctaText && content.ctaLink && (
                  <Link
                    href={content.ctaLink}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    {content.ctaText}
                    <ArrowRight size={14} strokeWidth={2} />
                  </Link>
                )}
                {content.cta2Text && content.cta2Link && (
                  <Link
                    href={content.cta2Link}
                    className="inline-flex items-center gap-1.5 text-ui text-foreground hover:text-primary transition-colors"
                  >
                    {content.cta2Text}
                    <ArrowRight size={14} strokeWidth={2} />
                  </Link>
                )}
              </div>
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
