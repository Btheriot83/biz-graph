# Biz Graph

Agent-readable catalog of **executable business ideas** mined only from two public creators, plus agent-orchestrated plans and tool graphs.

**Owner:** Brandon Theriot (Biz Graph / Btheriot83)

**Fence:** Ideas come only from [@boringmarketer](https://x.com/boringmarketer) (The Boring Marketer) and [@mhp_guy](https://x.com/mhp_guy) (Chris Koerner). Public cites only. No income guarantees. Brandon approval gates for money / hire / pay / publish / send. See [`docs/FENCE.md`](./docs/FENCE.md).

## What this is

| Layer | What |
| --- | --- |
| **Ideas** | One executable business idea per row — harvested from the two allowed creators |
| **Plans** | Agent-orchestrated business plan for an idea (steps + human checkpoints) |
| **Graphs** | Orchestration map: human → chief agent → specialists / tools |

Target: **~250 quality ideas** (quality over volume). Do not invent ideas; every idea requires a public `source_url`.

## Work here only

All Biz Graph work lives under **`/workspace/biz-graph/`**. Do not touch other repos (AZMDR, flatter, Kalshi, Nearfar, Sports Edge, etc.).

## Surfaces (machine-readable)

| Path | Use |
| --- | --- |
| [`schema.md`](./schema.md) | Full field schemas + ID conventions + PATCH contract |
| [`llms.txt`](./llms.txt) | Agent how-to |
| [`docs/FENCE.md`](./docs/FENCE.md) | Non-negotiable fence |
| [`data/ideas.jsonl`](./data/ideas.jsonl) | Idea corpus (one JSON object per line) |
| [`data/ideas.json`](./data/ideas.json) | Same ideas + `meta` |
| [`data/plans.jsonl`](./data/plans.jsonl) | Plan corpus |
| [`data/plans.json`](./data/plans.json) | Same plans + `meta` |
| [`data/graphs.jsonl`](./data/graphs.jsonl) | Graph corpus |
| [`data/graphs.json`](./data/graphs.json) | Same graphs + `meta` |

Prefer streaming `*.jsonl` for large reads. Use `*.json` meta for counts.

## Finished look

Live **Vercel** site + **GitHub** repo under **Btheriot83**. Agents propose catalog updates; Brandon gates money, hire, pay, publish, and send.

## Status

**v0 seed:** 25 harvested ideas (all `@boringmarketer`), 1 draft plan + graph for AI Main Street services. `@mhp_guy` harvest in progress. Target ~250 quality ideas.
