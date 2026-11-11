import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

/**
 * Everything is crawlable — this is a portfolio, being found is the point.
 *
 * One exception: non-production hosts are disallowed wholesale, so a Vercel
 * preview deploy never competes with the real site in search results or leaks
 * draft case studies into an index.
 */
// Required by `output: "export"` — these files are rendered once at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const isProduction =
    !siteUrl.includes("vercel.app") && !siteUrl.includes("localhost");

  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
