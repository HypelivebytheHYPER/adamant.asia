"use client";

import { BlurFade } from "@/components/animations/blur-fade";
import { DottedMap } from "@/components/ui/dotted-map";
import { Map, PenTool, Hammer, Rocket } from "lucide-react";
import type { SectionContent, ProcessPhaseContent } from "@/data/content";

interface ProcessProps {
  content: SectionContent;
  phases: ProcessPhaseContent[];
}

const iconMap: Record<string, React.ElementType> = {
  Map,
  PenTool,
  Hammer,
  Rocket,
};

// Thailand & Singapore coordinates
const regionMarkers = [
  { lat: 13.7563, lng: 100.5018, size: 1.2, pulse: true }, // Bangkok
  { lat: 1.3521, lng: 103.8198, size: 1.2, pulse: true },  // Singapore
];

export function Process({ content, phases }: ProcessProps) {
  return (
    <section id="process" className="section-pad bg-gradient-warm relative overflow-hidden">
      <div className="container relative">
        <div className="max-w-2xl space-block-sm">
          <BlurFade delay={0.1}>
            <h2 className="text-display text-foreground mb-4">{content.headline}</h2>
          </BlurFade>
          <BlurFade delay={0.18}>
            <p className="text-body text-stone max-w-sm">{content.subheadline}</p>
          </BlurFade>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          {/* Left: Phase cards */}
          <BlurFade delay={0.2}>
            <div className="grid grid-cols-2 gap-3">
              {phases.map((p) => {
                const IconComp = iconMap[p.icon] || Map;
                return (
                  <div
                    key={p.title}
                    className="group relative rounded-xl bg-surface border border-border p-5 hover:border-primary/30 transition-all duration-300"
                  >
                    <span className="absolute top-3 right-3 text-[2rem] font-serif leading-none text-foreground/[0.06] select-none">
                      {p.num}
                    </span>
                    <div className="relative">
                      <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-primary mb-3">
                        <IconComp size={18} strokeWidth={1.5} />
                      </div>
                      <p className="text-caption text-foreground font-medium mb-1">{p.title}</p>
                      <p className="text-caption text-stone leading-snug">{p.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </BlurFade>

          {/* Right: Dotted Map */}
          <BlurFade delay={0.3}>
            <div className="rounded-xl bg-surface border border-border p-5 overflow-hidden h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-micro text-stone uppercase tracking-wider">Built for</span>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-caption text-foreground font-medium">Thailand</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-caption text-foreground font-medium">Singapore</span>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden flex-1 min-h-[200px] bg-foreground/[0.03]">
                <DottedMap
                  width={600}
                  height={300}
                  mapSamples={6000}
                  markers={regionMarkers}
                  dotColor="var(--stone)"
                  dotRadius={0.25}
                  markerColor="#0f766e"
                  pulse
                  stagger
                  className="text-stone/40"
                />
              </div>

              <p className="text-[10px] text-stone mt-3 leading-relaxed">
                Delivered on-site or remote. Same two-week build time, wherever your team is.
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
