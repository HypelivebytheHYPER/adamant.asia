"use client";

import { BlurFade } from "@/components/animations/blur-fade";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { PracticeContent } from "@/data/content";

interface HomePracticesProps {
  practices: { verify: PracticeContent; ai: PracticeContent };
}

const accentText: Record<PracticeContent["accent"], string> = {
  amber: "text-accent",
  teal: "text-primary",
};

function PracticeCard({ practice, delay }: { practice: PracticeContent; delay: number }) {
  const isHash = practice.href.startsWith("#") || practice.href.startsWith("/#");
  const cta = (
    <span className="inline-flex items-center gap-1.5 text-ui text-foreground group-hover:text-primary transition-colors mt-auto">
      Learn more <ArrowRight size={14} strokeWidth={2} />
    </span>
  );
  const className =
    "group flex flex-col h-full rounded-xl border border-border bg-surface p-8 md:p-10 transition-shadow hover:shadow-md";

  const inner = (
    <>
      <p className={`text-caption uppercase tracking-wider font-medium mb-4 ${accentText[practice.accent]}`}>
        {practice.tag}
      </p>
      <h3 className="text-headline text-foreground font-serif mb-4 leading-snug">
        {practice.headline}
      </h3>
      <p className="text-body text-stone leading-relaxed mb-6">{practice.body}</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {practice.tags.map((t) => (
          <span
            key={t}
            className="text-label text-stone bg-foreground/[0.03] border border-border/60 rounded-full px-2.5 py-1"
          >
            {t}
          </span>
        ))}
      </div>
      {cta}
    </>
  );

  return (
    <BlurFade delay={delay}>
      {isHash ? (
        <a href={practice.href} className={className}>
          {inner}
        </a>
      ) : (
        <Link href={practice.href} className={className}>
          {inner}
        </Link>
      )}
    </BlurFade>
  );
}

export function HomePractices({ practices }: HomePracticesProps) {
  return (
    <section id="practices" className="section-pad bg-background scroll-mt-16">
      <div className="container max-w-5xl">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          <PracticeCard practice={practices.verify} delay={0.05} />
          <PracticeCard practice={practices.ai} delay={0.1} />
        </div>
      </div>
    </section>
  );
}
