'use client';

import { copyIp } from '@/utils/copy-ip';
import { useEffect, useState } from 'react';

export const PlayNowHeader = () => {
  const [textCopied, setTextCopied] = useState(false);

  const handleCopyClick = async () => {
    const copy = await copyIp();
    if (copy) {
      setTextCopied(true);
    } else {
      setTextCopied(false);
    }
  };

  useEffect(() => {
    if (textCopied) {
      const timer = setTimeout(() => {
        setTextCopied(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [textCopied]);

  return (
    <div className="w-fit bg-[var(--secondary)] py-1 px-2 md:px-3 rounded-md border-1 border-dashed border-[var(--border)] flex items-center">
      <code className="text-xs md:text-sm font-mono">play.naizu.net</code>
      <button
        className="ml-1 md:ml-3 p-1 md:p-1.5 rounded-md hover:bg-[var(--accent)]/20 transition-colors"
        onClick={handleCopyClick}
        title="Copy IP address">
        {textCopied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 md:h-5 md:w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 md:h-5 md:w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <rect x="9" y="9" width="11" height="11" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
        )}
      </button>
    </div>
  );
};
