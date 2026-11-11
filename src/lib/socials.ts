import type { SocialLink, SocialPlatform } from "@/content/types";

/**
 * Display names for each platform.
 *
 * lucide-react v1 dropped brand glyphs, so socials render as labelled text
 * links rather than icons. That suits the editorial direction, and it sidesteps
 * shipping third-party brand marks.
 */
export const socialLabels: Record<SocialPlatform, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  x: "X",
  dribbble: "Dribbble",
  behance: "Behance",
  instagram: "Instagram",
  youtube: "YouTube",
  website: "Website",
  email: "Email",
};

/** Resolves a social link to the href the UI should use. */
export function socialHref(link: SocialLink): string {
  return link.platform === "email" ? `mailto:${link.url}` : link.url;
}
