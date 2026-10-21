"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Client-side providers. "user" disables transform animations for prefers-reduced-motion. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
