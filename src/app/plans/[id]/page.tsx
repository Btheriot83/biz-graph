import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Disclaimer } from "@/components/Disclaimer";
import { getPlan, getPlans } from "@/lib/data";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const { plans } = await getPlans();
  return plans.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const plan = await getPlan(id);
  return { title: plan?.title ?? "Plan" };
}

function asText(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  return JSON.stringify(v, null, 2);
}

export default async function PlanDetailPage({ params }: Props) {
  const { id } = await params;
  const plan = await getPlan(id);
  if (!plan) notFound();

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          <Link href="/plans" className="hover:text-ink">
            Plans
          </Link>{" "}
          / {plan.id}
        </p>
        <h1 className="font-display text-3xl text-ink sm:text-4xl">
          {plan.title}
        </h1>
        <p className="text-base text-studio">{plan.one_liner}</p>
        <p className="font-mono text-[10px] text-faint">
          Idea:{" "}
          <Link href={`/ideas/${plan.idea_id}`} className="text-accent">
            {plan.idea_id}
          </Link>
        </p>
      </header>

      <Disclaimer />

      {plan.why_agent_runnable && (
        <section className="space-y-2">
          <h2 className="font-display text-xl text-ink">Why agent-runnable</h2>
          <p className="text-sm text-studio">{plan.why_agent_runnable}</p>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="font-display text-xl text-ink">Ops steps</h2>
        <ol className="space-y-3">
          {(plan.ops_steps || []).map((s) => (
            <li key={s.n} className="card px-4 py-3">
              <p className="font-mono text-[10px] uppercase text-faint">
                Step {s.n} · {s.owner}
                {s.human_required ? " · human required" : ""}
              </p>
              <h3 className="mt-1 font-medium text-ink">{s.title}</h3>
              <p className="mt-1 text-sm text-studio">{s.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      {(plan.human_only_checkpoints?.length ?? 0) > 0 && (
        <section className="space-y-2">
          <h2 className="font-display text-xl text-ink">Human-only checkpoints</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-studio">
            {plan.human_only_checkpoints!.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      )}

      {plan.hiring_and_pay_flow && (
        <section className="space-y-2">
          <h2 className="font-display text-xl text-ink">Hiring & pay flow</h2>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded border border-hairline bg-ghost p-3 font-mono text-xs text-studio">
            {asText(plan.hiring_and_pay_flow)}
          </pre>
        </section>
      )}

      {plan.unit_economics_sketch && (
        <section className="space-y-2">
          <h2 className="font-display text-xl text-ink">Unit economics (sketch)</h2>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded border border-hairline bg-ghost p-3 font-mono text-xs text-studio">
            {asText(plan.unit_economics_sketch)}
          </pre>
        </section>
      )}

      {(plan.first_7_day_agent_sprint?.length ?? 0) > 0 && (
        <section className="space-y-2">
          <h2 className="font-display text-xl text-ink">First 7-day agent sprint</h2>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-studio">
            {plan.first_7_day_agent_sprint!.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ol>
        </section>
      )}

      {(plan.kill_criteria?.length ?? 0) > 0 && (
        <section className="space-y-2">
          <h2 className="font-display text-xl text-ink">Kill criteria</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-studio">
            {plan.kill_criteria!.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </section>
      )}

      {plan.orchestration_graph_id && (
        <p className="text-sm">
          <Link
            href={`/graphs/${plan.orchestration_graph_id}`}
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent"
          >
            Open orchestration graph →
          </Link>
        </p>
      )}

      <p className="text-xs text-faint">{plan.disclaimer}</p>
    </article>
  );
}
