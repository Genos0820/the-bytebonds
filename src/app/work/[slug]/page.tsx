import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { adjacentProjects, getProject, projects } from "@/content/projects";
import { testimonials } from "@/content/site";
import { getMember } from "@/content/team";
import { publicAssetExists } from "@/lib/assets";
import { categoryLabels } from "@/lib/categories";
import { projectSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { Chip } from "@/components/ui/Chip";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { AssetFallback } from "@/components/ui/AssetFallback";
import { initialsOf } from "@/components/cards/MemberCard";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { TestimonialCard } from "@/components/sections/TestimonialsSection";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      url: `/work/${project.slug}`,
      // No `images` here on purpose: leaving it out lets the generated card in
      // `opengraph-image.tsx` be used. A designed card carrying the project
      // title reads better in a Slack or LinkedIn preview than a cropped
      // product screenshot does. Set `images: [project.cover]` to override.
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const hasCover = publicAssetExists(project.cover);
  // Only show gallery images that actually exist. One labelled placeholder for
  // the cover is informative; a grid of five placeholder tiles is just noise.
  const gallery = project.gallery.filter(publicAssetExists);
  const { previous, next } = adjacentProjects(project.slug);

  // The client's own words about THIS project, directly under the story of it.
  // Strongest placement a quote has: the reader has just finished the claim and
  // immediately gets someone else confirming it.
  const quote = testimonials.find((t) => t.projectSlug === project.slug);

  // Resolved once here, for the structured-data contributor list. A slug that
  // doesn't match a member is dropped rather than emitted as a broken credit.
  const credited = project.team
    .map(getMember)
    .filter((member) => member !== undefined);

  return (
    <main>
      <JsonLd schema={projectSchema(project, credited)} />
      <header className="relative isolate overflow-hidden pt-32 pb-12 sm:pt-40">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="grid-bg absolute inset-0 opacity-40" />
          <div
            className="absolute -top-40 right-0 h-[26rem] w-[26rem] translate-x-1/3 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--accent) 36%, transparent) 0%, transparent 68%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <Reveal immediate>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-fg-muted uppercase transition-colors hover:text-accent"
            >
              <ArrowLeft size={14} aria-hidden />
              All work
            </Link>
          </Reveal>

          <Reveal immediate delay={0.08}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Chip tone="accent">{categoryLabels[project.category]}</Chip>
              <p className="font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">
                {project.client} · {project.year}
              </p>
            </div>
          </Reveal>

          <Reveal immediate delay={0.14}>
            <h1 className="mt-5 max-w-4xl text-4xl leading-[1.04] font-bold tracking-tight text-balance sm:text-6xl">
              {project.title}
            </h1>
          </Reveal>

          <Reveal immediate delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg text-fg-muted">
              {project.summary}
            </p>
          </Reveal>

          {(project.liveUrl || project.repoUrl) && (
            <Reveal immediate delay={0.26}>
              <div className="mt-8 flex flex-wrap gap-5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                  >
                    Visit live site
                    <ArrowUpRight size={15} aria-hidden />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg-muted hover:text-accent"
                  >
                    Source code
                    <ArrowUpRight size={15} aria-hidden />
                  </a>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </header>

      {/* Cover */}
      <Reveal immediate delay={0.3} className="mx-auto max-w-7xl px-6">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-theme border border-surface-border">
          {hasCover ? (
            <Image
              src={project.cover}
              alt={`${project.title} — ${project.summary}`}
              fill
              priority
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="object-cover"
            />
          ) : (
            <AssetFallback
              seed={project.slug}
              label="Cover image pending"
              className="absolute inset-0 h-full w-full"
            />
          )}
        </div>
      </Reveal>

      {/* Metrics */}
      {project.metrics.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pt-16">
          <h2 className="sr-only">Outcomes</h2>
          <RevealGroup
            as="ul"
            className="grid gap-px overflow-hidden rounded-theme border border-surface-border bg-surface-border sm:grid-cols-2 lg:grid-cols-4"
          >
            {project.metrics.map((metric, index) => (
              <RevealItem
                as="li"
                // Label alone isn't guaranteed unique across a project's
                // metrics, and React silently drops duplicate-keyed siblings.
                key={`${metric.label}-${index}`}
                className="bg-bg-elevated px-5 py-6"
              >
                <p className="font-mono text-[0.65rem] tracking-[0.16em] text-fg-subtle uppercase">
                  {metric.label}
                </p>
                <p className="mt-2 text-3xl font-bold tabular-nums text-accent sm:text-4xl">
                  {metric.value}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      {/* Narrative: a label rail on the left, prose on the right.
          The labels are deliberately NOT sticky — Motion leaves a transform on
          the Reveal wrapper, which becomes the containing block for any
          descendant and silently breaks `position: sticky`. */}
      <div className="mx-auto flex max-w-5xl flex-col gap-14 px-6 py-20 sm:py-28">
        {[
          { label: "The challenge", body: project.challenge },
          { label: "What we built", body: project.solution },
        ].map((block) => (
          <Reveal key={block.label}>
            <section className="grid gap-4 lg:grid-cols-[12rem_1fr] lg:gap-12">
              <h2 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                {block.label}
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
                {block.body}
              </p>
            </section>
          </Reveal>
        ))}

        <Reveal>
          <section className="grid gap-4 lg:grid-cols-[12rem_1fr] lg:gap-12">
            <h2 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
              Stack
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech, index) => (
                <Chip key={`${tech}-${index}`}>{tech}</Chip>
              ))}
            </div>
          </section>
        </Reveal>
      </div>

      {quote && (
        <section className="mx-auto max-w-5xl px-6 pb-20 sm:pb-28">
          <h2 className="sr-only">What the client said</h2>
          <Reveal>
            <TestimonialCard testimonial={quote} />
          </Reveal>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-20 sm:pb-28">
          <h2 className="sr-only">Gallery</h2>
          <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-2">
            {gallery.map((src, index) => (
              <RevealItem as="li" key={src}>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-theme border border-surface-border">
                  <Image
                    src={src}
                    alt={`${project.title} — screenshot ${index + 1}`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      {/* Credits. Hidden entirely when no members are assigned — a "Who built
          it" heading over an empty row looks like a rendering failure. */}
      {credited.length > 0 && (
        <section className="border-t border-surface-border bg-bg-elevated/40">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
            <Reveal>
              <h2 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                Who built it
              </h2>
            </Reveal>
            <RevealGroup
              as="ul"
              className="mt-8 flex flex-wrap gap-3"
              step={0.06}
            >
              {credited.map((member) => {
                const hasAvatar = publicAssetExists(member.avatar);

                return (
                  <RevealItem as="li" key={member.slug}>
                    <Link
                      href={`/team/${member.slug}`}
                      className="glass flex items-center gap-3 p-3 pr-5 transition-colors duration-300 hover:border-accent"
                    >
                      <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
                        {hasAvatar ? (
                          <Image
                            src={member.avatar}
                            alt=""
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        ) : (
                          <AssetFallback
                            seed={member.slug}
                            initials={initialsOf(member.name)}
                            className="absolute inset-0 h-full w-full [&>span]:text-xs"
                          />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">
                          {member.name}
                        </span>
                        <span className="block font-mono text-[0.6rem] tracking-[0.14em] text-fg-subtle uppercase">
                          {member.role}
                        </span>
                      </span>
                    </Link>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Previous / next */}
      {(previous || next) && previous?.slug !== project.slug && (
        <nav
          aria-label="More projects"
          className="mx-auto grid max-w-7xl gap-px border-y border-surface-border bg-surface-border sm:grid-cols-2"
        >
          {[
            { project: previous, direction: "Previous" as const },
            { project: next, direction: "Next" as const },
          ].map(({ project: item, direction }) =>
            item && item.slug !== project.slug ? (
              <Link
                key={direction}
                href={`/work/${item.slug}`}
                className="group flex flex-col gap-2 bg-bg px-6 py-10 transition-colors duration-300 hover:bg-bg-elevated sm:px-10"
              >
                <span className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.16em] text-fg-subtle uppercase">
                  {direction === "Previous" && (
                    <ArrowLeft size={13} aria-hidden />
                  )}
                  {direction}
                  {direction === "Next" && <ArrowRight size={13} aria-hidden />}
                </span>
                <span className="text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent">
                  {item.title}
                </span>
              </Link>
            ) : null,
          )}
        </nav>
      )}

      <ContactCTA />
    </main>
  );
}
