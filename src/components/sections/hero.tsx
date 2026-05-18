"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { easeSpring } from "@/lib/animation";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-end pb-16 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-3" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px 200px" }} />
      <div className="absolute inset-0 bg-gradient-hero" />
      <motion.div className="container relative z-10" style={{ opacity: contentOpacity, y: contentY }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: easeSpring }} className="max-w-3xl">
          <p className="text-micro text-accent mb-5">Workflows for the determined — in Southeast Asia</p>
          <h1 className="text-hero text-foreground">Workflows for small teams in <em className="text-primary">Southeast Asia</em>.</h1>
          <p className="mt-5 text-lead text-stone max-w-md">Your business runs on memory and hope. Quotes in WhatsApp. Schedules on whiteboards. When the person who knows everything is sick, everything stops. We build systems that keep moving — even when you are not there.</p>
          <motion.a href="#problem" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-primary mt-7">See how it works</motion.a>
        </motion.div>
      </motion.div>
      <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: indicatorOpacity }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}>
        <span className="text-micro text-dim">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={16} className="text-dim" />
        </motion.div>
      </motion.div>
    </section>
  );
}
