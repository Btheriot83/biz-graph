import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-hairline">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Biz Graph · Btheriot83 · Public research only · No income guarantees
        </p>
        <nav className="flex gap-4 font-mono text-[10px] uppercase tracking-[0.12em]">
          <Link href="/about" className="hover:text-ink">
            About
          </Link>
          <Link href="/agents" className="hover:text-ink">
            Agents
          </Link>
          <a href="/llms.txt" className="hover:text-ink">
            llms.txt
          </a>
        </nav>
      </div>
    </footer>
  );
}
