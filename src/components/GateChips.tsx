export function GateChips({ gates }: { gates: string[] }) {
  if (!gates?.length) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {gates.map((g) => (
        <li
          key={g}
          className="rounded border border-hairline bg-ghost px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-studio"
        >
          {g}
        </li>
      ))}
    </ul>
  );
}
