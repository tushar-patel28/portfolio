import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** The site's single content width. Navbar, sections and footer all use it. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-5xl px-6", className)}>{children}</div>;
}
