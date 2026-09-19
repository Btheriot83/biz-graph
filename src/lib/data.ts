import { readFile } from "fs/promises";
import path from "path";
import type { Graph, Idea, Meta, Plan } from "./types";

const publicData = path.join(process.cwd(), "public", "data");
const rootData = path.join(process.cwd(), "data");

async function readJson<T>(file: string): Promise<T> {
  const candidates = [path.join(publicData, file), path.join(rootData, file)];
  let lastErr: unknown;
  for (const p of candidates) {
    try {
      const raw = await readFile(p, "utf8");
      return JSON.parse(raw) as T;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

export async function getIdeas(): Promise<{ meta: Meta; ideas: Idea[] }> {
  return readJson("ideas.json");
}

export async function getIdea(id: string): Promise<Idea | undefined> {
  const { ideas } = await getIdeas();
  return ideas.find((i) => i.id === id);
}

export async function getPlans(): Promise<{ meta: Meta; plans: Plan[] }> {
  return readJson("plans.json");
}

export async function getPlan(id: string): Promise<Plan | undefined> {
  const { plans } = await getPlans();
  return plans.find((p) => p.id === id);
}

export async function getPlanForIdea(ideaId: string): Promise<Plan | undefined> {
  const { plans } = await getPlans();
  return plans.find((p) => p.idea_id === ideaId);
}

export async function getGraphs(): Promise<{ meta: Meta; graphs: Graph[] }> {
  return readJson("graphs.json");
}

export async function getGraph(id: string): Promise<Graph | undefined> {
  const { graphs } = await getGraphs();
  return graphs.find((g) => g.id === id);
}

export const DISCLAIMER =
  "Not financial, legal, or investment advice. No income guarantees. Past creator anecdotes do not predict results. Public research catalog only — Brandon gates money, hire, pay, publish, and send.";

export const FENCE_SHORT =
  "Ideas only from @boringmarketer and @mhp_guy. Public cites required. No income guarantees. Brandon approval for money / hire / pay / publish / send.";
