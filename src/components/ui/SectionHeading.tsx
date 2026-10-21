import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  id?: string;
  /** Rendered as a zero-padded mono label, e.g. 2 → "02". */
  number?: number;
  title: string;
}

export function SectionHeading({ id, number, title }: SectionHeadingProps) {
  return (
    <Reveal>
      <h2 id={id} className="mb-12 flex items-baseline gap-4 text-2xl font-semibold tracking-tight sm:text-3xl">
        {number !== undefined && (
          <span className="font-mono text-sm font-normal text-accent">
            {String(number).padStart(2, "0")}
          </span>
        )}
        {title}
        <span aria-hidden="true" className="h-px flex-1 translate-y-[-0.35em] bg-border" />
      </h2>
    </Reveal>
  );
}
