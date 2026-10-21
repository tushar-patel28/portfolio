import { content } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Contact() {
  const { profile, contact } = content;
  const socials = profile.socials.filter((s) => s.href.startsWith("http"));

  return (
    <Section id="contact" title="Contact">
      <Reveal className="max-w-2xl">
        <p className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          {contact.heading}
        </p>
        <p className="mt-6 text-lg leading-relaxed text-pretty text-muted">{contact.blurb}</p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href={`mailto:${profile.email}`}>
            <Icon name="mail" size={16} />
            {profile.email}
          </Button>
          {socials.map((social) => (
            <Button
              key={social.href}
              variant="secondary"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name={social.icon} size={16} />
              {social.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </Button>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
