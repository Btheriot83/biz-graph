import type { Metadata } from "next";
import { Disclaimer } from "@/components/Disclaimer";
import { IdeasFilter } from "@/components/IdeasFilter";
import { getIdeas } from "@/lib/data";

export const metadata: Metadata = { title: "Ideas" };

export default async function IdeasPage() {
  const { ideas } = await getIdeas();
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          Catalog
        </p>
        <h1 className="font-display text-3xl text-ink sm:text-4xl">Ideas</h1>
        <p className="max-w-2xl text-sm text-studio">
          {ideas.length} harvested ideas with public citations. Filter by source
          or search title/category.
        </p>
      </header>
      <Disclaimer />
      <IdeasFilter ideas={ideas} />
    </div>
  );
}
