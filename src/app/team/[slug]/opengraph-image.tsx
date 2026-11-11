import { ImageResponse } from "next/og";
import { getMember, team } from "@/content/team";
import { loadOgFont, ogColors, ogContentType, ogGlyphs, ogSize } from "@/lib/og";
import { OgCard } from "@/lib/og-card";

export const dynamic = "force-static"; // required by `output: "export"`
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Team member";

/** Prerenders one image per member alongside the pages. */
export function generateStaticParams() {
  return team.map(({ slug }) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const member = getMember((await params).slug);

  const eyebrow = member?.role ?? "Team";
  const title = member?.name ?? "Team";
  const footer = member?.tagline ?? "";

  return new ImageResponse(
    <OgCard
      eyebrow={eyebrow}
      title={title}
      footer={footer}
      // Cyan rather than violet, so a shared profile link is visibly a person
      // and not another case study.
      accent={ogColors.accent2}
    />,
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
