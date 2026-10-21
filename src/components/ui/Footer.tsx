import { content } from "@/data/content";
import { Button } from "./Button";
import { Container } from "./Container";
import { ExternalLink } from "./ExternalLink";
import { Icon } from "./icons";

export function Footer() {
  const { profile } = content;

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col-reverse items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name} · Built with{" "}
          <ExternalLink
            href="https://nextjs.org"
            showIcon={false}
            className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-accent"
          >
            Next.js
          </ExternalLink>
        </p>

        <ul className="flex items-center gap-1">
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
      </Container>
    </footer>
  );
}
