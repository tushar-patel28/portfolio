import { content } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {content.skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.06}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">
              {group.category}
            </h3>
            <ul className="space-y-1.5 text-muted">
              {group.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
