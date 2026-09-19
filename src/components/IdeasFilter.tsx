"use client";

import { useMemo, useState } from "react";
import type { Idea } from "@/lib/types";
import { IdeaCard } from "./IdeaCard";

export function IdeasFilter({ ideas }: { ideas: Idea[] }) {
  const handles = useMemo(
    () => [...new Set(ideas.map((i) => i.source_handle))].sort(),
    [ideas],
  );
  const [handle, setHandle] = useState<string>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ideas.filter((i) => {
      if (handle !== "all" && i.source_handle !== handle) return false;
      if (!needle) return true;
      const hay = [
        i.title,
        i.one_liner,
        i.id,
        ...(i.category || []),
        i.evidence_quote,
        i.why_it_works,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [ideas, handle, q]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setHandle("all")}
            className={`rounded border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
              handle === "all"
                ? "border-ink bg-ink text-paper"
                : "border-hairline text-studio hover:border-ink hover:text-ink"
            }`}
          >
            All ({ideas.length})
          </button>
          {handles.map((h) => {
            const n = ideas.filter((i) => i.source_handle === h).length;
            return (
              <button
                key={h}
                type="button"
                onClick={() => setHandle(h)}
                className={`rounded border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                  handle === h
                    ? "border-ink bg-ink text-paper"
                    : "border-hairline text-studio hover:border-ink hover:text-ink"
                }`}
              >
                @{h} ({n})
              </button>
            );
          })}
        </div>
        <label className="block w-full sm:max-w-xs">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
            Search title / category
          </span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. hvac, recurring, local…"
            className="mt-1 w-full rounded border border-hairline bg-card px-3 py-2 text-sm text-ink outline-none placeholder:text-faint focus:border-ink"
          />
        </label>
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
        Showing {filtered.length} of {ideas.length}
      </p>

      <ul className="space-y-3">
        {filtered.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="text-sm text-studio">No ideas match this filter.</p>
      )}
    </div>
  );
}
