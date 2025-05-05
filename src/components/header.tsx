'use client';

import Link from 'next/link';
import { PlayNowHeader } from './play-now-header';
import { useState } from 'react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[var(--secondary)] py-4 px-6 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <div id="url">
          <Link href="/" className="text-2xl font-bold hover:text-[var(--accent)] transition-colors">
            Naizu
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu">
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex justify-center gap-6 items-center">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/rules" className="nav-link">
            Rules
          </Link>
          <Link href="/wiki" className="nav-link">
            Wiki
          </Link>
          <PlayNowHeader />
        </nav>
      </div>

      {/* Mobile menu (expandable) */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-2">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="nav-link block py-2">
              Home
            </Link>
            <Link href="/rules" className="nav-link block py-2">
              Rules
            </Link>
            <Link href="/wiki" className="nav-link block py-2">
              Wiki
            </Link>
            <div className="pt-2 border-t border-gray-700">
              <PlayNowHeader />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
