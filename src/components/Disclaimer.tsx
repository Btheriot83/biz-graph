import { DISCLAIMER } from "@/lib/data";

export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`rounded border border-hairline bg-ghost px-3 py-2.5 text-xs leading-relaxed text-studio ${className}`}
    >
      {DISCLAIMER}
    </aside>
  );
}
