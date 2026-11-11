import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { loadOgFont, ogContentType, ogGlyphs, ogSize } from "@/lib/og";
import { OgCard } from "@/lib/og-card";

export const dynamic = "force-static"; // required by `output: "export"`
export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${site.name} — ${site.tagline}`;

export default async function Image() {
  const eyebrow = site.tagline;
  const title = site.hero.headline;
  const footer = site.name;

  return new ImageResponse(
    <OgCard eyebrow={eyebrow} title={title} footer={footer} />,
    {
      ...size,
      fonts: [
        {
          name: "Space Grotesk",
          data: await loadOgFont(
            ogGlyphs(eyebrow, title, footer, "SIX SPECIALISTS"),
          ),
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
