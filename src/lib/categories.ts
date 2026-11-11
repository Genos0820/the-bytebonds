import type { ProjectCategory } from "@/content/types";

/** Human labels for the category slugs used in `projects.ts`. */
export const categoryLabels: Record<ProjectCategory, string> = {
  "web-app": "Web App",
  "mobile-app": "Mobile App",
  website: "Website",
  branding: "Branding",
  "ai-ml": "AI & ML",
  "e-commerce": "E-commerce",
  "data-platform": "Data Platform",
};
