"use client";

import { BlurFade } from "@/components/animations/blur-fade";
import { ArrowRight } from "lucide-react";
import type { VerifyDarkContent } from "@/data/content";

interface VerifyDarkProps {
  content: VerifyDarkContent;
}

export function VerifyDark({ content }: VerifyDarkProps) {
  return (
    <section
      id="verify"
      className="section-pad bg-foreground text-background relative overflow-hidden scroll-mt-16"
    >
      <div className="container max-w-6xl relative">
        {/* Intro */}
        <div className="max-w-3xl">
          <BlurFade>
            <p className="text-caption uppercase tracking-wider font-medium text-amber-light mb-5">
              {content.tag}
            </p>
          </BlurFade>
          <BlurFade delay={0.08}>
            <h2 className="text-display text-background font-serif mb-6 leading-tight">
              {content.headline}
            </h2>
          </BlurFade>
          <BlurFade delay={0.12}>
            <p className="text-lead text-inverse-weak leading-relaxed mb-8">{content.body}</p>
          </BlurFade>
          <BlurFade delay={0.16}>
            <div className="flex flex-wrap items-center gap-2 mb-10">
              {content.badges.map((b) => (
                <span
                  key={b}
                  className="text-label text-inverse-weak bg-background/10 border border-background/15 rounded-full px-3 py-1"
                >
                  {b}
                </span>
              ))}
            </div>
          </BlurFade>
          <BlurFade delay={0.2}>
            <a href={content.ctaLink} className="btn-primary inline-flex items-center gap-2">
              {content.ctaText}
              <ArrowRight size={14} strokeWidth={2} />
            </a>
          </BlurFade>
        </div>

        {/* Services 01/02/03 */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 mt-16 pt-12 border-t border-background/15">
          {content.services.map((s, i) => (
            <BlurFade key={s.num} delay={0.05 * (i + 1)}>
              <div>
                <span
                  className="text-caption text-amber-light font-medium"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {s.num}
                </span>
                <h3 className="text-headline text-background font-serif mt-3 mb-3 leading-snug">
                  {s.title}
                </h3>
                <p className="text-body text-inverse-weak leading-relaxed">{s.body}</p>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Trust items */}
        <div className="grid sm:grid-cols-3 gap-6 md:gap-10 mt-12 pt-12 border-t border-background/15">
          {content.trust.map((t, i) => (
            <BlurFade key={t.title} delay={0.05 * (i + 1)}>
              <div>
                <h4 className="text-body text-background font-medium mb-2">{t.title}</h4>
                <p className="text-caption text-inverse-muted leading-relaxed">{t.body}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
