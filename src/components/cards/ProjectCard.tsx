import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { categoryLabels } from "@/lib/categories";
import { cn } from "@/lib/cn";
import { AssetFallback } from "@/components/ui/AssetFallback";
import { Chip } from "@/components/ui/Chip";

/**
 * One project in a grid.
 *
 * Takes `coverSrc` already resolved rather than checking the filesystem itself,
 * so the same component works in a server page and inside the client-side
 * filtered grid on /work. The existence check is server-only and stays there.
 */
export function ProjectCard({
  project,
  coverSrc,
  wide = false,
}: {
  project: Project;
  /** The cover path if the file exists on disk, otherwise null. */
  coverSrc: string | null;
  /** Spans two columns and uses a wider crop. */
  wide?: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group glass block h-full overflow-hidden transition-colors duration-300 hover:border-accent"
    >
      <div
        className={cn(
          "relative w-full",
          wide ? "aspect-[21/9]" : "aspect-[16/10]",
        )}
      >
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={`${project.title} — ${project.summary}`}
            fill
            sizes={
              wide
                ? "(min-width: 1024px) 1152px, 100vw"
                : "(min-width: 1024px) 568px, 100vw"
            }
            className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          <AssetFallback
            seed={project.slug}
            label="Cover image pending"
            className="absolute inset-0 h-full w-full"
          />
        )}
        <div className="absolute top-4 left-4">
          <Chip tone="accent" className="bg-bg/70 backdrop-blur-sm">
            {categoryLabels[project.category]}
          </Chip>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 p-6">
        <div className="min-w-0">
          <p className="font-mono text-[0.65rem] tracking-[0.16em] text-fg-subtle uppercase">
            {project.client} · {project.year}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-fg-muted">{project.summary}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech, index) => (
              <Chip key={`${tech}-${index}`}>{tech}</Chip>
            ))}
          </div>
        </div>
        <ArrowUpRight
          size={20}
          aria-hidden
          className="shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-accent"
        />
      </div>
    </Link>
  );
}
