import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Disclaimer } from "@/components/Disclaimer";
import { GraphView } from "@/components/GraphView";
import { getGraph, getGraphs } from "@/lib/data";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const { graphs } = await getGraphs();
  return graphs.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: id };
}

export default async function GraphDetailPage({ params }: Props) {
  const { id } = await params;
  const graph = await getGraph(id);
  if (!graph) notFound();

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          <Link href="/graphs" className="hover:text-ink">
            Graphs
          </Link>{" "}
          / {graph.id}
        </p>
        <h1 className="font-display text-3xl text-ink">Orchestration graph</h1>
        <p className="text-sm text-studio">
          {graph.description || "Agent tool/role graph"}
        </p>
        <p className="font-mono text-[10px] text-faint">
          Plan:{" "}
          <Link href={`/plans/${graph.plan_id}`} className="text-accent">
            {graph.plan_id}
          </Link>
        </p>
      </header>
      <Disclaimer />
      <GraphView graph={graph} />
      {(graph.brandon_only_actions?.length ?? 0) > 0 && (
        <section className="space-y-2">
          <h2 className="font-display text-xl text-ink">Brandon-only actions</h2>
          <ul className="flex flex-wrap gap-1.5">
            {graph.brandon_only_actions!.map((a) => (
              <li
                key={a}
                className="rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px] uppercase text-faint"
              >
                {a}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
