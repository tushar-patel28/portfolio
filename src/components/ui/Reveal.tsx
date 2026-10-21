"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Seconds to wait before animating, for staggering siblings. */
  delay?: number;
  className?: string;
}

/**
 * Fades and lifts content in once, when it scrolls into view. Under prefers-reduced-motion
 * (and without JS) the [data-reveal] rules in globals.css show the final state immediately.
 * For above-the-fold content use <Enter> instead — it doesn't wait for JS.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <m.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}
