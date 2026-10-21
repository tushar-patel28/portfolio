"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Seconds to wait before animating, for staggering siblings. */
  delay?: number;
  /** Animate on mount instead of when scrolled into view (for above-the-fold content). */
  immediate?: boolean;
  className?: string;
}

/**
 * Fades and lifts content in once. Under prefers-reduced-motion (and without JS)
 * the [data-reveal] rules in globals.css show the final state immediately.
 */
export function Reveal({ children, delay = 0, immediate = false, className }: RevealProps) {
  const target = { opacity: 1, y: 0 };

  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 12 }}
      {...(immediate
        ? { animate: target }
        : { whileInView: target, viewport: { once: true, margin: "0px 0px -10% 0px" } })}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
