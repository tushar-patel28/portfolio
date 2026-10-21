import { content } from "@/data/content";
import { Card } from "@/components/ui/Card";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";

const iconLink =
  "rounded-md p-1.5 text-muted transition-colors hover:bg-background hover:text-foreground";

export function Projects() {
  // Featured projects first, otherwise keep the order from content.ts.
  const projects = [...content.projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );

  return (
    <Section id="projects" title="Projects">
      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <li key={project.title}>
            <Reveal delay={(i % 2) * 0.08} className="h-full">
              <Card as="article" interactive className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {project.featured && (
                      <p className="mb-2 font-mono text-xs text-accent">Featured</p>
                    )}
                    <h3 className="text-lg font-medium">{project.title}</h3>
                  </div>
                  <div className="-mt-1 -mr-1.5 flex shrink-0 items-center">
                    {project.repo && (
                      <ExternalLink
                        href={project.repo}
                        showIcon={false}
                        aria-label={`${project.title} source code (opens in a new tab)`}
                        className={iconLink}
                      >
                        <Icon name="github" size={18} />
                      </ExternalLink>
                    )}
                    {project.live && (
                      <ExternalLink
                        href={project.live}
                        showIcon={false}
                        aria-label={`${project.title} live demo (opens in a new tab)`}
                        className={iconLink}
                      >
                        <Icon name="external" size={18} />
                      </ExternalLink>
                    )}
                  </div>
                </div>
                <p className="mt-3 flex-1 leading-relaxed text-pretty text-muted">
                  {project.description}
                </p>
                <div className="mt-6">
                  <TagList items={project.tech} label={`Technologies used in ${project.title}`} />
                </div>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
