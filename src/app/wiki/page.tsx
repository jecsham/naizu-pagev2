export default function Wiki() {
  return (
    <main className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">
          Naizu SMP Wiki
        </h1>

        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
          <p className="text-lg mb-4">
            Our wiki is currently under construction. We are working hard to create
            comprehensive guides and information about our server.
          </p>
          <p>
            Check back soon for information about:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-left max-w-md mx-auto">
            <li>Server features and plugins</li>
            <li>Economy system</li>
            <li>Player guides and tutorials</li>
            <li>Community projects</li>
            <li>Server events</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
