import { content } from "@/data/content";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-4">
        {content.experience.map((job, i) => (
          <li key={job.company + job.start}>
            <Reveal delay={i * 0.05}>
              {/* Date column on desktop, stacked above the role on mobile */}
              <div className="grid gap-x-10 gap-y-2 border-t border-border pt-8 pb-6 md:grid-cols-[10rem_1fr]">
                <p className="font-mono text-xs text-muted md:pt-1.5">
                  {job.start} – {job.end}
                </p>
                <div>
                  <h3 className="text-lg font-medium">
                    {job.role}
                    <span className="text-muted"> · </span>
                    {job.url ? (
                      <ExternalLink
                        href={job.url}
                        className="text-foreground transition-colors hover:text-accent"
                      >
                        {job.company}
                      </ExternalLink>
                    ) : (
                      <span>{job.company}</span>
                    )}
                  </h3>
                  {job.location && <p className="mt-1 text-sm text-muted">{job.location}</p>}
                  {job.summary && (
                    <p className="mt-3 text-sm text-pretty text-foreground/90">{job.summary}</p>
                  )}
                  <ul className="mt-4 space-y-2 text-muted">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex min-w-0 gap-3 leading-relaxed">
                        <span aria-hidden="true" className="mt-[0.8em] h-px w-3 shrink-0 bg-accent" />
                        <span className="min-w-0 text-pretty">{h}</span>
                      </li>
                    ))}
                  </ul>
                  {job.tech && (
                    <div className="mt-5">
                      <TagList items={job.tech} label={`Technologies used at ${job.company}`} />
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
