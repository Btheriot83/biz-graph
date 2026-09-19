import type { Metadata } from "next";
import { Disclaimer } from "@/components/Disclaimer";
import { FENCE_SHORT } from "@/lib/data";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          Meta
        </p>
        <h1 className="font-display text-3xl text-ink sm:text-4xl">About</h1>
      </header>
      <Disclaimer />
      <section className="space-y-3 text-sm leading-relaxed text-studio">
        <p>
          Biz Graph is Brandon Theriot&apos;s agent-readable catalog of businesses
          mined only from The Boring Marketer (@boringmarketer) and Chris Koerner
          (@mhp_guy). Each idea is cited, then expanded into a plan an agent swarm
          can run with Brandon as the single human steerer.
        </p>
        <p>{FENCE_SHORT}</p>
        <p>
          Target corpus size is ~250 quality ideas (deduped; skip fluff). Work
          lives under <code className="font-mono text-xs">/workspace/biz-graph/</code>{" "}
          and ships on free Vercel + GitHub Btheriot83/biz-graph.
        </p>
      </section>
    </div>
  );
}
