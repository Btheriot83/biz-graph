#!/usr/bin/env node
/**
 * Copy agent-first static files into public/ for Next.js static serving.
 * Run via prebuild / npm run sync-data / npm run dev.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const dataPub = join(pub, "data");

mkdirSync(dataPub, { recursive: true });

const copies = [
  ["llms.txt", "llms.txt"],
  ["schema.md", "schema.md"],
  ["docs/FENCE.md", "FENCE.md"],
  ["data/ideas.json", "data/ideas.json"],
  ["data/ideas.jsonl", "data/ideas.jsonl"],
  ["data/plans.json", "data/plans.json"],
  ["data/plans.jsonl", "data/plans.jsonl"],
  ["data/graphs.json", "data/graphs.json"],
  ["data/graphs.jsonl", "data/graphs.jsonl"],
];

for (const [src, dest] of copies) {
  const from = join(root, src);
  const to = join(pub, dest);
  if (!existsSync(from)) {
    console.warn(`[sync-public-data] skip missing: ${src}`);
    continue;
  }
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(from, to);
  console.log(`[sync-public-data] ${src} → public/${dest}`);
}

const robots = `# Biz Graph — allow agent surfaces
User-agent: *
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /schema.md
Allow: /FENCE.md
Allow: /data/
Allow: /robots.txt

Sitemap:
`;
writeFileSync(join(pub, "robots.txt"), robots);

const fence = existsSync(join(root, "docs/FENCE.md"))
  ? readFileSync(join(root, "docs/FENCE.md"), "utf8")
  : "";
const schema = existsSync(join(root, "schema.md"))
  ? readFileSync(join(root, "schema.md"), "utf8")
  : "";
const llms = existsSync(join(root, "llms.txt"))
  ? readFileSync(join(root, "llms.txt"), "utf8")
  : "";

const full = [
  "# Biz Graph — llms-full.txt",
  "",
  "> Concatenated fence + schema summary + agent how-to for offline agent ingest.",
  "",
  "---",
  "",
  "## Fence",
  "",
  fence.trim(),
  "",
  "---",
  "",
  "## Schema",
  "",
  schema.trim(),
  "",
  "---",
  "",
  "## Agent how-to (llms.txt)",
  "",
  llms.trim(),
  "",
].join("\n");

writeFileSync(join(pub, "llms-full.txt"), full);
console.log("[sync-public-data] wrote public/llms-full.txt + public/robots.txt");
console.log("[sync-public-data] done");
