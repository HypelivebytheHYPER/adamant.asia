"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { BentoCard, BentoGrid } from "@/components/bento-grid";
import { easeSmooth } from "@/lib/animation";
import {
  Users, LineChart, Globe, Megaphone,
  LayoutDashboard, Wand2, Building2,
  ChevronLeft, ChevronRight,
} from "lucide-react";

const deliverables = [
  { icon: LayoutDashboard, name: "Workflow & CRM", description: "Connect LINE, Lark, Gmail. Automate the repeated work.", className: "md:col-span-2", gradient: "from-teal/8 to-teal-light/4", accent: "text-teal", bgAccent: "bg-teal/10", cta: "See how" },
  { icon: Globe, name: "Website & Launch", description: "Brief to live site in days. Not months.", className: "", gradient: "from-primary/8 to-accent/4", accent: "text-primary", bgAccent: "bg-primary/10", cta: "View work" },
  { icon: Megaphone, name: "AI Marketing", description: "Autopost that sounds like you, not a robot.", className: "", gradient: "from-accent/8 to-primary/4", accent: "text-accent", bgAccent: "bg-accent/10", cta: "Explore" },
  { icon: Users, name: "Influencer Tracking", description: "Know who drives sales. Not just likes.", className: "md:col-span-2", gradient: "from-amber/8 to-amber-light/4", accent: "text-amber", bgAccent: "bg-amber/10", cta: "Learn more" },
  { icon: LineChart, name: "Growth Dashboard", description: "See what works in real time. Stop guessing.", className: "", gradient: "from-teal/8 to-teal-light/4", accent: "text-teal", bgAccent: "bg-teal/10", cta: "See demo" },
  { icon: Building2, name: "LarkSuite Setup", description: "Base, Docs, Calendar. Connected and working.", className: "", gradient: "from-amber/8 to-amber-light/4", accent: "text-amber", bgAccent: "bg-amber/10", cta: "Integrate" },
  { icon: Wand2, name: "Custom Web App", description: "Built for your team. Not a template with your logo.", className: "md:col-span-3", gradient: "from-stone/8 to-dim/4", accent: "text-stone", bgAccent: "bg-stone/10", cta: "Build yours" },
];

const trustSignals = [
  { quote: "I forgot the workflow was there. The work just got easier.", who: "Thida, manufacturing, Bangkok" },
  { quote: "Two weeks. I did not believe it until I saw it.", who: "Min, retail, Chiang Mai" },
  { quote: "They built what we needed. Not what they wanted to sell us.", who: "Sarin, education, Phuket" },
];

const stats = [
  { value: "2 weeks", label: "average build time" },
  { value: "47", label: "workflows delivered" },
  { value: "6", label: "industries" },
  { value: "30 days", label: "support included" },
];

export function Proof() {
  const [activeIndex, setActiveIndex] = useState(0);
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % deliverables.length), []);
  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + deliverables.length) % deliverables.length), []);
  const active = deliverables[activeIndex];

  return (
    <section id="proof" className="section-pad bg-background relative overflow-hidden">
      <div className="absolute top-[5%] right-[5%] select-none pointer-events-none" aria-hidden="true">
        <span className="text-micro text-stone/[0.4] block text-right mb-2">WHAT WE BUILD</span>
        <span className="text-chapter leading-none block">04</span>
      </div>

      <div className="container relative">
        <div className="max-w-2xl mb-10 md:mb-14">
          <ScrollReveal delay={0.08}>
            <h2 className="text-display text-foreground mb-4">Workflows, websites, and <em className="italic">dashboards</em>.</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <p className="text-body text-stone max-w-md">Configured for your tools. Your language. Your pace. Everything connects to everything else.</p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mb-4">
          <div className="relative rounded-2xl bg-foreground border border-border/10 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${active.gradient} opacity-50`} />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${active.bgAccent} ${active.accent} flex items-center justify-center`}>
                  <active.icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <AnimatePresence mode="wait">
                    <motion.div key={active.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25, ease: easeSmooth }}>
                      <h3 className="text-headline text-background mb-1">{active.name}</h3>
                      <p className="text-body text-dim">{active.description}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  {deliverables.map((_, i) => (
                    <button key={i} onClick={() => setActiveIndex(i)} className={`h-1 rounded-full transition-all duration-500 ${i === activeIndex ? "w-5 bg-primary" : "w-1 bg-dim/30"}`} aria-label={`Go to ${i + 1}`} />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={prev} className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-dim/20 bg-background/10 text-background hover:bg-background/20 transition-colors" aria-label="Previous"><ChevronLeft size={14} /></button>
                  <button onClick={next} className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-dim/20 bg-background/10 text-background hover:bg-background/20 transition-colors" aria-label="Next"><ChevronRight size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="mb-14 md:mb-18">
          <BentoGrid>
            {deliverables.map((d) => (
              <BentoCard key={d.name} name={d.name} description={d.description} Icon={d.icon} className={d.className} cta={d.cta} href="#partner" background={<div className={`absolute inset-0 bg-gradient-to-br ${d.gradient} opacity-40`} />} />
            ))}
          </BentoGrid>
        </div>

        <ScrollReveal className="mb-14 md:mb-18">
          <div className="rounded-xl bg-surface border border-border p-5 md:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.value}>
                  <p className="text-headline text-primary mb-0.5">{s.value}</p>
                  <p className="text-caption text-stone">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <h3 className="text-headline text-foreground mb-6">What they say</h3>
          <div className="grid md:grid-cols-3 gap-3">
            {trustSignals.map((ts) => (
              <div key={ts.who} className="rounded-xl bg-surface border border-border p-5">
                <p className="text-body text-foreground italic mb-3">&ldquo;{ts.quote}&rdquo;</p>
                <p className="text-caption text-stone">{ts.who}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
