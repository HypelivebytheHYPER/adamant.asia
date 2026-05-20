"use client";

import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface NodeDef {
  id: string;
  x: number;
  y: number;
  label: string;
  sublabel?: string;
  r?: number;
  fill?: string;
  textFill?: string;
}

interface ConnDef {
  from: string;
  to: string;
  d?: string;
  animated?: boolean;
  color?: string;
  dashed?: boolean;
}

interface WorkflowDiagramProps {
  viewBoxWidth?: number;
  viewBoxHeight?: number;
  nodes: NodeDef[];
  connections: ConnDef[];
  className?: string;
  ariaLabel?: string;
}

export function WorkflowDiagram({
  viewBoxWidth = 400,
  viewBoxHeight = 240,
  nodes,
  connections,
  className = "",
  ariaLabel = "Workflow diagram",
}: WorkflowDiagramProps) {
  const reducedMotion = useReducedMotion();
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  function pathBetween(a: NodeDef, b: NodeDef, customD?: string): string {
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
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="var(--primary)" opacity="0.5" />
            </marker>
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

      {/* Connections */}
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
            markerEnd={c.animated ? "url(#arrowhead)" : undefined}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((n) => {
        const r = n.r ?? 28;
        const fill = n.fill ?? "var(--foreground)";
        const textFill = n.textFill ?? "var(--background)";
        return (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r={r}
              fill={fill}
              opacity={0.9}
            />
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
