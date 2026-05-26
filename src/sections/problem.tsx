"use client";

import { BlurFade } from "@/components/animations/blur-fade";
import type { SectionContent } from "@/data/content";

interface ProblemProps {
  content: SectionContent;
}

export function Problem({ content }: ProblemProps) {
  return (
    <section id="problem" className="section-pad bg-background relative overflow-hidden">
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center space-block">
          <BlurFade>
            <h2 className="text-display text-foreground mb-6">
              {content.headline}
            </h2>
          </BlurFade>
          <BlurFade delay={0.12}>
            <p className="text-lead text-stone">
              {content.subheadline}
            </p>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
