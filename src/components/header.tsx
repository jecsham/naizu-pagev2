import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-[var(--secondary)] py-4 px-6 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <div id="url" className="w-full">
          <Link href="/" className="text-2xl font-bold hover:text-[var(--accent)] transition-colors">
            Naizu
          </Link>
        </div>
        <nav className="w-full flex justify-center gap-6 items-center">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/rules" className="nav-link">
            Rules
          </Link>
          <Link href="/wiki" className="nav-link">
            Wiki
          </Link>
        </nav>
        <div className="w-full">
          {/* Play now IP section */}
          {/* <div className="flex items-center justify-end">
            <span className="text-sm text-gray-500">Play now! <br />1.21 </span>
            <div className="bg-gray-100 text-gray-800 rounded-md px-2 py-1 ml-2">
              <span className="text-sm font-bold">play.naizu.net</span>
            </div>
          </div> */}
        </div>
      </div>
    </header>
  );
}
