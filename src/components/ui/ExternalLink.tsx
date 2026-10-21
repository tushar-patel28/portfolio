import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface ExternalLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
  href: string;
  children: ReactNode;
  /** Show the ↗ icon after the text. Turn off for icon-only links (which need aria-label). */
  showIcon?: boolean;
}

/** Link to another site: new tab, safe rel, ↗ icon, and a screen-reader hint. */
export function ExternalLink({
  href,
  children,
  showIcon = true,
  className,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      {children}
      {showIcon && <ArrowUpRight aria-hidden="true" className="size-[1em] shrink-0" />}
      {!props["aria-label"] && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
