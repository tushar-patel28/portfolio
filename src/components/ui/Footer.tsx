import { content } from "@/data/content";
import { Icon } from "./icons";

export function Footer() {
  const { profile } = content;

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <ul className="flex items-center gap-5">
          {profile.socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={social.label}
                className="transition-colors hover:text-foreground"
              >
                <Icon name={social.icon} size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
