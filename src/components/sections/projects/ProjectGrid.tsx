"use client";

import { m } from "framer-motion";
import { useState } from "react";
import { projectCategories, type Project, type ProjectCategory } from "@/data/content";
import { cn } from "@/lib/cn";
import { ProjectCard } from "./ProjectCard";

type Filter = "All" | ProjectCategory;

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  // Cards render statically on the server (and without JS); they only animate after a filter click.
  const [filtered, setFiltered] = useState(false);

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
              onClick={() => {
                setFilter(f);
                setFiltered(true);
              }}
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

      {/* Keyed by filter so the visible set fades in fresh on each change */}
      <ul key={filter} className="grid gap-4 sm:grid-cols-2">
        {visible.map((project, i) => (
          <m.li
            key={project.title}
            initial={filtered ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.03, ease: "easeOut" }}
          >
            <ProjectCard project={project} />
          </m.li>
        ))}
      </ul>
    </>
  );
}
