import { content } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ProjectGrid } from "./projects/ProjectGrid";

export function Projects() {
  // Featured projects first, otherwise keep the order from content.ts.
  const projects = [...content.projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );

  return (
    <Section id="projects" title="Projects">
      <Reveal>
        <ProjectGrid projects={projects} />
      </Reveal>
    </Section>
  );
}
