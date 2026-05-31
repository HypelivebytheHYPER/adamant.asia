"use client";

import { WordRotate } from "@/components/ui/word-rotate";
import { BlurFade } from "@/components/animations/blur-fade";
import { AgentVoice } from "@/components/agent-voice";
import type { SectionContent } from "@/data/content";

interface ProblemProps {
  content: SectionContent;
}

export function Problem({ content }: ProblemProps) {
  return (
    <section
      id="problem"
      className="relative overflow-hidden bg-background scroll-mt-16 cv-section"
    >
      <div className="container relative">
        <div className="mx-auto max-w-5xl text-center space-y-12 md:space-y-16 py-32 md:py-44 lg:py-56">
          {/* Intro label */}
          <BlurFade>
            <h2 className="text-headline text-stone">
              {content.headline}
            </h2>
          </BlurFade>

          {/* Rotating text */}
          <div
            className="mx-auto max-w-4xl text-foreground font-serif"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw + 0.3rem, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              fontWeight: 300,
              whiteSpace: "nowrap",
            }}
          >
            <WordRotate
              words={[
                "Finished lunch and actually tasted it?",
                "Closed your laptop at six?",
                'Went a whole day without a "quick question"?',
                "Remembered why you started this?",
                "Missed a meeting and nobody panicked?",
              ]}
              duration={3200}
              className="text-foreground"
              motionProps={{
                initial: { opacity: 0, y: 60, rotateX: -40 },
                animate: { opacity: 1, y: 0, rotateX: 0 },
                exit: { opacity: 0, y: -60, rotateX: 40 },
                transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
              }}
            />
          </div>

          {/* The hook — voice-interactive */}
          <BlurFade delay={0.15}>
            <div className="pt-4 flex justify-center">
              <AgentVoice />
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
