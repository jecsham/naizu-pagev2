export default function Rules() {
  return (
    <main className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Server Rules
        </h1>

        <div className="space-y-8">
          <div className="card">
            <h2 className="text-2xl font-bold mb-3 text-[var(--accent)]">Rule 1: Respect All Players</h2>
            <p>
              Treat all players with respect. No harassment, hate speech, or targeted griefing is allowed.
              We aim to maintain a friendly and welcoming community for everyone.
            </p>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-3 text-[var(--accent)]">Rule 2: No Cheating or Exploits</h2>
            <p>
              The use of hacks, cheats, or exploits that give an unfair advantage is strictly prohibited.
              This includes X-ray, speed hacks, duplication glitches, or any modification that alters core gameplay.
            </p>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-3 text-[var(--accent)]">Rule 3: Protect the Environment</h2>
            <p>
              While the game is about building and mining, please be considerate of the landscape.
              Clean up floating trees, avoid creating random 1x1 towers, and try to make your builds
              blend with the environment when possible.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
