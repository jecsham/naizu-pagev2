import Link from 'next/link';
import Image from 'next/image';

export default function StorePage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-[var(--accent)]">Naizu SMP Store</h1>

        <p className="text-xl mb-8 max-w-2xl">
          Support our server and enhance your gameplay experience with these special packages.
          Donating will help us maintain the server and continue providing a great experience for everyone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 w-full max-w-6xl">
          {/* VIP Package */}
          <div className="card flex flex-col h-full">
            <div className="bg-gradient-to-r from-amber-500 to-yellow-400 p-1 rounded-t-xl">
              <h2 className="text-2xl font-bold py-2">VIP Package</h2>
            </div>
            <div className="flex-grow p-6 flex flex-col">
              <div className="mb-4 mx-auto">
                <Image src="/window.svg" alt="VIP Package Icon" width={80} height={80} className="opacity-80" />
              </div>
              <h3 className="text-3xl font-bold mb-2">$9.99</h3>
              <ul className="text-left mb-6 flex-grow">
                <li className="mb-2">✓ Exclusive VIP tag in chat</li>
                <li className="mb-2">✓ Access to special VIP areas</li>
                <li className="mb-2">✓ 2 additional home teleports</li>
                <li className="mb-2">✓ Colored name in chat</li>
                <li className="mb-2">✓ Monthly special item drop</li>
              </ul>
              <button className="btn w-full mt-auto">Purchase</button>
            </div>
          </div>

          {/* Premium Package */}
          <div className="card flex flex-col h-full">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-1 rounded-t-xl">
              <h2 className="text-2xl font-bold py-2">Premium Package</h2>
            </div>
            <div className="flex-grow p-6 flex flex-col">
              <div className="mb-4 mx-auto">
                <Image src="/globe.svg" alt="Premium Package Icon" width={80} height={80} className="opacity-80" />
              </div>
              <h3 className="text-3xl font-bold mb-2">$19.99</h3>
              <ul className="text-left mb-6 flex-grow">
                <li className="mb-2">✓ All VIP benefits</li>
                <li className="mb-2">✓ Access to premium commands</li>
                <li className="mb-2">✓ 5 additional home teleports</li>
                <li className="mb-2">✓ Custom particle effects</li>
                <li className="mb-2">✓ Priority server access</li>
                <li className="mb-2">✓ Weekly special item drops</li>
              </ul>
              <button className="btn w-full mt-auto">Purchase</button>
            </div>
          </div>

          {/* Ultimate Package */}
          <div className="card flex flex-col h-full">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-1 rounded-t-xl">
              <h2 className="text-2xl font-bold py-2">Ultimate Package</h2>
            </div>
            <div className="flex-grow p-6 flex flex-col">
              <div className="mb-4 mx-auto">
                <Image src="/file.svg" alt="Ultimate Package Icon" width={80} height={80} className="opacity-80" />
              </div>
              <h3 className="text-3xl font-bold mb-2">$29.99</h3>
              <ul className="text-left mb-6 flex-grow">
                <li className="mb-2">✓ All Premium benefits</li>
                <li className="mb-2">✓ Exclusive cosmetic items</li>
                <li className="mb-2">✓ 10 additional home teleports</li>
                <li className="mb-2">✓ Custom skin feature</li>
                <li className="mb-2">✓ Vote in server decisions</li>
                <li className="mb-2">✓ Daily special item drops</li>
                <li className="mb-2">✓ Private plot in VIP area</li>
              </ul>
              <button className="btn w-full mt-auto">Purchase</button>
            </div>
          </div>
        </div>

        <div className="card max-w-4xl mb-12 text-left">
          <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">Support Our Server</h2>
          <p className="mb-4">
            Donating to Naizu SMP will help us cover server maintenance costs, improve performance, and develop new features for everyone to enjoy. Every contribution, no matter how small, makes a significant difference in keeping our community thriving.
          </p>
          <p className="mb-4">
            As a token of our appreciation, donors receive special perks that enhance their gameplay without disrupting the balanced experience we've created. Your support enables us to maintain a lag-free environment and continue building the best SMP server possible.
          </p>
          <div className="flex justify-center mt-6">
            <button className="btn">Make a Custom Donation</button>
          </div>
        </div>

        <div className="flex gap-6 flex-wrap justify-center">
          <Link href="/" className="btn">
            Return to Home
          </Link>
          <a
            className="btn discord"
            href="https://discord.gg/your-discord-link"
            target="_blank"
            rel="noopener noreferrer">
            Join Our Discord
          </a>
        </div>
      </div>
    </main>
  );
}
