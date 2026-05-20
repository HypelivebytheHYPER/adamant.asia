"use client";

import { BlurFade } from "@/components/blur-fade";
import { Text3DFlip } from "@/components/text-3d-flip";
import { WorkflowDiagram } from "@/components/workflow-nodes";
import { Map, PenTool, Hammer, Rocket } from "lucide-react";

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
  { num: "01", title: "Map", detail: "Find the three highest-impact fixes in your workflow.", icon: Map },
  { num: "02", title: "Design", detail: "Prototype in your tools within 3 days.", icon: PenTool },
  { num: "03", title: "Build", detail: "Your team tests. We adjust until it works.", icon: Hammer },
  { num: "04", title: "Run", detail: "Handover + 30-day support. You own the system.", icon: Rocket },
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

        {/* Pipeline diagram */}
        <BlurFade delay={0.2} className="space-block">
          <div className="rounded-xl bg-surface border border-border p-5 md:p-6">
            <WorkflowDiagram
              viewBoxWidth={400}
              viewBoxHeight={100}
              nodes={pipelineNodes}
              connections={pipelineConns}
              ariaLabel="Four-step pipeline: Map, Design, Build, Run"
            />
          </div>
        </BlurFade>

        {/* Phase cards — clean grid, no sequential animation */}
        <BlurFade delay={0.25} className="space-block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {phases.map((p) => (
              <div
                key={p.title}
                className="group relative rounded-xl bg-surface border border-border p-5 hover:border-primary/30 transition-all duration-300"
              >
                {/* Number watermark */}
                <span className="absolute top-3 right-3 text-[2rem] font-serif leading-none text-foreground/[0.06] select-none">
                  {p.num}
                </span>

                <div className="relative">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-primary mb-3">
                    <p.icon size={18} strokeWidth={1.5} />
                  </div>
                  <p className="text-caption text-foreground font-medium mb-1">{p.title}</p>
                  <p className="text-caption text-stone leading-snug">{p.detail}</p>
                </div>
              </div>
            ))}
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
