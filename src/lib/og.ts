/**
 * Shared pieces for dynamically generated Open Graph images.
 *
 * Satori (which powers `next/og`) needs a real font binary — it cannot fall back
 * to a system face. Rather than commit a font to the repo, we fetch a *subset*
 * from Google Fonts at generation time: passing `text=` returns only the glyphs
 * that image actually uses, which is a few kilobytes instead of a few hundred.
 *
 * This means image generation requires network access at build time. That is
 * the documented Next.js approach and CI already has network for `npm install`,
 * but it is a real dependency worth knowing about — see PLAN.md.
 *
 * Colours are literal hex, not the CSS custom properties the site uses: Satori
 * resolves no variables and does not understand `oklch()`. These are the
 * midnight palette converted to sRGB.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export const ogColors = {
  bg: "#16131f",
  bgDeep: "#0f0d16",
  fg: "#f7f6fa",
  muted: "#a9a3b8",
  subtle: "#6f6980",
  accent: "#9d7bf0",
  accent2: "#67d8e8",
  border: "#2e2940",
};

/**
 * Fetches Space Grotesk, subset to exactly the characters passed in.
 *
 * Node's `fetch` sends no browser User-Agent, so Google Fonts replies with a
 * TrueType `src` rather than woff2 — which is the format Satori can parse.
 */
export async function loadOgFont(text: string, weight: 400 | 700 = 700) {
  const url =
    `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@${weight}` +
    `&text=${encodeURIComponent(text)}`;

  const css = await (await fetch(url)).text();
  const match = css.match(
    /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/,
  );

  if (!match) {
    throw new Error(
      "Could not resolve a TrueType source from Google Fonts for the OG image.",
    );
  }

  return fetch(match[1]).then((res) => res.arrayBuffer());
}

/** Every glyph the generator might need, so one fetch covers any content. */
export const ogGlyphs = (...parts: string[]) =>
  [...new Set(parts.join("").split(""))].join("");
