export function Footer() {
  return (
    <footer className="bg-[var(--secondary)] py-8 px-6 mt-auto">
      <div className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1 - About and Privacy */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-3">Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-gray-300 transition">About</a></li>
              <li><a href="/privacy" className="hover:text-gray-300 transition">Privacy</a></li>
            </ul>
          </div>

          {/* Column 2 - Discord */}
          <div className="flex flex-col items-center">
            <h3 className="font-semibold mb-3">Community</h3>
            <a
              href="https://discord.gg/naizu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gray-300 transition"
            >
              Join our Discord
            </a>
          </div>

          {/* Column 3 - Copyright and Email */}
          <div className="flex flex-col items-center md:items-end">
            <p className="mb-2">Copyright © 2020 - {new Date().getFullYear()}</p>
            <p className="text-sm">Not affiliated with Mojang Studios</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
