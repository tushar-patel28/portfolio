import { content } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="divide-y divide-border border-y border-border">
        {content.skills.map((group, i) => (
          // Reveal's div is the dt/dd group wrapper, which <dl> allows.
          <Reveal
            key={group.category}
            delay={i * 0.05}
            className="grid gap-3 py-6 md:grid-cols-[10rem_1fr] md:gap-10"
          >
            <dt className="font-mono text-xs tracking-wider text-muted uppercase md:pt-1">
              {group.category}
            </dt>
            <dd>
              <TagList items={group.items} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
