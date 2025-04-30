import Link from "next/link";

export function Header() {
  return (
    <header className="bg-[var(--secondary)] py-4 px-6 sticky top-0 z-10">
      <div className="container flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-[var(--accent)] transition-colors">
          Naizu SMP
        </Link>
        <nav className="flex gap-6">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/rules" className="nav-link">Rules</Link>
          <Link href="/wiki" className="nav-link">Wiki</Link>
        </nav>
        <div></div>
      </div>
    </header>
  );
}
