import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionProps {
  /** Anchor id; must match an href in content.nav. */
  id: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-20 sm:py-24">
      <Reveal>
        <h2 className="mb-10 flex items-center gap-4 text-sm font-semibold uppercase tracking-widest text-accent">
          {title}
          <span className="h-px flex-1 bg-border" />
        </h2>
      </Reveal>
      {children}
    </section>
  );
}
