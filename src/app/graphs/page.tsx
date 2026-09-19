import Link from "next/link";
import type { Metadata } from "next";
import { Disclaimer } from "@/components/Disclaimer";
import { getGraphs } from "@/lib/data";

export const metadata: Metadata = { title: "Graphs" };

export default async function GraphsPage() {
  const { graphs } = await getGraphs();
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          Catalog
        </p>
        <h1 className="font-display text-3xl text-ink sm:text-4xl">Graphs</h1>
        <p className="max-w-2xl text-sm text-studio">
          Brandon → chief agent → specialist/tool nodes. Money and publish stay gated.
        </p>
      </header>
      <Disclaimer />
      <ul className="space-y-3">
        {graphs.map((g) => (
          <li key={g.id} className="card px-4 py-4">
            <h2 className="font-display text-lg text-ink">
              <Link href={`/graphs/${g.id}`} className="hover:text-accent hover:underline">
                {g.id}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-studio">
              {g.description || `Plan ${g.plan_id}`}
            </p>
            <p className="mt-2 font-mono text-[10px] text-faint">
              {g.nodes?.length ?? 0} nodes · {g.edges?.length ?? 0} edges
            </p>
          </li>
        ))}
        {graphs.length === 0 && (
          <p className="text-sm text-studio">No graphs yet.</p>
        )}
      </ul>
    </div>
  );
}
