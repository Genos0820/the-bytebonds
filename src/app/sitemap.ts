import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { team } from "@/content/team";
import { absoluteUrl } from "@/lib/site-url";

/**
 * Generated from the content files, so a new project or member appears in the
 * sitemap the moment it is added — a hand-maintained list of URLs is a list
 * that goes stale.
 *
 * `priority` reflects how much we want each page found: work above team, detail
 * pages above the index that lists them, since the case studies are what wins
 * the enquiry.
 */
// Required by `output: "export"` — these files are rendered once at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/team", priority: 0.7 },
    { path: "/services", priority: 0.8 },
    { path: "/contact", priority: 0.6 },
  ];

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...team.map((member) => ({
      url: absoluteUrl(`/team/${member.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
