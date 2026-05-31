"use client";

import { BlurFade } from "@/components/animations/blur-fade";
import { ContactForm } from "@/components/contact-form";
import { Map, PenTool, Hammer, Rocket, ArrowRight } from "lucide-react";
import type { SectionContent, ProcessPhaseContent } from "@/data/content";

interface ProcessProps {
  content: SectionContent;
  phases: ProcessPhaseContent[];
}

const iconMap: Record<string, React.ElementType> = {
  Map,
  PenTool,
  Hammer,
  Rocket,
};

export function Process({ content, phases }: ProcessProps) {
  return (
    <section id="process" className="section-pad bg-gradient-warm relative overflow-hidden scroll-mt-16 cv-section">
      <div className="container relative">
        {/* Headline */}
        <div className="max-w-2xl mb-10">
          <BlurFade delay={0.1}>
            <h2 className="text-display text-foreground mb-4">{content.headline}</h2>
          </BlurFade>
          <BlurFade delay={0.18}>
            <p className="text-body text-stone max-w-md">{content.subheadline}</p>
          </BlurFade>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left: Steps as vertical timeline */}
          <BlurFade delay={0.2}>
            <div className="relative space-y-0">
              {/* Vertical line */}
              <div className="absolute left-5 top-8 bottom-8 w-px bg-border/60" />

              {phases.map((p) => {
                const IconComp = iconMap[p.icon] || Map;
                return (
                  <div key={p.title} className="relative flex gap-5 pb-8 last:pb-0">
                    {/* Step dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center">
                        <IconComp size={16} strokeWidth={1.5} className="text-primary" />
                      </div>
                    </div>

                    {/* Step content */}
                    <div className="pt-1.5">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs text-stone font-medium uppercase tracking-wider">
                          Step {p.num}
                        </span>
                      </div>
                      <p className="text-body text-foreground font-medium mb-1">{p.title}</p>
                      <p className="text-caption text-stone leading-snug max-w-xs">
                        {p.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </BlurFade>

          {/* Right: Contact form card */}
          <BlurFade delay={0.35}>
            <div className="rounded-xl bg-surface border border-border shadow-lg overflow-hidden">
              {/* Card header */}
              <div className="px-6 pt-6 pb-2 border-b border-border/50">
                <span className="text-micro text-primary uppercase tracking-wider font-medium">
                  Get started
                </span>
                <h3 className="text-body text-foreground font-medium mt-1">
                  Book your free scope call
                </h3>
                <p className="text-caption text-stone mt-0.5">
                  Tell us what is broken. We will tell you if we can fix it.
                </p>
              </div>

              <div className="p-6 space-y-4">
                <ContactForm inline />
              </div>

              {/* Trust microcopy + quick WhatsApp */}
              <div className="px-6 pb-5 pt-0 space-y-2">
                <div className="flex items-center gap-2 text-xs text-stone/70">
                  <ArrowRight size={12} className="text-primary" />
                  <span>Reply within 24 hours &middot; No sales pressure &middot; Free</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone/70">
                  <span>Prefer WhatsApp?</span>
                  <a
                    href="https://wa.me/6589211191"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline underline-offset-2"
                  >
                    +65 8921 1191
                  </a>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
