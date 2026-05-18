"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { easeSmooth } from "@/lib/animation";

/* Three universal pain states — every small business owner recognizes these */
const painStates = [
  {
    before: "The same question, 20 times a day",
    after: "One place everyone checks",
    detail: "Where is the order? Is it shipped? What did we quote? Your team asks you because there is nowhere else to look.",
  },
  {
    before: "The hero who holds it all",
    after: "The system that remembers",
    detail: "One person knows the supplier, the pricing, the client history. When they leave, the knowledge walks out with them.",
  },
  {
    before: "Friday night panic",
    after: "Monday morning clarity",
    detail: "You discover the double-booking at 6 PM. The stockout after the client paid. The missed deadline when it is too late to catch.",
  },
];

const truths = [
  { stat: "40%", label: "of small business tasks are repeated work that could be automated" },
  { stat: "30%", label: "of revenue leaks come from errors, not competition" },
  { stat: "12 hrs", label: "per week spent chasing information instead of doing the work" },
];

function PainCard({ pain, index }: { pain: (typeof painStates)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.5"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1], { ease: easeSmooth });
  const y = useTransform(scrollYProgress, [0, 1], [30, 0], { ease: easeSmooth });

  return (
    <motion.div ref={ref} style={{ opacity, y }} className="relative">
      <div className="flex items-start gap-4 mb-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground/5 border border-border/50 flex items-center justify-center text-micro text-dim">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <p className="text-caption text-dim uppercase tracking-wider mb-1">Before</p>
          <p className="text-headline text-foreground">{pain.before}</p>
        </div>
      </div>
      <div className="ml-12 pl-4 border-l-2 border-primary/30">
        <p className="text-caption text-primary uppercase tracking-wider mb-1">After</p>
        <p className="text-body text-foreground mb-3">{pain.after}</p>
        <p className="text-caption text-stone leading-relaxed">{pain.detail}</p>
      </div>
    </motion.div>
  );
}

function TruthBar({ item }: { item: (typeof truths)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.6"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1], { ease: easeSmooth });
  const x = useTransform(scrollYProgress, [0, 1], [-20, 0], { ease: easeSmooth });

  return (
    <motion.div ref={ref} style={{ opacity, x }} className="flex items-baseline gap-4 py-4 border-b border-border/50 last:border-b-0">
      <span className="text-headline text-primary flex-shrink-0 w-16">{item.stat}</span>
      <span className="text-body text-stone">{item.label}</span>
    </motion.div>
  );
}

export function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

  return (
    <section ref={sectionRef} id="problem" className="section-pad bg-background relative overflow-hidden">
      <div className="absolute top-[5%] right-[5%] select-none pointer-events-none" aria-hidden="true">
        <span className="text-micro text-stone/[0.4] block text-right mb-2">THE PROBLEM</span>
        <span className="text-chapter leading-none block">01</span>
      </div>

      <div className="container relative">
        <div className="max-w-3xl mb-14 md:mb-18">
          <ScrollReveal>
            <h2 className="text-display text-foreground mb-5">Why does your team keep asking <em className="italic">you</em> the same questions?</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-body text-stone max-w-md">You started a business to build, sell, create, lead. But somewhere along the way, you became the person everyone asks. The one who knows. The one who remembers.</p>
          </ScrollReveal>
        </div>

        <div className="max-w-xl mb-14">
          <motion.div style={{ scaleX: lineScale }} className="h-px bg-primary origin-left" />
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-8 mb-14 md:mb-18">
          {painStates.map((pain, i) => (<PainCard key={pain.before} pain={pain} index={i} />))}
        </div>

        <ScrollReveal>
          <div className="max-w-2xl">
            <p className="text-micro text-primary uppercase tracking-wider mb-4">The cost of doing nothing</p>
            <div className="border-t border-border/50">
              {truths.map((t) => (<TruthBar key={t.stat} item={t} />))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-14 md:mt-18 max-w-md">
          <p className="text-body text-stone">This is not a staffing problem. It is a workflow problem. We have solved it 47 times across manufacturing, retail, education, and services.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
