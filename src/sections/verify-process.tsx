"use client";

import { BlurFade } from "@/components/animations/blur-fade";
import type { VerifyProcessContent } from "@/data/content";

interface VerifyProcessProps {
  content: VerifyProcessContent;
}

export function VerifyProcess({ content }: VerifyProcessProps) {
  return (
    <section className="section-pad bg-surface scroll-mt-16">
      <div className="container max-w-5xl">
        <div className="max-w-2xl mb-12">
          <BlurFade>
            <p className="text-caption uppercase tracking-wider font-medium text-stone mb-5">
              {content.tag}
            </p>
          </BlurFade>
          <BlurFade delay={0.08}>
            <h2 className="text-display text-foreground font-serif mb-5 leading-tight">
              {content.headline}
            </h2>
          </BlurFade>
          <BlurFade delay={0.12}>
            <p className="text-lead text-stone leading-relaxed">{content.body}</p>
          </BlurFade>
        </div>

        <ol className="space-y-px">
          {content.phases.map((phase, i) => (
            <BlurFade key={phase.num} delay={0.04 * (i + 1)}>
              <li className="grid md:grid-cols-[64px_1fr] gap-4 md:gap-8 py-6 border-t border-border">
                <span
                  className="text-headline text-foreground/30 font-serif"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {phase.num}
                </span>
                <div>
                  <h3 className="text-headline text-foreground font-serif mb-2 leading-snug">
                    {phase.title}
                  </h3>
                  <p className="text-body text-stone leading-relaxed max-w-2xl">{phase.detail}</p>
                </div>
              </li>
            </BlurFade>
          ))}
        </ol>
      </div>
    </section>
  );
}
