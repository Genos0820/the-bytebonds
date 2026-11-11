/**
 * Content schema for the portfolio site.
 *
 * Everything the site renders comes from `src/content/*`. No copy, no names and
 * no image paths are hard-coded inside components — so updating the site means
 * editing these files, never touching JSX.
 */

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "x"
  | "dribbble"
  | "behance"
  | "instagram"
  | "youtube"
  | "website"
  | "email";

export interface SocialLink {
  platform: SocialPlatform;
  /** Full URL. For `email`, use the bare address — the UI adds `mailto:`. */
  url: string;
}

/** One of the six people in the collective. */
export interface TeamMember {
  /** URL segment: /team/<slug>. Lowercase, hyphenated, never change once live. */
  slug: string;
  name: string;
  /** Short title shown under the name, e.g. "Backend & Infrastructure". */
  role: string;
  /** One line for the team grid card. Aim for under 90 characters. */
  tagline: string;
  /** 2–4 sentences for the member detail page. */
  bio: string;
  /** Square image, min 800x800, in /public/team/. */
  avatar: string;
  /** Skills shown as chips. Keep to 5–8 so cards stay readable. */
  skills: string[];
  /** Years of professional experience, shown as a stat. */
  yearsExperience: number;
  location?: string;
  socials: SocialLink[];
  /** Project slugs this member led or contributed to. Drives cross-linking. */
  projects: string[];
}

export type ProjectCategory =
  | "web-app"
  | "mobile-app"
  | "website"
  | "branding"
  | "ai-ml"
  | "e-commerce"
  | "data-platform";

export interface ProjectMetric {
  /** e.g. "Load time" */
  label: string;
  /** e.g. "-62%" */
  value: string;
}

/** A case study. */
export interface Project {
  /** URL segment: /work/<slug>. */
  slug: string;
  title: string;
  /** Client or product name. Use "Confidential" when under NDA. */
  client: string;
  year: number;
  category: ProjectCategory;
  /** One line for the work grid. Under 100 characters. */
  summary: string;
  /** The brief: what the client needed and why it was hard. */
  challenge: string;
  /** What you built and the decisions behind it. */
  solution: string;
  /** Measurable outcomes. 2–4 reads best. */
  metrics: ProjectMetric[];
  /** Tech used, shown as chips. */
  stack: string[];
  /** Landscape hero image, min 1920x1080, in /public/work/. */
  cover: string;
  /** Additional screenshots for the case study body. */
  gallery: string[];
  /** Team member slugs who worked on it. */
  team: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Pins the project to the home page showcase. Keep 3–6 featured. */
  featured: boolean;
}

export interface Service {
  /** Stable id, used as a React key and anchor. */
  id: string;
  title: string;
  description: string;
  /** Named icon from `lucide-react`, e.g. "Code2". */
  icon: string;
  /** Concrete deliverables under this service. */
  deliverables: string[];
}

export interface ProcessStep {
  /** Displayed as "01", "02"… */
  step: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  /** e.g. "CTO, Northwind" */
  authorRole: string;
  avatar?: string;
  /** Links the quote to a case study. */
  projectSlug?: string;
}

export interface HeroCopy {
  /** Small mono label above the headline. Keep it short. */
  kicker: string;
  /** The headline. One sentence, ideally under 60 characters. */
  headline: string;
  /** Two sentences at most, under the headline. */
  lead: string;
  /** Scrolling strip of capabilities under the hero. 8–14 items reads best. */
  marquee: string[];
}

export interface SiteConfig {
  /** Team / studio name. Used in the logo and <title>. */
  name: string;
  /** Appears after the name in the browser tab. */
  tagline: string;
  /** Meta description, 150–160 characters. */
  description: string;
  /** Production URL, no trailing slash. Required for OG tags and sitemap. */
  url: string;
  /** Shared inbox. Leave undefined until one exists — every place that shows it hides itself. */
  contactEmail?: string;
  /** E.164 format, e.g. "+919876543210". Optional. */
  phone?: string;
  /** Where the team is based, e.g. "Pune, India — working worldwide". */
  location: string;
  socials: SocialLink[];
  /** Headline stats for the about strip. */
  stats: { label: string; value: string }[];
  hero: HeroCopy;
}
