import { content } from "@/data/content";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function About() {
  const { profile, education } = content;

  return (
    <Section id="about" title="About">
      <div className="grid gap-10 md:grid-cols-[3fr_2fr] md:gap-16">
        <Reveal className="space-y-5 text-lg leading-relaxed text-pretty text-muted">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <Card>
            <h3 className="mb-5 font-mono text-xs tracking-wider text-muted uppercase">Education</h3>
            <ul className="space-y-6">
              {education.map((edu) => (
                <li key={edu.school + edu.degree}>
                  <p className="font-medium">{edu.school}</p>
                  <p className="mt-0.5 text-sm text-muted">{edu.degree}</p>
                  <p className="mt-2 font-mono text-xs text-muted">
                    {edu.start} – {edu.end}
                  </p>
                  {edu.details && (
                    <ul className="mt-3 space-y-1 text-sm text-muted">
                      {edu.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
