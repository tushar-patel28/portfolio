"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { content } from "@/data/content";
import { Icon } from "@/components/ui/icons";
import { assetPath } from "@/lib/paths";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  const { profile } = content;

  return (
    <section id="top" className="flex min-h-[90svh] flex-col justify-center pt-16">
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.1 }}
        className="max-w-3xl"
      >
        <motion.p variants={fadeUp} className="mb-4 font-mono text-sm text-accent">
          {profile.greeting}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          {profile.name}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-3 text-2xl font-medium tracking-tight text-muted sm:text-4xl"
        >
          {profile.role}
        </motion.p>
        <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {profile.tagline}
        </motion.p>
        <motion.p variants={fadeUp} className="mt-4 flex items-center gap-2 text-sm text-muted">
          <Icon name="location" size={16} />
          {profile.location}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            View my work
          </a>
          <a
            href={assetPath(profile.resume)}
            download
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            <Icon name="download" size={16} />
            Download resume
          </a>
          <ul className="flex items-center gap-4 sm:ml-2">
            {profile.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  <Icon name={social.icon} size={20} />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        className="mt-20 hidden self-start text-muted sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.6 },
          y: { delay: 1, duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
