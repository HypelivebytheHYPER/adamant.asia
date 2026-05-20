"use client";

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
  className = "",
  ariaLabel = "Workflow pipeline",
}: WorkflowDiagramProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`w-full ${className}`} role="img" aria-label={ariaLabel}>
      <div className="relative flex items-start justify-between">
        {/* Background track */}
        <div className="absolute top-[11px] left-0 right-0 h-px bg-border" aria-hidden="true" />

        {/* Animated flow */}
        {!reducedMotion && (
          <div
            className="absolute top-[11px] left-0 h-px"
            style={{
              width: "100%",
              background: "linear-gradient(90deg, transparent 0%, var(--primary) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
              animation: "pipelineFlow 2.5s ease-in-out infinite",
            }}
            aria-hidden="true"
          />
        )}

        {nodes.map((node, i) => (
          <div key={node.id} className="relative flex flex-col items-center z-10">
            {/* Step dot */}
            <div
              className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center bg-surface ${
                i === nodes.length - 1 ? "border-teal" : "border-primary"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  i === nodes.length - 1 ? "bg-teal" : "bg-primary"
                }`}
              />
            </div>

            {/* Label */}
            <span
              className={`mt-2 text-caption font-medium ${
                i === nodes.length - 1 ? "text-teal" : "text-foreground"
              }`}
            >
              {node.label}
            </span>

            {/* Sub-label */}
            {node.sublabel && (
              <span className="mt-0.5 text-[10px] text-stone">{node.sublabel}</span>
            )}
          </div>
        ))}
      </div>

      {!reducedMotion && (
        <style>{`
          @keyframes pipelineFlow {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      )}
    </div>
  );
}
