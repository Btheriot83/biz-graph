import Link from "next/link";
import type { Idea } from "@/lib/types";
import { GateChips } from "./GateChips";

export function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <li className="card px-4 py-4">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
          {idea.status}
        </span>
        <span className="font-mono text-[10px] text-faint">
          @{idea.source_handle}
        </span>
        {idea.source_date && (
          <span className="font-mono text-[10px] text-faint">
            {idea.source_date}
          </span>
        )}
        {idea.agent_runnable && (
          <span className="rounded border border-accent/30 bg-accent/5 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
            agent runnable
          </span>
        )}
      </div>
      <h2 className="mt-2 font-display text-lg leading-snug text-ink">
        <Link
          href={`/ideas/${idea.id}`}
          className="hover:text-accent hover:underline"
        >
          {idea.title}
        </Link>
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-studio">
        {idea.one_liner}
      </p>
      {idea.category?.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {idea.category.map((c) => (
            <li
              key={c}
              className="rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px] text-faint"
            >
              {c}
            </li>
          ))}
        </ul>
      )}
      {idea.human_gates?.length > 0 && (
        <div className="mt-3">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
            Human gates
          </p>
          <GateChips gates={idea.human_gates} />
        </div>
      )}
      <p className="mt-3 font-mono text-[10px] text-faint">{idea.id}</p>
    </li>
  );
}
