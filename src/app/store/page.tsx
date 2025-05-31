import MinecraftLogin from '@/components/minecraft-login';
import { Suspense } from 'react';
import Products from '@/components/products';
import { SuspenseFallback } from '@/components/suspense-fallback';

export default function StorePage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-[var(--accent)]">Naizu SMP Store</h1>

        <p className="text-xl mb-8 max-w-2xl">
          Donating to Naizu SMP will help us cover server maintenance costs, improve performance, and develop new
          features for everyone to enjoy. Every contribution, no matter how small, makes a significant difference in
          keeping our community thriving.
        </p>

        <MinecraftLogin />
        <Suspense fallback={<SuspenseFallback />}>
          <div className="flex justify-center gap-8 mb-12 w-full max-w-6xl flex-wrap">
            <Products />
          </div>
        </Suspense>

        <div className="card max-w-4xl mb-12 text-left">
          <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">Get Support</h2>
          <p className="mb-4">
            If you had any issues with your purchase, please create a Naizu SMP support ticket on our Discord server. We
            are here to help you
          </p>
          <p className="mb-4"></p>
          <div className="flex justify-center mt-6">
            <a className="btn discord" href="http://discord.gg/naizu" target="_blank" rel="noopener noreferrer">
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
