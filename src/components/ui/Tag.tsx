export function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}
