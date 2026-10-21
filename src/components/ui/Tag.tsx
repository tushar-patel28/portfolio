export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

export function TagList({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
