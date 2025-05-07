'use client';

import { useState, useEffect, useRef } from 'react';
import wikiData from './_wiki-data.json';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useHash } from '@/hooks/useHash';

export default function Wiki({ children }: { children: React.ReactNode }) {
  // State for mobile sidebar visibility
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  const hash = useHash();

  const isActiveRoute = (route: string) => {
    return pathname.includes('/wiki/' + route);
  };

  const isActiveHash = (cHash: string) => {
    if (!hash) return false;
    return hash.includes(cHash);
  };

  return (
    <main className="container mx-auto py-6 px-4 md:py-12">
      {/* Mobile sidebar toggle button */}
      <button
        className="md:hidden fixed bottom-4 right-4 z-50 bg-[var(--accent)] text-white rounded-full p-4 shadow-lg"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}>
        {isMobileSidebarOpen ? (
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

      <div className="flex flex-col md:flex-row">
        {/* Sidebar for navigation - fixed on mobile when open, always visible on desktop */}
        <aside
          className={`
          ${isMobileSidebarOpen ? 'fixed inset-0 z-40 bg-black/95 overflow-y-auto pb-20' : 'hidden'}
          md:block md:sticky md:top-24 md:h-[calc(100vh-6rem)] md:w-64 md:flex-shrink-0 md:overflow-y-auto md:pr-4
        `}>
          <nav className="p-4 md:p-0">
            <h2 className="text-xl font-bold mb-4">Wiki Contents</h2>

            {wikiData
              .sort((pageA, pageB) => pageB.index - pageA.index)
              .map((page) => (
                <div key={page.slug} className="mb-4">
                  <Link
                    href={page.slug}
                    className={`${
                      isActiveRoute(page.slug) ? 'text-[var(--accent)]' : 'text-gray-300'
                    } hover:text-white font-semibold text-left  w-full`}>
                    {page.title}
                  </Link>
                  {/* subsections */}
                  <ul className="ml-4 mt-1 space-y-1">
                    {page.sections.map((subsection) => (
                      <li key={subsection.id}>
                        <Link
                          href={`/wiki/${page.slug}#${subsection.id}`}
                          className={`${
                            isActiveHash(subsection.id) ? 'text-[var(--accent)]/60' : 'text-gray-500'
                          }  hover:text-white text-left`}>
                          {subsection.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </nav>
        </aside>

        {/* Main content area */}
        <div className="md:flex-grow md:max-w-4xl">
          {/* Land Protection Section */}
          <section>
            <div className="card p-6 rounded-lg prose prose-invert prose-code:before:content-none prose-code:after:content-none prose-code:bg-white/10 prose-code:p-1 prose-code:rounded !max-w-none prose-headings:mt-4">
              {children}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
