"use client";

import { BlurFade } from "@/components/animations/blur-fade";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import type { SectionContent, TestimonialContent } from "@/data/content";

interface ProofProps {
  content: SectionContent;
  testimonials: TestimonialContent[];
}

export function Proof({ content, testimonials }: ProofProps) {
  return (
    <section id="proof" className="section-pad bg-background relative overflow-hidden cv-section">
      <div className="container relative">
        {/* Headline */}
        <div className="max-w-2xl space-block-sm text-center mx-auto">
          <BlurFade delay={0.08}>
            <h2 className="text-display text-foreground mb-3">
              {content.headline}
            </h2>
          </BlurFade>
          <BlurFade delay={0.14}>
            <p className="text-body text-stone max-w-md mx-auto">
              {content.subheadline}
            </p>
          </BlurFade>
        </div>

        {/* Scrolling testimonial cards */}
        <BlurFade delay={0.2} className="space-block">
          <TestimonialCarousel testimonials={testimonials} />
        </BlurFade>
      </div>
    </section>
  );
}
