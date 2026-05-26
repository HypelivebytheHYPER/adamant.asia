"use client";

import { BlurFade } from "@/components/animations/blur-fade";
import {
  Network,
  LayoutDashboard,
  Zap,
  Wrench,
} from "lucide-react";
import type { SectionContent, SolutionContent } from "@/data/content";

interface SolutionsProps {
  content: SectionContent;
  solutions: SolutionContent[];
}

const iconMap: Record<string, React.ElementType> = {
  Network,
  LayoutDashboard,
  Zap,
  Wrench,
};

export function Solutions({ content, solutions }: SolutionsProps) {
  return (
    <section id="solutions" className="section-pad bg-surface relative overflow-hidden">
      <div className="container relative">
        {/* Headline + pain list */}
        <div className="max-w-3xl mx-auto text-center space-block-sm">
          <BlurFade delay={0.1}>
            <h2 className="text-display text-foreground mb-6">
              {content.headline}
            </h2>
          </BlurFade>

          <BlurFade delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 max-w-2xl mx-auto text-left">
              {[
                "Forgetting to follow up.",
                "Copy-pasting the same email.",
                "Chasing someone for a signature.",
                "Updating a spreadsheet no one reads.",
                "Answering questions you already answered.",
                "Doing work that gets done again tomorrow.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-foreground/5 mt-0.5 flex-shrink-0">
                    <span className="w-1 h-1 rounded-full bg-stone" />
                  </span>
                  <span className="text-body text-stone">{item}</span>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>

        {/* Solution cards — each solving a specific pain */}
        <BlurFade delay={0.25} className="space-block">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {solutions.map((s) => {
              const IconComp = iconMap[s.icon] || Wrench;
              return (
                <div
                  key={s.title}
                  className="group relative rounded-xl bg-background border border-border p-6 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-primary mb-4">
                    <IconComp size={20} strokeWidth={1.5} />
                  </div>
                  <p className="text-body text-foreground font-medium mb-2">{s.title}</p>
                  <p className="text-caption text-stone leading-snug">{s.description}</p>
                </div>
              );
            })}
          </div>
        </BlurFade>

        {/* Closing line */}
        <BlurFade delay={0.35}>
          <p className="text-headline text-foreground font-serif italic text-center mt-10">
            {content.subheadline}
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
