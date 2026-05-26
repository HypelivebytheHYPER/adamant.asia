"use client";

import { BlurFade } from "@/components/blur-fade";
import type { StatContent } from "@/data/content";

interface StatsBarProps {
  stats: StatContent[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="py-16 md:py-20 bg-background border-y border-border/50">
      <div className="container">
        <BlurFade>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((s) => (
              <div key={s.value} className="text-center">
                <p className="text-headline text-foreground font-serif">{s.value}</p>
                <p className="text-caption text-stone mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
