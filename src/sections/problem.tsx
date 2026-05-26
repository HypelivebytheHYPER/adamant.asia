"use client";

import { WordRotate } from "@/components/ui/word-rotate";
import { BlurFade } from "@/components/animations/blur-fade";
import type { SectionContent } from "@/data/content";

interface ProblemProps {
  content: SectionContent;
}

export function Problem({ content }: ProblemProps) {
  return (
    <section id="problem" className="section-pad bg-background relative overflow-hidden">
      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          <BlurFade>
            <div className="mb-2 text-micro text-stone uppercase tracking-widest">
              {content.headline}
            </div>
          </BlurFade>

          <BlurFade delay={0.1}>
            <WordRotate
              words={[
                "Sipped champagne in Paris?",
                "Climbed a mountain?",
                "Had dinner with friends?",
                "Read a book for hours?",
                "Woke up without an alarm?",
              ]}
              duration={2800}
              className="text-hero text-foreground font-serif leading-[1.1]"
              motionProps={{
                initial: { opacity: 0, y: 40, rotateX: -40 },
                animate: { opacity: 1, y: 0, rotateX: 0 },
                exit: { opacity: 0, y: -40, rotateX: 40 },
                transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
              }}
            />
          </BlurFade>

          <BlurFade delay={0.2}>
            <p className="mt-6 text-lead text-foreground">
              Those are hard to plan.
            </p>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
