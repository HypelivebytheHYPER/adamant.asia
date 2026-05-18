"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { easeSmooth } from "@/lib/animation";

const milestones = [
  { value: "2 weeks", label: "to first working workflow" },
  { value: "30 days", label: "of hands-on support after handover" },
  { value: "12 hrs", label: "saved per week, on average" },
  { value: "1 person", label: "minimum — we work with solos too" },
];

const outcomes = [
  {
    before: "You answer the same question 20 times",
    after: "Your team checks the system once",
  },
  {
    before: "You find mistakes on Friday night",
    after: "The system catches them on Monday morning",
  },
  {
    before: "You train every new hire from memory",
    after: "The workflow trains them for you",
  },
];

function MilestoneCard({ m }: { m: (typeof milestones)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.55"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1], { ease: easeSmooth });
  const y = useTransform(scrollYProgress, [0, 1], [20, 0], { ease: easeSmooth });

  return (
    <motion.div ref={ref} style={{ opacity, y }} className="rounded-xl bg-background p-5 border border-border hover:shadow-hover transition-all duration-500">
      <p className="text-headline text-primary mb-1">{m.value}</p>
      <p className="text-caption text-stone">{m.label}</p>
    </motion.div>
  );
}

function OutcomeRow({ item }: { item: (typeof outcomes)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.55"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1], { ease: easeSmooth });

  return (
    <motion.div ref={ref} style={{ opacity }} className="flex items-center gap-4 py-4 border-b border-border/50 last:border-b-0">
      <span className="text-caption text-stone flex-1">{item.before}</span>
      <span className="text-caption text-primary flex-shrink-0">→</span>
      <span className="text-body text-foreground flex-1">{item.after}</span>
    </motion.div>
  );
}

export function Progress() {
  return (
    <section id="progress" className="section-pad bg-surface relative overflow-hidden">
      <div className="absolute top-[5%] right-[5%] select-none pointer-events-none" aria-hidden="true">
        <span className="text-micro text-stone/[0.4] block text-right mb-2">THE RESULT</span>
        <span className="text-chapter leading-none block">03</span>
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-28">
            <ScrollReveal delay={0.1}>
              <h2 className="text-display text-foreground mb-5">Get your <em className="italic">Tuesdays back</em>.</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-body text-stone max-w-sm mb-6">That is 12 hours a week you spend chasing people, checking stock, rewriting the same message. We give that back to you.</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lead text-foreground italic">&ldquo;I forgot the workflow was there. The work just got easier.&rdquo;</p>
            </ScrollReveal>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-3">
              {milestones.map((m) => (<MilestoneCard key={m.label} m={m} />))}
            </div>

            <div>
              <p className="text-micro text-primary uppercase tracking-wider mb-3">What changes</p>
              <div className="border-t border-border/50">
                {outcomes.map((o) => (<OutcomeRow key={o.before} item={o} />))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
