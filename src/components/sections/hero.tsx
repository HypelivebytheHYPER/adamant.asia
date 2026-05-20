"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { easeSpring } from "@/lib/animation";
import { WaveCanvas } from "@/components/wave-canvas";
import { WorkflowDiagram } from "@/components/workflow-nodes";

const heroNodes = [
  { id: "you", x: 80, y: 120, label: "You", r: 24, fill: "var(--accent)" },
  { id: "questions", x: 200, y: 60, label: "Questions", r: 22 },
  { id: "adamant", x: 280, y: 120, label: "Adamant", r: 24, fill: "var(--primary)" },
  { id: "system", x: 360, y: 120, label: "System", r: 22, fill: "var(--teal)" },
];

const heroConns = [
  { from: "you", to: "questions", animated: true },
  { from: "questions", to: "adamant", animated: true },
  { from: "adamant", to: "system", animated: true },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-center md:items-end pb-10 md:pb-16 overflow-hidden">
      {/* 3D scenic wave background */}
      <div className="absolute inset-0 -z-10">
        <WaveCanvas />
      </div>
      {/* Gradient overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />

      {/* Subtle workflow nodes — decorative, right side on desktop */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-full md:w-[55%] opacity-[0.08] pointer-events-none hidden md:block" aria-hidden="true">
        <WorkflowDiagram
          viewBoxWidth={400}
          viewBoxHeight={180}
          nodes={heroNodes}
          connections={heroConns}
          ariaLabel="Workflow: your questions flow through Adamant into a running system"
        />
      </div>

      <motion.div className="container relative z-10" style={{ opacity: contentOpacity, y: contentY }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: easeSpring }} className="max-w-3xl">
          <p className="text-micro text-accent mb-5">Systems for teams that move fast</p>
          <h1 className="text-hero text-foreground">Build once. <em className="text-primary">Run forever</em>.</h1>
          <p className="mt-5 text-lead text-stone max-w-md">You answer every question. We build the system that answers them for you.</p>
          <motion.a href="#problem" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-primary mt-7">See what is broken</motion.a>
        </motion.div>
      </motion.div>
      <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: indicatorOpacity }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}>
        <span className="text-micro text-stone">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={16} className="text-stone" />
        </motion.div>
      </motion.div>
    </section>
  );
}
