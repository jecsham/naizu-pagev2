import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto py-12 px-4">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-[var(--accent)]">Welcome to Naizu SMP</h1>

        <p className="text-xl mb-8 max-w-2xl">
          Just another SMP server, but better. We focus on community, creativity, and fun in a survival multiplayer
          experience like no other.
        </p>

        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Play now!</h2>
          <div className="flex justify-center items-center gap-4">
            <div className="bg-[var(--secondary)] px-6 py-3 rounded-md border-2 border-dashed border-[var(--border)]">
              <code className="text-xl font-mono">play.naizu.net</code>
            </div>
          </div>
          <small className="text-gray-500 mt-2">1.21.+</small>
        </div>

        <div className="card max-w-4xl mb-12 text-left">
          <h2 className="text-2xl font-bold mb-4">About Our Server</h2>
          <p className="mb-4">
            Naizu SMP is a carefully curated survival experience with minimal plugins to enhance gameplay without
            breaking the vanilla feel. Our world is vast and waiting for you to explore.
          </p>
          <p className="mb-4">
            Our community prides itself on cooperation, respect, and building amazing creations together. Whether you're
            a builder, redstone engineer, or explorer, there's a place for you here.
          </p>
        </div>

        <div className="flex gap-6 flex-wrap justify-center">
          <a
            className="btn discord"
            href="https://discord.gg/your-discord-link"
            target="_blank"
            rel="noopener noreferrer">
            Join Our Discord
          </a>
          <Link href="/rules" className="btn">
            Server Rules
          </Link>
          <Link href="/wiki" className="btn">
            Server Wiki
          </Link>
        </div>
      </div>
    </main>
  );
}
