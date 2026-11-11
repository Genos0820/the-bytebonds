import { site } from "@/content/site";

/**
 * The site's absolute base URL, without a trailing slash.
 *
 * One source of truth for every absolute URL the site emits — `metadataBase`,
 * the sitemap, robots.txt and the JSON-LD graph. These used to be easy to let
 * drift apart, which shows up as canonical tags pointing at one host and a
 * sitemap listing another.
 *
 * The env var wins so preview and staging deploys describe themselves correctly;
 * `site.url` is the fallback for local work.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(
  /\/+$/,
  "",
);

/** Absolute URL for a path like `/work/foo`. */
export const absoluteUrl = (path: string) =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
