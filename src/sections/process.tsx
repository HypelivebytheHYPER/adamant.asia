"use client";

import { BlurFade } from "@/components/animations/blur-fade";
import { Safari } from "@/components/ui/safari";
import { Map, PenTool, Hammer, Rocket } from "lucide-react";
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
    <section id="process" className="section-pad bg-gradient-warm relative overflow-hidden">
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
              <div className="absolute left-[19px] top-8 bottom-8 w-px bg-border/60" />

              {phases.map((p, i) => {
                const IconComp = iconMap[p.icon] || Map;
                const isLast = i === phases.length - 1;
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
                        <span className="text-[10px] text-stone font-medium uppercase tracking-wider">
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

          {/* Right: Safari mockup */}
          <BlurFade delay={0.35}>
            <div className="rounded-xl bg-surface border border-border p-3 shadow-lg">
              <Safari
                url="adamant.asia"
                imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                className="w-full"
              />
              <p className="text-[10px] text-stone text-center mt-2">
                Replace with your product demo video — contact us to set it up.
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
