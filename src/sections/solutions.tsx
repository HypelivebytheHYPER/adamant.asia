"use client";

import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/animations/blur-fade";
import { SolutionScrollShowcase } from "@/registry/magicui/feature-scroll";
import type { SectionContent, SolutionContent } from "@/data/content";

interface SolutionsProps {
  content: SectionContent;
  solutions: SolutionContent[];
}

export function Solutions({ content, solutions }: SolutionsProps) {
  return (
    <section
      id="solutions"
      className="bg-surface relative overflow-hidden scroll-mt-16 cv-section"
    >
      <div className="container pt-20 lg:pt-28">
        <SolutionScrollShowcase
          headline={content.headline ?? "What we build."}
          subheadline={content.subheadline ?? "Three ways we help teams move faster."}
          solutions={solutions}
        />

        {/* CTA */}
        <div className="text-center pb-24 lg:pb-32">
          <BlurFade delay={0.1}>
            <a
              href="#contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              See what it would look like for you
              <ArrowRight size={14} strokeWidth={2} />
            </a>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
