"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { projectCategories, type Project, type ProjectCategory } from "@/data/content";
import { cn } from "@/lib/cn";
import { ProjectCard } from "./ProjectCard";

type Filter = "All" | ProjectCategory;

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  // Only offer categories that have at least one project.
  const filters: Filter[] = [
    "All",
    ...projectCategories.filter((c) => projects.some((p) => p.category === c)),
  ];
  const count = (f: Filter) =>
    f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="mb-8 flex flex-wrap gap-2"
      >
        {filters.map((f) => {
          const selected = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(f)}
              className={cn(
                "inline-flex h-8 items-center gap-2 rounded-full border px-3.5 text-sm transition-colors",
                selected
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-muted hover:text-foreground",
              )}
            >
              {f}
              <span
                className={cn("font-mono text-xs", selected ? "text-background/70" : "text-muted")}
              >
                {count(f)}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {filter === "All" ? "" : `${filter} `}
        {visible.length === 1 ? "project" : "projects"}
      </p>

      <ul className="grid gap-4 sm:grid-cols-2">
        {/* initial={false}: server-rendered cards appear without animation (and without JS) */}
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((project) => (
            <motion.li
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
}
