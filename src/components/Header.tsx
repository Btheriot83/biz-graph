import Link from "next/link";

const NAV = [
  { href: "/", label: "Overview" },
  { href: "/ideas", label: "Ideas" },
  { href: "/plans", label: "Plans" },
  { href: "/graphs", label: "Graphs" },
  { href: "/about", label: "About" },
  { href: "/agents", label: "Agents" },
];

export function Header() {
  return (
    <header className="border-b border-hairline bg-paper">
      <div className="mx-auto flex max-w-5xl items-baseline justify-between gap-6 px-4 py-5 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-[1.35rem] leading-none tracking-tight text-ink sm:text-[1.5rem]">
            Biz Graph
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            v0 catalog
          </span>
        </Link>
        <nav className="flex flex-wrap justify-end gap-x-4 gap-y-2 text-[11px] font-medium uppercase tracking-[0.12em] text-studio">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-transparent pb-0.5 transition-colors hover:border-ink hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
