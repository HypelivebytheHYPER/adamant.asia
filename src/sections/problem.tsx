"use client";

import { WordRotate } from "@/components/ui/word-rotate";
import { BlurFade } from "@/components/animations/blur-fade";
import type { SectionContent } from "@/data/content";

interface ProblemProps {
  content: SectionContent;
}

export function Problem({ content }: ProblemProps) {
  return (
    <section
      id="problem"
      className="relative overflow-hidden bg-background"
      style={{ padding: "clamp(5rem, 10vw, 8rem) 0" }}
    >
      <div className="container relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Intro label — bigger, more present */}
          <BlurFade>
            <p
              className="mb-4 text-stone"
              style={{
                fontFamily: "var(--font-newsreader)",
                fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.75rem)",
                lineHeight: 1.4,
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              {content.headline}
            </p>
          </BlurFade>

          {/* Rotating dream — commanding size */}
          <BlurFade delay={0.1}>
            <div
              style={{
                fontFamily: "var(--font-newsreader)",
                fontSize: "clamp(2.5rem, 6vw + 0.5rem, 5rem)",
                lineHeight: 1.1,
                fontWeight: 400,
                letterSpacing: "-0.03em",
              }}
            >
              <WordRotate
                words={[
                  "Sipped champagne in Paris?",
                  "Climbed a mountain?",
                  "Had dinner with friends?",
                  "Read a book for hours?",
                  "Woke up without an alarm?",
                ]}
                duration={2800}
                className="text-foreground"
                motionProps={{
                  initial: { opacity: 0, y: 50, rotateX: -45 },
                  animate: { opacity: 1, y: 0, rotateX: 0 },
                  exit: { opacity: 0, y: -50, rotateX: 45 },
                  transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1] },
                }}
              />
            </div>
          </BlurFade>

          {/* The hook — bigger, bolder */}
          <BlurFade delay={0.2}>
            <p
              className="mt-8 text-foreground"
              style={{
                fontFamily: "var(--font-newsreader)",
                fontSize: "clamp(1.5rem, 3vw + 0.5rem, 3rem)",
                lineHeight: 1.2,
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              Those are hard to plan.
            </p>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
