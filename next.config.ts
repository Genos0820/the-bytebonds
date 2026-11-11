import type { NextConfig } from "next";

/**
 * GitHub Pages serves a project site from /<repo>, so the build needs a
 * basePath there. It's driven by an env var so `npm run dev` and a custom-domain
 * build both stay at the root: set NEXT_PUBLIC_BASE_PATH=/the-bytebonds
 * only for the Pages build (see `npm run build:pages`).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export", // fully static: Pages has no server
  trailingSlash: true, // /work/ -> work/index.html, which Pages serves natively
  basePath,
  // The image optimiser needs a server, so use a loader that only fixes the path.
  images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
};

export default nextConfig;
