import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getMember, team } from "@/content/team";
import { projectsByMember } from "@/content/projects";
import { publicAssetExists } from "@/lib/assets";
import { socialHref, socialLabels } from "@/lib/socials";
import { personSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { Chip } from "@/components/ui/Chip";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { AssetFallback } from "@/components/ui/AssetFallback";
import { initialsOf } from "@/components/cards/MemberCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ContactCTA } from "@/components/sections/ContactCTA";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return team.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const member = getMember((await params).slug);
  if (!member) return {};

  return {
    title: member.name,
    description: `${member.role} — ${member.tagline}`,
    alternates: { canonical: `/team/${member.slug}` },
    openGraph: {
      title: member.name,
      description: `${member.role} — ${member.tagline}`,
      type: "profile",
      url: `/team/${member.slug}`,
      // Left out so the generated card in `opengraph-image.tsx` is used — see
      // the note on the work case study for why.
    },
  };
}

export default async function MemberPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const member = getMember((await params).slug);
  if (!member) notFound();

  const hasAvatar = publicAssetExists(member.avatar);
  const credits = projectsByMember(member.slug);
  const others = team.filter((m) => m.slug !== member.slug);

  return (
    <main>
      <JsonLd schema={personSchema(member)} />
      <header className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
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
              href="/team"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-fg-muted uppercase transition-colors hover:text-accent"
            >
              <ArrowLeft size={14} aria-hidden />
              All of us
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-[20rem_1fr] lg:gap-16">
            <Reveal immediate delay={0.08}>
              <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-theme border border-surface-border">
                {hasAvatar ? (
                  <Image
                    src={member.avatar}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 320px, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <AssetFallback
                    seed={member.slug}
                    initials={initialsOf(member.name)}
                    className="absolute inset-0 h-full w-full [&>span]:text-5xl"
                  />
                )}
              </div>
            </Reveal>

            <div className="min-w-0">
              <Reveal immediate delay={0.14}>
                <h1 className="text-4xl leading-[1.04] font-bold tracking-tight text-balance sm:text-5xl">
                  {member.name}
                </h1>
                <p className="mt-3 font-mono text-xs tracking-[0.18em] text-accent uppercase">
                  {member.role}
                </p>
              </Reveal>

              <Reveal immediate delay={0.2}>
                <p className="mt-7 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
                  {member.bio}
                </p>
              </Reveal>

              <Reveal immediate delay={0.26}>
                <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                  <div>
                    <dt className="font-mono text-[0.6rem] tracking-[0.16em] text-fg-subtle uppercase">
                      Experience
                    </dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums">
                      {member.yearsExperience} yrs
                    </dd>
                  </div>
                  {member.location && (
                    <div>
                      <dt className="font-mono text-[0.6rem] tracking-[0.16em] text-fg-subtle uppercase">
                        Based in
                      </dt>
                      <dd className="mt-1 text-lg font-semibold">
                        {member.location}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="font-mono text-[0.6rem] tracking-[0.16em] text-fg-subtle uppercase">
                      Projects here
                    </dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums">
                      {credits.length}
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal immediate delay={0.32}>
                <div className="mt-8">
                  <h2 className="font-mono text-[0.6rem] tracking-[0.16em] text-fg-subtle uppercase">
                    Works with
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {member.skills.map((skill, index) => (
                      <Chip key={`${skill}-${index}`}>{skill}</Chip>
                    ))}
                  </div>
                </div>
              </Reveal>

              {member.socials.length > 0 && (
                <Reveal immediate delay={0.38}>
                  <ul className="mt-8 flex flex-wrap gap-5">
                    {member.socials.map((link) => (
                      <li key={link.platform}>
                        <a
                          href={socialHref(link)}
                          {...(link.platform === "email"
                            ? {}
                            : { target: "_blank", rel: "noreferrer noopener" })}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-fg-muted transition-colors hover:text-accent"
                        >
                          {socialLabels[link.platform]}
                          <ArrowUpRight size={14} aria-hidden />
                        </a>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* What they've worked on */}
      {credits.length > 0 && (
        <section className="border-y border-surface-border bg-bg-elevated/40">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Worked on
              </h2>
            </Reveal>
            <RevealGroup
              as="ul"
              className="mt-10 grid gap-6 lg:grid-cols-2"
              step={0.1}
            >
              {credits.map((project) => (
                <RevealItem as="li" key={project.slug}>
                  <ProjectCard
                    project={project}
                    coverSrc={
                      publicAssetExists(project.cover) ? project.cover : null
                    }
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* The rest of the team */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <Reveal>
          <h2 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            The rest of the team
          </h2>
        </Reveal>
        <RevealGroup as="ul" className="mt-8 flex flex-wrap gap-3" step={0.05}>
          {others.map((other) => (
            <RevealItem as="li" key={other.slug}>
              <Link
                href={`/team/${other.slug}`}
                className="glass flex items-center gap-3 p-3 pr-5 transition-colors duration-300 hover:border-accent"
              >
                <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
                  {publicAssetExists(other.avatar) ? (
                    <Image
                      src={other.avatar}
                      alt=""
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <AssetFallback
                      seed={other.slug}
                      initials={initialsOf(other.name)}
                      className="absolute inset-0 h-full w-full [&>span]:text-xs"
                    />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">
                    {other.name}
                  </span>
                  <span className="block font-mono text-[0.6rem] tracking-[0.14em] text-fg-subtle uppercase">
                    {other.role}
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <ContactCTA />
    </main>
  );
}
