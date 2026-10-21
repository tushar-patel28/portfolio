import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EnterProps {
  children: ReactNode;
  /** Seconds to wait before animating, for staggering siblings. */
  delay?: number;
  className?: string;
}

/**
 * CSS-only entrance (fade + small lift) for above-the-fold content. Unlike Reveal it plays on
 * first paint without waiting for JavaScript, so it doesn't delay Largest Contentful Paint.
 * Disabled under prefers-reduced-motion (globals.css).
 */
export function Enter({ children, delay = 0, className }: EnterProps) {
  return (
    <div className={cn("animate-enter", className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
