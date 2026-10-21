import { ArrowRight } from "lucide-react";
import { content } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/icons";
import { Enter } from "@/components/ui/Enter";
import { assetPath } from "@/lib/paths";

export function Hero() {
  const { profile } = content;

  return (
    <section id="top" aria-label="Introduction" className="flex min-h-[calc(100svh-4rem)] items-center py-20">
      <Container>
        <div className="max-w-3xl">
          <Enter>
            <p className="mb-6 font-mono text-sm text-accent">{profile.greeting}</p>
          </Enter>
          <Enter delay={0.08}>
            <h1 className="text-5xl font-semibold tracking-tighter text-balance sm:text-7xl">
              {profile.name}
            </h1>
          </Enter>
          <Enter delay={0.16}>
            <p className="mt-5 max-w-2xl text-xl leading-snug font-medium tracking-tight text-pretty text-muted sm:text-2xl">
              {profile.tagline}
            </p>
          </Enter>
          <Enter delay={0.24}>
            <ul className="mt-8 space-y-2.5 font-mono text-xs leading-relaxed text-muted">
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="mt-[0.45em] size-2 shrink-0 rounded-full bg-accent" />
                <span className="text-pretty">{profile.status}</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="location" size={14} className="shrink-0" />
                {profile.location}
              </li>
            </ul>
          </Enter>

          <Enter delay={0.32}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="#projects">
                View my work
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button variant="secondary" href={assetPath(profile.resume)} download>
                <Icon name="download" size={16} />
                Download resume
              </Button>
              <ul className="flex items-center gap-1 sm:ml-2">
                {profile.socials.map((social) => {
                  const external = social.href.startsWith("http");
                  return (
                    <li key={social.href}>
                      <Button
                        variant="ghost"
                        size="icon"
                        href={social.href}
                        aria-label={external ? `${social.label} (opens in a new tab)` : social.label}
                        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        <Icon name={social.icon} size={18} />
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Enter>
        </div>
      </Container>
    </section>
  );
}
