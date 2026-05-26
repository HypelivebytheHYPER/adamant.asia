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
        {/* Dream sequence with WordRotate */}
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
            <div className="mt-6 space-y-1">
              <p className="text-lead text-foreground">
                Those are hard to plan.
              </p>
              <p className="text-lead text-stone">
                Because your day is doing this instead:
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-2xl mx-auto text-left">
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

          <BlurFade delay={0.4}>
            <div className="mt-10 pt-6 border-t border-border/40">
              <p className="text-headline text-foreground font-serif italic">
                {content.subheadline}
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
