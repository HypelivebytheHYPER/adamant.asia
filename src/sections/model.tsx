"use client";

import { BlurFade } from "@/components/animations/blur-fade";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { SectionContent } from "@/data/content";

interface ModelProps {
  content: SectionContent;
}

export function Model({ content }: ModelProps) {
  return (
    <section id="model" className="section-pad bg-background scroll-mt-16 cv-section">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: Text */}
          <div>
            <BlurFade>
              <h2 className="text-display text-foreground mb-4">
                {content.headline}
              </h2>
            </BlurFade>
            <BlurFade delay={0.1}>
              <p className="text-lead text-stone max-w-md leading-relaxed">
                {content.subheadline}
              </p>
            </BlurFade>
            {content.ctaText && content.ctaLink && (
              <BlurFade delay={0.15}>
                <div className="mt-6">
                  <Link
                    href={content.ctaLink}
                    className="inline-flex items-center gap-1.5 text-ui text-primary hover:underline"
                  >
                    {content.ctaText}
                    <ArrowRight size={13} strokeWidth={2} />
                  </Link>
                </div>
              </BlurFade>
            )}
          </div>

          {/* Right: Visual */}
          <BlurFade delay={0.2}>
            <div className="rounded-xl border border-border bg-surface p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-body text-foreground font-medium">Agency</span>
                <span className="text-body text-stone">— Custom-built for you</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-body text-foreground font-medium">SaaS</span>
                <span className="text-body text-stone">— Runs without us</span>
              </div>
              <div className="h-px bg-border" />
              <p className="text-caption text-stone">
                You get a partner who understands your workflow, and a system your team uses daily. The best of both worlds.
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
