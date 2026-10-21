import { content } from "@/data/content";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="relative space-y-12 border-l border-border pl-8">
        {content.experience.map((job, i) => (
          <li key={job.company + job.start} className="relative">
            <span className="absolute top-2 -left-[37px] size-2.5 rounded-full border-2 border-accent bg-background" />
            <Reveal delay={i * 0.05}>
              <p className="font-mono text-xs text-muted">
                {job.start} — {job.end}
                {job.location && ` · ${job.location}`}
              </p>
              <h3 className="mt-1 text-lg font-medium">
                {job.role}{" "}
                <span className="text-accent">
                  @{" "}
                  {job.url ? (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 hover:underline"
                    >
                      {job.company}
                      <Icon name="external" size={14} />
                    </a>
                  ) : (
                    job.company
                  )}
                </span>
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted marker:text-border">
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              {job.tech && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              )}
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
