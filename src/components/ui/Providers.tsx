"use client";

import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Client-side providers.
 * - LazyMotion + domAnimation ships only the animation features we use; `strict` makes any
 *   accidental `motion.*` (full bundle) throw — use `m.*` components instead.
 * - reducedMotion="user" disables transform animations for prefers-reduced-motion.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
