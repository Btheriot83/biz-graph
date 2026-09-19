import type { Metadata } from "next";
import { Disclaimer } from "@/components/Disclaimer";

export const metadata: Metadata = { title: "Agents" };

const LINKS = [
  { href: "/llms.txt", label: "llms.txt", blurb: "How agents should read this site" },
  { href: "/llms-full.txt", label: "llms-full.txt", blurb: "Fence + schema + how-to concatenated" },
  { href: "/schema.md", label: "schema.md", blurb: "Field schemas and ID rules" },
  { href: "/FENCE.md", label: "FENCE.md", blurb: "Non-negotiable source and approval fence" },
  { href: "/data/ideas.jsonl", label: "ideas.jsonl", blurb: "One idea per line" },
  { href: "/data/ideas.json", label: "ideas.json", blurb: "Ideas + meta" },
  { href: "/data/plans.jsonl", label: "plans.jsonl", blurb: "Plans index lines" },
  { href: "/data/plans.json", label: "plans.json", blurb: "Plans + meta" },
  { href: "/data/graphs.jsonl", label: "graphs.jsonl", blurb: "Graphs index lines" },
  { href: "/data/graphs.json", label: "graphs.json", blurb: "Graphs + meta" },
];

export default function AgentsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          Machine interface
        </p>
        <h1 className="font-display text-3xl text-ink sm:text-4xl">Agents</h1>
        <p className="max-w-2xl text-sm text-studio">
          Prefer these static files over scraping HTML. Append-only IDs; cite
          public sources; never invent revenue.
        </p>
      </header>
      <Disclaimer />
      <ul className="space-y-2">
        {LINKS.map((l) => (
          <li key={l.href} className="card flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between">
            <a href={l.href} className="font-mono text-sm text-accent hover:underline">
              {l.label}
            </a>
            <span className="text-xs text-studio">{l.blurb}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
