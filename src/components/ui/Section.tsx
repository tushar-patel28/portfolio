import type { ReactNode } from "react";
import { content } from "@/data/content";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

interface SectionProps {
  /** Anchor id; must match an href in content.nav. */
  id: string;
  title: string;
  children: ReactNode;
}

/**
 * Standard page section: anchor, vertical rhythm, max width, numbered heading.
 * The number is the section's position in content.nav, so order stays in sync with the navbar.
 */
export function Section({ id, title, children }: SectionProps) {
  const index = content.nav.findIndex((item) => item.href === `#${id}`);

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id={`${id}-heading`}
          number={index >= 0 ? index + 1 : undefined}
          title={title}
        />
        {children}
      </Container>
    </section>
  );
}
