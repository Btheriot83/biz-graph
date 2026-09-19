# Biz Graph — catalog schema (v0)

**Fence:** Ideas only from `@boringmarketer` (The Boring Marketer) and `@mhp_guy` (Chris Koerner). Public cites required. No income guarantees. Brandon approval for money / hire / pay / publish / send. See [`docs/FENCE.md`](./docs/FENCE.md). Agent how-to: [`llms.txt`](./llms.txt).

Machine-readable paths live under [`data/`](./data/).

---

## 1. File inventory

| Path | Shape | Purpose |
| --- | --- | --- |
| `data/ideas.jsonl` | one idea object per line | Idea corpus |
| `data/ideas.json` | `{ meta, ideas[] }` | Same + aggregate counts |
| `data/plans.jsonl` | one plan per line | Agent-orchestrated plans |
| `data/plans.json` | `{ meta, plans[] }` | Same + meta |
| `data/graphs.jsonl` | one graph per line | Orchestration graphs |
| `data/graphs.json` | `{ meta, graphs[] }` | Same + meta |

---

## 2. Ideas (`data/ideas.jsonl` / `ideas.json`)

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | string | yes | `idea-{source}-{slug}-{nnn}` |
| `title` | string | yes | Concrete executable business |
| `one_liner` | string | yes | One sentence wedge |
| `source_handle` | string | yes | `boringmarketer` \| `mhp_guy` |
| `source_url` | string | yes | Public X or (if X thin) their YouTube URL |
| `source_date` | string \| null | | `YYYY-MM-DD` when known |
| `evidence_quote` | string | yes | Short paraphrase / public quote |
| `category` | string[] | yes | e.g. `local_services`, `ai_agency`, `arbitrage` |
| `why_it_works` | string | yes | Mechanism from source — no invented traction |
| `agent_runnable` | bool | yes | Can agents do most ops with Brandon gates? |
| `human_gates` | string[] | yes | Subset of `money\|hire\|pay\|publish\|send\|identity\|banking\|legal\|physical` |
| `status` | string | yes | `harvested\|researched\|planned\|archived` |
| `collected_at` | string | yes | ISO-8601 America/Phoenix |
| `notes` | string | | Optional harvest notes |

### Idea ID convention
`idea-{source}-{kebab-slug}-{3-digit}` — stable; append, don’t renumber.  
Examples: `idea-boringmarketer-commercial-hvac-service-010`, `idea-mhp_guy-rv-rental-fleet-001`.

---

## 3. Plans (`data/plans.jsonl` / `plans.json`)

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | string | yes | `plan-{idea_id}` |
| `idea_id` | string | yes | FK to idea |
| `summary` | string | yes | Agent-runnable plan summary |
| `steps` | object[] | yes | `{ n, title, owner, detail, human_required }` |
| `human_checkpoints` | string[] | yes | Explicit Brandon touchpoints |
| `tool_graph_id` | string | yes | FK to graph |
| `approval_gates` | string[] | yes | Same enum as human_gates |
| `disclaimer` | string | yes | Must include no-income-guarantee language |
| `status` | string | yes | `draft\|ready\|active\|archived` |
| `updated_at` | string | yes | ISO-8601 |

---

## 4. Graphs (`data/graphs.jsonl` / `graphs.json`)

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | string | yes | `graph-{plan_id}` |
| `plan_id` | string | yes | FK to plan |
| `nodes` | object[] | yes | `{ id, role, model_or_tool, responsibility }` |
| `edges` | object[] | yes | `{ from, to, label }` |
| `brandon_only_actions` | string[] | yes | Actions agents must never auto-execute |
| `updated_at` | string | yes | ISO-8601 |

Typical roles: `brandon` (human steerer), `chief`, `research`, `ops`, `marketing`, `finance_draft`, `coding`, `computer_use`.

---

## 5. Meta envelope (`*.json`)

```json
{
  "meta": {
    "version": "0",
    "updated_at": "ISO-8601",
    "count": 0,
    "sources": ["boringmarketer", "mhp_guy"],
    "fence": "public cites only; no income guarantees; Brandon gates money/hire/pay/publish/send",
    "gaps": []
  }
}
```

---

## 6. Agent update contract (PATCH)

1. Append-only preferred for `*.jsonl` (new IDs). Never renumber existing IDs.
2. Every new idea MUST include `source_url` pointing at `@boringmarketer` or `@mhp_guy` public content.
3. Propose patches under `data/proposals/` as JSON: `{ "ops": [ { "op": "add", "path": "/ideas/-", "value": {…} } ], "evidence_urls": [] }`.
4. Do not invent quotes, dates, or revenue claims.
5. After accepted adds: append jsonl, regenerate companion `*.json` with updated `meta.count`.
