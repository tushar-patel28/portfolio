import { ChevronRight } from "lucide-react";
import type { Project } from "@/data/content";
import { Card } from "@/components/ui/Card";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Icon } from "@/components/ui/icons";
import { TagList } from "@/components/ui/Tag";

const iconLink =
  "rounded-md p-1.5 text-muted transition-colors hover:bg-background hover:text-foreground";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card as="article" interactive className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="mb-2 font-mono text-xs text-muted">
            {project.category}
            {project.featured && <span className="text-accent"> · Featured</span>}
          </p>
          <h3 className="text-lg leading-snug font-medium text-balance">{project.title}</h3>
        </div>
        {/* Links render only when present in content.ts */}
        {(project.repo || project.live) && (
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
        )}
      </div>

      <p className="mt-3 leading-relaxed text-pretty text-muted">{project.description}</p>

      <p className="mt-4 border-l-2 border-accent pl-3 text-sm font-medium text-pretty">
        {project.metric}
      </p>

      {/* Spacer keeps tags aligned to the bottom of equal-height cards */}
      <div className="flex-1" />

      {project.details && project.details.length > 0 && (
        <details className="group mt-5">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded font-mono text-xs text-muted transition-colors select-none hover:text-foreground [&::-webkit-details-marker]:hidden">
            <ChevronRight
              size={14}
              aria-hidden="true"
              className="transition-transform group-open:rotate-90 motion-reduce:transition-none"
            />
            How it&apos;s built
          </summary>
          <ul className="mt-3 space-y-1.5 text-sm text-muted">
            {project.details.map((d) => (
              <li key={d} className="flex min-w-0 gap-2.5">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-2 shrink-0 bg-border" />
                <span className="min-w-0 text-pretty">{d}</span>
              </li>
            ))}
          </ul>
        </details>
      )}

      <div className="mt-5">
        <TagList items={project.tech} label={`Technologies used in ${project.title}`} />
      </div>
    </Card>
  );
}
