import { content } from "@/data/content";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Contact() {
  const { profile, contact } = content;

  return (
    <Section id="contact" title="Contact">
      <Reveal className="max-w-xl">
        <p className="text-3xl font-semibold tracking-tight sm:text-4xl">{contact.heading}</p>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {contact.blurb}
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
        >
          <Icon name="mail" size={16} />
          {profile.email}
        </a>
      </Reveal>
    </Section>
  );
}
