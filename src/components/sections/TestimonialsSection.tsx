import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { testimonials } from "@/content/site";
import { getProject } from "@/content/projects";
import { publicAssetExists } from "@/lib/assets";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { AssetFallback } from "@/components/ui/AssetFallback";
import { initialsOf } from "@/components/cards/MemberCard";

/**
 * Client quotes.
 *
 * Returns null when there are none, so the home page simply doesn't have this
 * section until real quotes exist. That is deliberate: a "What clients say"
 * heading over one vague line, or over placeholder text, reads worse to a
 * prospective client than no section at all — it tells them you asked and
 * nobody answered.
 *
 * See TESTIMONIALS.md for how to collect them and what to paste back here.
 */
export function TestimonialsSection() {
  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="border-y border-surface-border bg-bg-elevated/40"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <SectionHeading
          eyebrow="In their words"
          title="What the people who hired us say."
          lead="Each quote is from the person who signed off the work, published with their permission."
        />

        <RevealGroup
          as="ul"
          className="mt-16 grid gap-5 lg:grid-cols-2"
          step={0.08}
        >
          {testimonials.map((testimonial, index) => (
            <RevealItem
              as="li"
              key={`${testimonial.author}-${index}`}
              className="h-full"
            >
              <TestimonialCard testimonial={testimonial} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/**
 * One quote. Also used on case-study pages, where it sits under the narrative
 * for the project it belongs to.
 */
export function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  const project = testimonial.projectSlug
    ? getProject(testimonial.projectSlug)
    : undefined;
  const hasAvatar = testimonial.avatar
    ? publicAssetExists(testimonial.avatar)
    : false;

  return (
    <figure className="glass flex h-full flex-col gap-6 p-8">
      {/* Decorative, and marked so: a screen reader announcing "left double
          quotation mark" before every quote is noise. */}
      <span
        aria-hidden
        className="font-mono text-5xl leading-none text-accent/30"
      >
        &ldquo;
      </span>

      <blockquote className="flex-1 text-lg leading-relaxed text-pretty sm:text-xl">
        {testimonial.quote}
      </blockquote>

      <figcaption className="flex flex-wrap items-center gap-4 border-t border-surface-border pt-6">
        <span className="relative size-11 shrink-0 overflow-hidden rounded-full">
          {hasAvatar && testimonial.avatar ? (
            <Image
              src={testimonial.avatar}
              alt=""
              fill
              sizes="44px"
              className="object-cover"
            />
          ) : (
            <AssetFallback
              seed={testimonial.author}
              initials={initialsOf(testimonial.author)}
              className="absolute inset-0 h-full w-full [&>span]:text-sm"
            />
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block font-semibold">{testimonial.author}</span>
          <span className="block font-mono text-[0.65rem] tracking-[0.14em] text-fg-subtle uppercase">
            {testimonial.authorRole}
            {testimonial.date && ` · ${testimonial.date}`}
          </span>
        </span>

        <span className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {project && (
            <Link
              href={`/work/${project.slug}`}
              className="text-xs font-semibold text-fg-muted transition-colors hover:text-accent"
            >
              {project.title}
            </Link>
          )}
          {/* The link that makes the quote checkable. Worth chasing for at
              least one client — see TESTIMONIALS.md. */}
          {testimonial.sourceUrl && (
            <a
              href={testimonial.sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
            >
              Verify
              <ArrowUpRight size={13} aria-hidden />
            </a>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
