import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Whether a path under /public actually exists on disk.
 *
 * Every page that calls this is statically generated, so the check runs at
 * build time and costs nothing at runtime. It exists so the site renders
 * correctly while `src/content/*` still holds placeholder image paths: each
 * missing cover or avatar degrades to a designed fallback instead of a broken
 * image icon, and starts rendering for real the moment the file is dropped in.
 *
 * Server-side only — never import this into a "use client" module.
 */
export function publicAssetExists(publicPath: string): boolean {
  if (!publicPath.startsWith("/")) return false;
  // Reject traversal before touching the filesystem.
  if (publicPath.includes("..")) return false;
  return existsSync(join(process.cwd(), "public", publicPath.slice(1)));
}
