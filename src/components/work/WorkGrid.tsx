"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project, ProjectCategory } from "@/content/types";
import { categoryLabels } from "@/lib/categories";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { ProjectCard } from "@/components/cards/ProjectCard";

export type WorkItem = {
  project: Project;
  /** Resolved on the server — the cover path, or null if the file is missing. */
  coverSrc: string | null;
};

type Filter = ProjectCategory | "all";

/**
 * The filterable project index.
 *
 * Filtering is client-side over a list that is already in the page: with a
 * handful of projects, a round-trip per filter click would be slower and would
 * lose the layout animation for nothing.
 *
 * Filters render as real `<button>`s in a group labelled for screen readers,
 * with `aria-pressed` state — not clickable `<div>`s.
 */
export function WorkGrid({
  items,
  categories,
}: {
  items: WorkItem[];
  categories: ProjectCategory[];
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? items
        : items.filter((item) => item.project.category === filter),
    [items, filter],
  );

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: `All (${items.length})` },
    ...categories.map((category) => ({
      value: category as Filter,
      label: categoryLabels[category],
    })),
  ];

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
      >
        {filters.map((option) => {
          const active = filter === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-4 py-1.5 font-mono text-[0.7rem] tracking-[0.12em] uppercase transition-colors duration-300",
                active
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-surface-border text-fg-muted hover:border-accent hover:text-accent",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <motion.ul layout className="mt-10 grid gap-6 lg:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item) => (
            <motion.li
              key={item.project.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease }}
            >
              <ProjectCard
                project={item.project}
                coverSrc={item.coverSrc}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <p className="mt-10 text-sm text-fg-muted">
          Nothing in this category yet.
        </p>
      )}
    </>
  );
}
