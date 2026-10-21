import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  /** Adds a hover lift + accent border, for cards that contain links. */
  interactive?: boolean;
  as?: "div" | "article" | "li";
  className?: string;
}

export function Card({ children, interactive = false, as: Tag = "div", className }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-xl border border-border bg-surface p-6",
        interactive &&
          "transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
