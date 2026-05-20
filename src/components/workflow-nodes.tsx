"use client";

import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

/* ── Legacy SVG node graph (used by hero decoration) ── */

interface LegacyNodeDef {
  id: string;
  x: number;
  y: number;
  label: string;
  sublabel?: string;
  r?: number;
  fill?: string;
  textFill?: string;
}

interface LegacyConnDef {
  from: string;
  to: string;
  d?: string;
  animated?: boolean;
  color?: string;
  dashed?: boolean;
}

interface LegacyWorkflowDiagramProps {
  viewBoxWidth?: number;
  viewBoxHeight?: number;
  nodes: LegacyNodeDef[];
  connections: LegacyConnDef[];
  className?: string;
  ariaLabel?: string;
}

function LegacyWorkflowDiagram({
  viewBoxWidth = 400,
  viewBoxHeight = 240,
  nodes,
  connections,
  className = "",
  ariaLabel = "Workflow diagram",
}: LegacyWorkflowDiagramProps) {
  const reducedMotion = useReducedMotion();
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  function pathBetween(a: LegacyNodeDef, b: LegacyNodeDef, customD?: string): string {
    if (customD) return customD;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const rA = a.r ?? 28;
    const rB = b.r ?? 28;
    const tA = rA / dist;
    const tB = 1 - rB / dist;
    const x1 = a.x + dx * tA;
    const y1 = a.y + dy * tA;
    const x2 = a.x + dx * tB;
    const y2 = a.y + dy * tB;
    const cx = (x1 + x2) / 2 + (dy / dist) * 20;
    const cy = (y1 + y2) / 2 - (dx / dist) * 20;
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  }

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`w-full h-auto ${className}`}
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        {!reducedMotion && (
          <>
            <style>{`
              @keyframes flowPulse {
                0% { stroke-dashoffset: 200; }
                100% { stroke-dashoffset: 0; }
              }
              .conn-animated {
                stroke-dasharray: 6 6;
                animation: flowPulse 2s linear infinite;
              }
            `}</style>
          </>
        )}
      </defs>

      {connections.map((c, i) => {
        const a = nodeMap.get(c.from);
        const b = nodeMap.get(c.to);
        if (!a || !b) return null;
        const d = pathBetween(a, b, c.d);
        const stroke = c.color ?? "var(--primary)";
        return (
          <path
            key={`conn-${i}`}
            d={d}
            fill="none"
            stroke={stroke}
            strokeWidth={1.5}
            strokeDasharray={c.dashed ? "4 4" : undefined}
            opacity={0.4}
            className={c.animated && !reducedMotion ? "conn-animated" : ""}
          />
        );
      })}

      {nodes.map((n) => {
        const r = n.r ?? 28;
        const fill = n.fill ?? "var(--foreground)";
        const textFill = n.textFill ?? "var(--background)";
        return (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={r} fill={fill} opacity={0.9} />
            <text
              x={n.x}
              y={n.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={textFill}
              fontSize={r > 30 ? 12 : r > 24 ? 11 : 10}
              fontFamily="var(--font-geist-sans)"
              fontWeight={500}
            >
              {n.label}
            </text>
            {n.sublabel && (
              <text
                x={n.x}
                y={n.y + r + 14}
                textAnchor="middle"
                fill="var(--stone)"
                fontSize={10}
                fontFamily="var(--font-geist-sans)"
              >
                {n.sublabel}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ── Modern stepper (used by process pipeline) ── */

interface StepperNodeDef {
  id: string;
  label: string;
  sublabel?: string;
}

interface StepperDiagramProps {
  nodes: StepperNodeDef[];
  className?: string;
  ariaLabel?: string;
}

function StepperDiagram({
  nodes,
  className = "",
  ariaLabel = "Workflow pipeline",
}: StepperDiagramProps) {
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

/* ── Unified export ── */

export function WorkflowDiagram(props: LegacyWorkflowDiagramProps | StepperDiagramProps) {
  if ("connections" in props) {
    return <LegacyWorkflowDiagram {...props} />;
  }
  return <StepperDiagram {...props} />;
}
