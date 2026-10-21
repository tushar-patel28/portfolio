import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Inverted foreground/background keeps the accent reserved for small details.
  primary: "bg-foreground text-background hover:bg-foreground/85",
  secondary: "border border-border text-foreground hover:border-muted hover:bg-surface",
  ghost: "text-muted hover:bg-surface hover:text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3",
  md: "h-10 px-4",
  icon: "size-10",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type AsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; ref?: Ref<HTMLAnchorElement> };
type AsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; ref?: Ref<HTMLButtonElement> };

/**
 * Renders an <a> when given href, otherwise a <button>. Icon-only buttons need aria-label.
 * className is for layout (margins, md:hidden etc.); don't pass display or height utilities
 * that compete with the base classes — wrap the button instead.
 */
export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as Omit<AsLink, keyof BaseProps>)}>
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={classes}
      {...(rest as Omit<AsButton, keyof BaseProps>)}
    >
      {children}
    </button>
  );
}
