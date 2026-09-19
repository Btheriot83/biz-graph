import type { Graph } from "@/lib/types";

export function GraphView({ graph }: { graph: Graph }) {
  const nodes = graph.nodes || [];
  const edges = graph.edges || [];
  const w = 640;
  const h = 420;
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.34;
  const pos = new Map<string, { x: number; y: number }>();
  nodes.forEach((n, i) => {
    const a = (2 * Math.PI * i) / Math.max(nodes.length, 1) - Math.PI / 2;
    pos.set(n.id, { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
  });

  return (
    <div className="card overflow-x-auto p-3">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full min-w-[320px]">
        {edges.map((e, i) => {
          const a = pos.get(e.from);
          const b = pos.get(e.to);
          if (!a || !b) return null;
          return (
            <g key={`${e.from}-${e.to}-${i}`}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="#e4e0d8"
                strokeWidth={1.5}
              />
              <text
                x={(a.x + b.x) / 2}
                y={(a.y + b.y) / 2 - 4}
                className="fill-faint"
                fontSize={9}
                textAnchor="middle"
              >
                {e.label}
              </text>
            </g>
          );
        })}
        {nodes.map((n) => {
          const p = pos.get(n.id)!;
          return (
            <g key={n.id}>
              <circle
                cx={p.x}
                cy={p.y}
                r={28}
                fill={n.kind === "human" ? "#2d5a45" : "#fff"}
                stroke="#e4e0d8"
                strokeWidth={1.5}
              />
              <text
                x={p.x}
                y={p.y + 4}
                textAnchor="middle"
                fontSize={10}
                fill={n.kind === "human" ? "#fff" : "#1c1a17"}
              >
                {n.label.length > 12 ? n.label.slice(0, 11) + "…" : n.label}
              </text>
            </g>
          );
        })}
      </svg>
      <ul className="mt-3 space-y-1 border-t border-hairline pt-3">
        {nodes.map((n) => (
          <li key={n.id} className="text-sm text-studio">
            <span className="font-mono text-[10px] uppercase text-faint">
              {n.kind}
            </span>{" "}
            <span className="font-medium text-ink">{n.label}</span>
            {n.model_or_tool ? (
              <span className="font-mono text-[10px] text-faint">
                {" "}
                · {n.model_or_tool}
              </span>
            ) : null}
            <span className="block text-xs text-studio">{n.responsibility}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
