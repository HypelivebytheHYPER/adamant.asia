"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { easeSmooth } from "@/lib/animation";

const phases = [
  {
    number: "01",
    title: "Unpack the mess",
    body: "We sit with your team and map what actually happens. Not the org chart — the real flow. WhatsApp groups, whiteboards, the notebook under the counter.",
    deliverable: "Process map + pain points documented",
  },
  {
    number: "02",
    title: "Design the fix",
    body: "We build the simplest possible workflow that solves the biggest pain first. No enterprise bloat. Just the steps you need, connected.",
    deliverable: "Workflow prototype + tool recommendations",
  },
  {
    number: "03",
    title: "Build and break",
    body: "First version in days, not months. Your team uses it. It breaks. We fix it. Three cycles and it stops breaking.",
    deliverable: "Working system your team can use",
  },
  {
    number: "04",
    title: "Hand it over",
    body: "We train your team, document the workflow, and stay close for 30 days. Then you run it. We are here if something changes.",
    deliverable: "Documentation + 30-day support",
  },
];

function PhaseCard({ phase }: { phase: (typeof phases)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.5"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1], { ease: easeSmooth });
  const y = useTransform(scrollYProgress, [0, 1], [24, 0], { ease: easeSmooth });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"], { ease: easeSmooth });

  return (
    <motion.div ref={ref} style={{ opacity, y }} className="relative pl-7 md:pl-10 pb-10 last:pb-0">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border"><motion.div style={{ height: lineWidth }} className="w-full bg-primary origin-top" /></div>
      <div className="absolute left-0 top-0 -translate-x-1/2 w-2 h-2 rounded-full bg-primary ring-3 ring-background" />
      <span className="text-micro text-dim mb-2 block">{phase.number}</span>
      <h3 className="text-headline text-foreground mb-2">{phase.title}</h3>
      <p className="text-body text-stone max-w-sm mb-3">{phase.body}</p>
      <p className="text-caption text-primary">{phase.deliverable}</p>
    </motion.div>
  );
}

export function Process() {
  return (
    <section id="process" className="section-pad bg-gradient-warm relative overflow-hidden">
      <div className="absolute top-[5%] right-[5%] select-none pointer-events-none" aria-hidden="true">
        <span className="text-micro text-stone/[0.4] block text-right mb-2">HOW IT WORKS</span>
        <span className="text-chapter leading-none block">02</span>
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-28">
            <ScrollReveal delay={0.1}>
              <h2 className="text-display text-foreground mb-5">From chaos to workflow in <em className="italic">2 weeks</em>.</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-body text-stone max-w-sm">No six-month projects. No software you need a manual to use. We build fast, test with your team, and hand it over working.</p>
            </ScrollReveal>
          </div>

          <div className="pt-2">
            {phases.map((phase) => (<PhaseCard key={phase.number} phase={phase} />))}
          </div>
        </div>

        <ScrollReveal delay={0.1} className="mt-16 md:mt-20 max-w-lg">
          <p className="text-lead text-foreground italic">&ldquo;First version breaks. Second improves. Third surprises.&rdquo;</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
