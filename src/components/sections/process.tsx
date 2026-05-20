"use client";

import { BlurFade } from "@/components/blur-fade";
import { Text3DFlip } from "@/components/text-3d-flip";
import { WorkflowDiagram } from "@/components/workflow-nodes";
import { AnimatedList, AnimatedListItem } from "@/components/animated-list";
import { Map, PenTool, Hammer, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const pipelineNodes = [
  { id: "map", x: 55, y: 50, label: "Map", r: 22, fill: "var(--primary)", textFill: "var(--background)" },
  { id: "design", x: 155, y: 50, label: "Design", r: 22, fill: "var(--primary)", textFill: "var(--background)" },
  { id: "build", x: 255, y: 50, label: "Build", r: 22, fill: "var(--primary)", textFill: "var(--background)" },
  { id: "handover", x: 355, y: 50, label: "Run", r: 22, fill: "var(--teal)", textFill: "var(--background)" },
];

const pipelineConns = [
  { from: "map", to: "design", animated: true },
  { from: "design", to: "build", animated: true },
  { from: "build", to: "handover", animated: true },
];

const phases = [
  { title: "Map", detail: "Find the three highest-impact fixes.", icon: Map, color: "text-primary" },
  { title: "Design", detail: "Prototype in your tools within 3 days.", icon: PenTool, color: "text-primary" },
  { title: "Build", detail: "Your team tests. We adjust.", icon: Hammer, color: "text-primary" },
  { title: "Run", detail: "Handover + 30-day support.", icon: Rocket, color: "text-teal" },
];

export function Process() {
  return (
    <section id="process" className="section-pad bg-gradient-warm relative overflow-hidden">
      <div className="container relative">
        <div className="max-w-2xl space-block-sm">
          <BlurFade delay={0.1}>
            <h2 className="text-display text-foreground mb-4">
              From chaos to <em className="italic">system</em> in two weeks.
            </h2>
          </BlurFade>
          <BlurFade delay={0.18}>
            <p className="text-body text-stone max-w-sm">
              Prototype in your tools first. No migration. No learning curve.
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.2} className="space-block">
          <div className="rounded-xl bg-surface border border-border p-5 md:p-6">
            <WorkflowDiagram
              viewBoxWidth={400}
              viewBoxHeight={100}
              nodes={pipelineNodes}
              connections={pipelineConns}
              ariaLabel="Four-step pipeline: Map, Design, Build, Run"
            />

            {/* Phase cards — sequentially animated */}
            <div className="mt-6">
              <AnimatedList delay={400} staggerDelay={900}>
                {phases.map((p) => (
                  <div
                    key={p.title}
                    className="flex items-center gap-4 rounded-lg bg-background border border-border/50 p-4 hover:border-primary/20 transition-colors"
                  >
                    <div className={cn("flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center", p.color)}>
                      <p.icon size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-caption text-foreground font-medium">{p.title}</p>
                      <p className="text-caption text-stone">{p.detail}</p>
                    </div>
                  </div>
                ))}
              </AnimatedList>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.1} className="space-block-lg max-w-lg">
          <Text3DFlip
            as="p"
            className="text-lead text-foreground italic cursor-pointer"
            textClassName="text-foreground"
            flipTextClassName="text-primary"
            rotateDirection="right"
            staggerFrom="center"
          >
            The best workflow is the one your team actually uses.
          </Text3DFlip>
        </BlurFade>
      </div>
    </section>
  );
}
