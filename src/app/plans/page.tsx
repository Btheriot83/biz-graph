import Link from "next/link";
import type { Metadata } from "next";
import { Disclaimer } from "@/components/Disclaimer";
import { getPlans } from "@/lib/data";

export const metadata: Metadata = { title: "Plans" };

export default async function PlansPage() {
  const { plans } = await getPlans();
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          Catalog
        </p>
        <h1 className="font-display text-3xl text-ink sm:text-4xl">Plans</h1>
        <p className="max-w-2xl text-sm text-studio">
          Agent-orchestrated operating plans with Brandon approval gates.
        </p>
      </header>
      <Disclaimer />
      <ul className="space-y-3">
        {plans.map((p) => (
          <li key={p.id} className="card px-4 py-4">
            <h2 className="font-display text-lg text-ink">
              <Link href={`/plans/${p.id}`} className="hover:text-accent hover:underline">
                {p.title}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-studio">{p.one_liner}</p>
            <p className="mt-2 font-mono text-[10px] text-faint">
              {p.id} · idea {p.idea_id}
            </p>
          </li>
        ))}
        {plans.length === 0 && (
          <p className="text-sm text-studio">No plans yet.</p>
        )}
      </ul>
    </div>
  );
}
