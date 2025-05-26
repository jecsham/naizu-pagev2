'use client';

import Link from 'next/link';
import { PlayNowHeader } from './play-now-header';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isActiveRoute = (route: string) => {
    if (route === '' && pathname === '/') {
      return true;
    } else if (route !== '') {
      return pathname.includes(`/${route}`);
    }
    return false;
  };

  // Control menu height for animations
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        const height = mobileMenuRef.current.scrollHeight;
        mobileMenuRef.current.style.maxHeight = `${height}px`;
      } else {
        mobileMenuRef.current.style.maxHeight = '0px';
      }
    }
  }, [isMobileMenuOpen]);

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
              className="h-6 w-6 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex justify-center gap-6 items-center">
          <Link
            href="/"
            className={`${
              isActiveRoute('') ? 'bg-[var(--primary)] px-4 py-1 rounded-md' : ''
            } nav-link transition-all duration-300 ease-in-out`}>
            Home
          </Link>
          {/* <Link
            href="/rules"
            className={`${
              isActiveRoute('rules') ? 'bg-[var(--primary)] px-4 py-1 rounded-md' : ''
            } nav-link transition-all duration-300 ease-in-out`}>
            Rules
          </Link> */}
          <Link
            href="/wiki"
            className={`${
              isActiveRoute('wiki') ? 'bg-[var(--primary)] px-4 py-1 rounded-md' : ''
            } nav-link transition-all duration-300 ease-in-out`}>
            Wiki
          </Link>
          <Link
            href="/store"
            className={`${
              isActiveRoute('store') ? 'bg-[var(--primary)] px-4 py-1 rounded-md' : ''
            } nav-link transition-all duration-300 ease-in-out`}>
            Store
          </Link>
          <PlayNowHeader />
        </nav>
      </div>

      {/* Mobile menu (expandable) with animation */}
      <div
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: '0px' }}
      >
        <div className="mt-4 pb-2">
          <nav className="flex flex-col space-y-4 opacity-100 transform transition-opacity duration-300">
            <Link
              href="/"
              className={`${
                isActiveRoute('') ? 'bg-[var(--primary)] px-4 py-1 rounded-md' : ''
              } nav-link transition-all duration-300 ease-in-out`}>
              Home
            </Link>
            <Link
              href="/store"
              className={`${
                isActiveRoute('store') ? 'bg-[var(--primary)] px-4 py-1 rounded-md' : ''
              } nav-link transition-all duration-300 ease-in-out`}>
              Store
            </Link>
            <Link
              href="/wiki"
              className={`${
                isActiveRoute('wiki') ? 'bg-[var(--primary)] px-4 py-1 rounded-md' : ''
              } nav-link transition-all duration-300 ease-in-out`}>
              Wiki
            </Link>
            <Link
              href="/store"
              className={`${
                isActiveRoute('store') ? 'bg-[var(--primary)] px-4 py-1 rounded-md' : ''
              } nav-link transition-all duration-300 ease-in-out`}>
              Store
            </Link>
            <div className="pt-2 border-t border-gray-700">
              <PlayNowHeader />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
