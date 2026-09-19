import Link from "next/link";
import type { Metadata } from "next";
import { Disclaimer } from "@/components/Disclaimer";
import { IdeaCard } from "@/components/IdeaCard";
import { getIdeas, getPlans, getGraphs, FENCE_SHORT } from "@/lib/data";

export const metadata: Metadata = { title: "Overview" };

export default async function HomePage() {
  const [{ meta, ideas }, { plans }, { graphs }] = await Promise.all([
    getIdeas(),
    getPlans(),
    getGraphs(),
  ]);
  const featured = ideas.slice(0, 6);

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          Public research catalog
        </p>
        <h1 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Biz Graph
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-studio">
          Executable business ideas mined only from{" "}
          <span className="text-ink">@boringmarketer</span> and{" "}
          <span className="text-ink">@mhp_guy</span>, with agent-orchestrated
          plans and tool graphs. Brandon steers; agents draft and operate behind
          approval gates.
        </p>
        <p className="max-w-2xl text-sm text-studio">{FENCE_SHORT}</p>
      </header>

      <Disclaimer />

      <dl className="grid grid-cols-2 gap-3 border-y border-hairline py-5 sm:grid-cols-4">
        {[
          { k: "Ideas", v: ideas.length, href: "/ideas" },
          { k: "Plans", v: plans.length, href: "/plans" },
          { k: "Graphs", v: graphs.length, href: "/graphs" },
          { k: "Sources", v: 2, href: "/about" },
        ].map((s) => (
          <Link
            key={s.k}
            href={s.href}
            className="group rounded border border-transparent px-2 py-1 hover:border-hairline hover:bg-card"
          >
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
              {s.k}
            </dt>
            <dd className="font-display text-3xl tabular-nums text-ink group-hover:text-accent">
              {s.v}
            </dd>
          </Link>
        ))}
      </dl>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl text-ink">Featured ideas</h2>
          <Link
            href="/ideas"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-studio hover:text-ink"
          >
            View all →
          </Link>
        </div>
        <ul className="space-y-3">
          {featured.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </ul>
      </section>

      <section className="card space-y-3 px-4 py-4">
        <h2 className="font-display text-xl text-ink">For agents</h2>
        <p className="text-sm text-studio">
          Prefer static JSON over HTML. Start at{" "}
          <Link href="/agents" className="text-ink underline">
            /agents
          </Link>
          .
        </p>
        <ul className="font-mono text-xs text-studio space-y-1">
          <li>
            <a href="/data/ideas.jsonl" className="hover:text-ink">
              /data/ideas.jsonl
            </a>
          </li>
          <li>
            <a href="/schema.md" className="hover:text-ink">
              /schema.md
            </a>
          </li>
          <li>
            <a href="/llms.txt" className="hover:text-ink">
              /llms.txt
            </a>
          </li>
        </ul>
        {meta?.updated_at && (
          <p className="font-mono text-[10px] text-faint">
            Corpus updated {meta.updated_at}
          </p>
        )}
      </section>
    </div>
  );
}
