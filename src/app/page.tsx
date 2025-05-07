'use client';
import { ReactTyped } from 'react-typed';
import { PlayNowHero } from '@/components/play-now-hero';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto py-12 px-4">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-[var(--accent)]">Naizu SMP</h1>
        <div className="flex items-center justify-center pb-28 pt-24 w-full max-w-4xl">
          <div className="w-full md:px-10">
            <ReactTyped
              className="text-4xl font-bold"
              strings={[
                'A chill SMP to play with friends.',
                'Survival. Friends. No drama.',
                'Just Minecraft, with good company.',
                'Vanilla SMP. Nothing more, nothing less.',
                'Play. Build. Relax.',
                'Plugins only where needed.',
                'Tickrate matters.',
                'No pay-to-win. Ever.',
              ]}
              typeSpeed={30}
              backSpeed={10}
              shuffle
              backDelay={3000}
              loop
            />
          </div>
          <div className="px-10">
            <PlayNowHero />
          </div>
        </div>

        <div className="card max-w-4xl mb-12 text-left">
          <div className="prose prose-invert !max-w-none">
            <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">About Our Server</h2>
            <p className="mb-4">
              Naizu SMP is a carefully curated survival experience with minimal plugins to enhance gameplay without
              breaking the vanilla feel.
            </p>

            <p className="mb-4">
              We focus on creating a friendly and welcoming community for players who just want to enjoy Minecraft —
              whether you're here to build a quiet base, automate your farms, or fine-tune redstone.
            </p>

            <p className="mb-4">
              Take a look at our <Link href="/wiki/overview">wiki</Link> for more information about the server,
              including rules, commands, and other useful information.
            </p>
          </div>

          <div className="flex justify-center">
            <Link href="/wiki" className="btn">
              Wiki
            </Link>
          </div>
        </div>

        <div className="card max-w-4xl mb-12 text-left">
          <div className="prose prose-invert !max-w-none">
            <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">Server Rules</h2>
            <p className="mb-4">
              These rules are designed to ensure a fun and fair experience for all players. By joining the server, you
              agree to follow these guidelines.
            </p>
          </div>

          <div className="flex justify-center">
            <Link href="/rules" className="btn">
              Server Rules
            </Link>
          </div>
        </div>

        <div className="card max-w-4xl mb-12 text-left">
          <div className="prose prose-invert !max-w-none">
            <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">Join Our Discord!</h2>
            <p className="mb-4">
              Join our Discord server to stay updated on server news, events, and community discussions. We also have a
              dedicated support channel for any questions or issues you may have.
            </p>
          </div>

          <div className="flex justify-center">
            <a className="btn discord" href="https://discord.gg/DNpyAC2Bwn" target="_blank" rel="noopener noreferrer">
              Discord
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
