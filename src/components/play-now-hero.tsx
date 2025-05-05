'use client';

import { copyIp } from '@/utils/copy-ip';
import { useEffect, useState } from 'react';

export const PlayNowHero = () => {
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
    <div className="flex flex-col items-center mb-8">
      <h2 className="text-2xl font-bold mb-2">Play now!</h2>
      <div className="flex justify-center items-center gap-4">
        <div className="bg-[var(--secondary)] px-6 py-3 rounded-md border-2 border-dashed border-[var(--border)] flex items-center">
          <code className="text-xl font-mono">play.naizu.net</code>
          <button
            className="ml-3 p-1.5 rounded-md hover:bg-[var(--accent)]/20 transition-colors"
            onClick={handleCopyClick}
            title="Copy IP address">
            {textCopied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
                className="h-5 w-5"
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
      </div>
      <small className="text-gray-500 mt-2">1.21.+</small>
    </div>
  );
};
