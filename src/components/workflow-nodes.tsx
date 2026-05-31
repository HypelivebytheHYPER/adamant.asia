"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface NodeDef {
  id: string;
  label: string;
  sublabel?: string;
}

interface WorkflowDiagramProps {
  nodes: NodeDef[];
  className?: string;
  ariaLabel?: string;
}

/**
 * PipelineStepper — clean horizontal step visualization.
 * Minimal dots connected by an animated gradient track.
 */
export function WorkflowDiagram({
  nodes,
  className,
  ariaLabel = "Workflow pipeline",
}: WorkflowDiagramProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn("w-full", className)} role="img" aria-label={ariaLabel}>
      <div className="relative flex items-start justify-between">
        {/* Background track */}
        <div
          className="absolute top-3 left-0 right-0 h-px bg-border"
          aria-hidden="true"
        />

        {/* Animated gradient flow */}
        {!reducedMotion && (
          <div
            className="motion-safe:animate-pipeline-flow absolute top-3 left-0 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, var(--primary) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
            aria-hidden="true"
          />
        )}

        {nodes.map((node, i) => {
          const isLast = i === nodes.length - 1;

          return (
            <div key={node.id} className="relative z-10 flex flex-col items-center">
              {/* Step dot */}
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border-2",
                  isLast
                    ? "border-teal bg-teal"
                    : "border-primary bg-primary"
                )}
              >
                <div className="h-2 w-2 rounded-full bg-background" />
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-caption mt-2 font-medium",
                  isLast ? "text-teal" : "text-foreground"
                )}
              >
                {node.label}
              </span>

              {/* Sub-label */}
              {node.sublabel && (
                <span className="mt-0.5 text-xs text-stone">
                  {node.sublabel}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
