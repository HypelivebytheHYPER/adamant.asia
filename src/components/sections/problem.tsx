"use client";

import { BlurFade } from "@/components/blur-fade";
import { WorkflowDiagram } from "@/components/workflow-nodes";

const beforeNodes = [
  { id: "line", x: 55, y: 45, label: "LINE", r: 22 },
  { id: "email", x: 115, y: 45, label: "Email", r: 22 },
  { id: "team", x: 175, y: 45, label: "Team", r: 22 },
  { id: "orders", x: 235, y: 45, label: "Orders", r: 22 },
  { id: "questions", x: 305, y: 45, label: "Questions", r: 26 },
  { id: "you", x: 180, y: 155, label: "You", r: 36, fill: "var(--accent)", textFill: "var(--background)" },
];

const beforeConns = [
  { from: "line", to: "you", color: "var(--accent)" },
  { from: "email", to: "you", color: "var(--accent)" },
  { from: "team", to: "you", color: "var(--accent)" },
  { from: "orders", to: "you", color: "var(--accent)" },
  { from: "questions", to: "you", color: "var(--accent)" },
];

const afterNodes = [
  { id: "inputs", x: 70, y: 100, label: "Inputs", r: 24 },
  { id: "system", x: 200, y: 100, label: "System", r: 30, fill: "var(--primary)", textFill: "var(--background)" },
  { id: "auto", x: 340, y: 55, label: "Auto", r: 22 },
  { id: "dash", x: 340, y: 100, label: "Dash", r: 22 },
  { id: "self", x: 340, y: 145, label: "Self", r: 22 },
];

const afterConns = [
  { from: "inputs", to: "system", animated: true },
  { from: "system", to: "auto", animated: true },
  { from: "system", to: "dash", animated: true },
  { from: "system", to: "self", animated: true },
];

export function Problem() {
  return (
    <section id="problem" className="section-pad bg-background relative overflow-hidden">
      <div className="container relative">
        <div className="max-w-2xl space-block-sm">
          <BlurFade>
            <h2 className="text-display text-foreground mb-4">
              Your team asks <em className="italic">you</em> for everything.
            </h2>
          </BlurFade>
          <BlurFade delay={0.12}>
            <p className="text-body text-stone max-w-md">
              Every answer goes through you. Revenue sits while you search.
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.2} className="space-block">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Before — chaos */}
            <div className="rounded-xl bg-surface border border-border p-5">
              <p className="text-micro text-accent uppercase tracking-wider mb-4">Before</p>
              <WorkflowDiagram
                viewBoxWidth={360}
                viewBoxHeight={210}
                nodes={beforeNodes}
                connections={beforeConns}
                ariaLabel="Before: all channels converge on one person"
              />
              <p className="text-caption text-stone mt-3 text-center">
                Everything converges on one person.
              </p>
            </div>

            {/* After — system */}
            <div className="rounded-xl bg-surface border border-border p-5">
              <p className="text-micro text-primary uppercase tracking-wider mb-4">After</p>
              <WorkflowDiagram
                viewBoxWidth={400}
                viewBoxHeight={200}
                nodes={afterNodes}
                connections={afterConns}
                ariaLabel="After: one system handles every channel automatically"
              />
              <p className="text-caption text-stone mt-3 text-center">
                One system handles every channel.
              </p>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.1} className="max-w-md">
          <div className="flex items-baseline gap-3 py-3 border-t border-border/50">
            <span className="text-headline text-primary flex-shrink-0">40%</span>
            <span className="text-body text-stone">of daily tasks are repeated work that could be automated</span>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
