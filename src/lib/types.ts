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

export type OpsStep = {
  n: number;
  title: string;
  owner: string;
  detail: string;
  human_required: boolean;
};

export type Plan = {
  id: string;
  idea_id: string;
  title: string;
  one_liner: string;
  category_tags?: string[];
  why_agent_runnable?: string;
  ops_steps: OpsStep[];
  human_only_checkpoints?: string[];
  hiring_and_pay_flow?: Record<string, unknown> | string;
  orchestration_graph_id?: string;
  unit_economics_sketch?: Record<string, unknown> | string;
  first_7_day_agent_sprint?: string[];
  kill_criteria?: string[];
  source_citations?: Array<Record<string, unknown> | string>;
  disclaimer: string;
  status: string;
  updated_at: string;
};

export type GraphNode = {
  id: string;
  kind: string;
  label: string;
  model_or_tool?: string;
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
  description?: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  brandon_only_actions?: string[];
  updated_at: string;
};

export type Meta = {
  version?: string;
  updated_at?: string;
  count?: number;
  sources?: string[];
  fence?: string;
  gaps?: string[];
  [key: string]: unknown;
};
