export function Footer() {
  return (
    <footer className="bg-[var(--secondary)] py-4 px-6 mt-auto">
      <div className="container mx-auto text-center">
        <p>Copyright © {new Date().getFullYear()}.</p>
      </div>
    </footer>
  );
}
