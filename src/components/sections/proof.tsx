"use client";

import { BlurFade } from "@/components/blur-fade";
import { Marquee } from "@/components/marquee";
import type { SectionContent, TestimonialContent, StatContent } from "@/data/content";

interface ProofProps {
  content: SectionContent;
  testimonials: TestimonialContent[];
  stats: StatContent[];
}

export function Proof({ content, testimonials, stats }: ProofProps) {
  return (
    <section id="proof" className="section-pad bg-background relative overflow-hidden">
      <div className="container relative">
        <div className="max-w-2xl space-block-sm">
          <BlurFade delay={0.08}>
            <h2 className="text-display text-foreground mb-4">{content.headline}</h2>
          </BlurFade>
          <BlurFade delay={0.14}>
            <p className="text-body text-stone max-w-md">{content.subheadline}</p>
          </BlurFade>
        </div>

        <BlurFade delay={0.2} className="space-block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="group relative rounded-lg bg-surface border border-border overflow-hidden transition-all duration-300 hover:border-primary/20"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/30 via-accent/20 to-transparent" />
                <div className="p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-foreground text-inverse text-[10px] font-medium">
                      {t.name[0]}
                    </span>
                    <div className="min-w-0">
                      <p className="text-caption text-foreground font-medium leading-tight truncate">{t.name}</p>
                      <p className="text-[10px] text-stone leading-tight truncate">{t.industry}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-[10px] text-stone truncate">{t.before}</span>
                    <span className="text-[10px] text-primary flex-shrink-0">→</span>
                    <span className="text-[10px] text-foreground truncate">{t.after}</span>
                  </div>

                  <p className="text-[10px] italic text-foreground/80 leading-snug">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </BlurFade>

        <BlurFade delay={0.1} className="space-block">
          <div className="flex items-center justify-between gap-2 rounded-lg bg-surface border border-border px-4 py-3">
            {stats.map((s) => (
              <div key={s.value} className="text-center">
                <p className="text-caption text-primary font-medium">{s.value}</p>
                <p className="text-[10px] text-stone">{s.label}</p>
              </div>
            ))}
          </div>
        </BlurFade>

        <BlurFade delay={0.1}>
          <Marquee className="space-strip bg-foreground" speed={40} gap={32}>
            {testimonials.map((t) => (
              <span key={t.name} className="inline-flex items-center gap-2 text-inverse/60 text-caption whitespace-nowrap">
                <span className="text-primary/60">&ldquo;{t.quote}&rdquo;</span>
                <span className="text-inverse/30">— {t.name}</span>
                <span className="text-inverse/20 mx-2">•</span>
              </span>
            ))}
          </Marquee>
        </BlurFade>
      </div>
    </section>
  );
}
