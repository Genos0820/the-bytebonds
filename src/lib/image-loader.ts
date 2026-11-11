/**
 * Static export has no image optimiser, and Next does not prepend `basePath`
 * to plain `/public` paths. On GitHub Pages the site lives under
 * /<repo>, so `/team/x.jpg` would 404 — this loader adds the prefix.
 */
export default function imageLoader({ src }: { src: string }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return src.startsWith("/") ? `${basePath}${src}` : src;
}
