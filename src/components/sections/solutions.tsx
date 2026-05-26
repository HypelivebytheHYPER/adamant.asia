"use client";

import { BlurFade } from "@/components/blur-fade";
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
        <div className="max-w-2xl space-block-sm">
          <BlurFade delay={0.1}>
            <h2 className="text-display text-foreground mb-4">{content.headline}</h2>
          </BlurFade>
          <BlurFade delay={0.18}>
            <p className="text-body text-stone max-w-md">{content.subheadline}</p>
          </BlurFade>
        </div>

        <BlurFade delay={0.25} className="space-block">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
      </div>
    </section>
  );
}
