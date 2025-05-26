export function SuspenseFallback({className}: { className?: string }) {
  return (
    <div className={`flex items-center justify-center w-full h-full ${className}`}>
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--accent)]"></div>
    </div>
  );
}
