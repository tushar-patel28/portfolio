import { content } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function About() {
  const { profile, education } = content;

  return (
    <Section id="about" title="About">
      <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
        <Reveal className="space-y-4 text-lg leading-relaxed text-muted">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Education</h3>
          <ul className="space-y-5">
            {education.map((edu) => (
              <li key={edu.school + edu.degree}>
                <p className="font-medium">{edu.school}</p>
                <p className="text-sm text-muted">{edu.degree}</p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {edu.start} — {edu.end}
                </p>
                {edu.details && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                    {edu.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
