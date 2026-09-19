export type Idea = {
  id: string;
  title: string;
  one_liner: string;
  source_handle: string;
  source_url: string;
  source_date: string | null;
  evidence_quote: string;
  category: string[];
  why_it_works: string;
  agent_runnable: boolean;
  human_gates: string[];
  status: string;
  collected_at: string;
  notes?: string;
};

export type PlanStep = {
  n: number;
  title: string;
  owner: string;
  detail: string;
  human_required: boolean;
};

export type Plan = {
  id: string;
  idea_id: string;
  summary: string;
  steps: PlanStep[];
  human_checkpoints: string[];
  tool_graph_id: string;
  approval_gates: string[];
  disclaimer: string;
  status: string;
  updated_at: string;
};

export type GraphNode = {
  id: string;
  role: string;
  model_or_tool: string;
  responsibility: string;
};

export type GraphEdge = {
  from: string;
  to: string;
  label: string;
};

export type Graph = {
  id: string;
  plan_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  brandon_only_actions: string[];
  updated_at: string;
};

export type Meta = {
  version: string;
  updated_at: string;
  count: number;
  sources: string[];
  fence: string;
  gaps: string[];
};
