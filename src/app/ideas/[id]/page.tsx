import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GateChips } from "@/components/GateChips";
import { Disclaimer } from "@/components/Disclaimer";
import { getIdea, getIdeas, getPlanForIdea } from "@/lib/data";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const { ideas } = await getIdeas();
  return ideas.map((i) => ({ id: i.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const idea = await getIdea(id);
  return { title: idea?.title ?? "Idea" };
}

export default async function IdeaDetailPage({ params }: Props) {
  const { id } = await params;
  const idea = await getIdea(id);
  if (!idea) notFound();
  const plan = await getPlanForIdea(idea.id);

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          <Link href="/ideas" className="hover:text-ink">
            Ideas
          </Link>{" "}
          / {idea.id}
        </p>
        <h1 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
          {idea.title}
        </h1>
        <p className="text-base text-studio">{idea.one_liner}</p>
        <div className="flex flex-wrap gap-2 font-mono text-[10px] text-faint">
          <span>@{idea.source_handle}</span>
          {idea.source_date && <span>{idea.source_date}</span>}
          <span>{idea.status}</span>
          {idea.agent_runnable && <span className="text-accent">agent runnable</span>}
        </div>
      </header>

      <Disclaimer />

      <section className="space-y-2">
        <h2 className="font-display text-xl text-ink">Why it can work</h2>
        <p className="text-sm leading-relaxed text-studio">{idea.why_it_works}</p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl text-ink">Evidence</h2>
        <blockquote className="border-l-2 border-hairline pl-4 text-sm italic text-studio">
          {idea.evidence_quote}
        </blockquote>
        <p>
          <a
            href={idea.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-accent underline"
          >
            {idea.source_url}
          </a>
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl text-ink">Human gates</h2>
        <GateChips gates={idea.human_gates} />
      </section>

      {idea.category?.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-display text-xl text-ink">Categories</h2>
          <ul className="flex flex-wrap gap-1.5">
            {idea.category.map((c) => (
              <li
                key={c}
                className="rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px] text-faint"
              >
                {c}
              </li>
            ))}
          </ul>
        </section>
      )}

      {plan && (
        <section className="card space-y-2 px-4 py-4">
          <h2 className="font-display text-xl text-ink">Linked plan</h2>
          <p className="text-sm text-studio">{plan.one_liner}</p>
          <Link
            href={`/plans/${plan.id}`}
            className="inline-block font-mono text-[10px] uppercase tracking-[0.14em] text-accent"
          >
            Open plan →
          </Link>
        </section>
      )}

      {idea.notes && (
        <p className="text-xs text-faint">Notes: {idea.notes}</p>
      )}
    </article>
  );
}
