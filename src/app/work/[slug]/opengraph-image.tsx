import { ImageResponse } from "next/og";
import { getProject, projects } from "@/content/projects";
import { categoryLabels } from "@/lib/categories";
import { loadOgFont, ogContentType, ogGlyphs, ogSize } from "@/lib/og";
import { OgCard } from "@/lib/og-card";

export const dynamic = "force-static"; // required by `output: "export"`
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Case study";

/** Prerenders one image per project alongside the pages. */
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);

  // The route only exists for slugs from generateStaticParams, but a bad slug
  // must not throw — an unrenderable OG image would fail the whole build.
  const eyebrow = project ? categoryLabels[project.category] : "Work";
  const title = project?.title ?? "Case study";
  const footer = project ? `${project.client} · ${project.year}` : "";

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
