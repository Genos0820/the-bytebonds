import Image from "next/image";
import Link from "next/link";
import { getMember } from "@/content/team";
import { publicAssetExists } from "@/lib/assets";
import { initialsOf } from "@/components/cards/MemberCard";
import { AssetFallback } from "@/components/ui/AssetFallback";

/**
 * A signed note from whoever led the project.
 *
 * Deliberately styled nothing like `TestimonialCard`: no glass panel, no quote
 * mark, no centred blockquote. This is us talking, and a reader skimming the
 * page has to be able to tell that from a client vouching for us without
 * reading a word. Hence the rule down the left, the plain background, and an
 * eyebrow that says whose opinion this is before the opinion starts.
 *
 * Renders nothing if the note names a slug that isn't on the team, rather than
 * emitting an unattributed opinion.
 */
export function ProjectNote({
  note,
}: {
  note: { author: string; body: string };
}) {
  const author = getMember(note.author);
  if (!author) return null;

  const hasAvatar = publicAssetExists(author.avatar);

  return (
    <aside className="border-l-2 border-accent/40 pl-6 sm:pl-8">
      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
        Why we built it this way
      </p>

      <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
        {note.body}
      </p>

      <Link
        href={`/team/${author.slug}`}
        className="group mt-6 inline-flex items-center gap-3"
      >
        <span className="relative size-9 shrink-0 overflow-hidden rounded-full">
          {hasAvatar ? (
            <Image
              src={author.avatar}
              alt=""
              fill
              sizes="36px"
              className="object-cover"
            />
          ) : (
            <AssetFallback
              seed={author.slug}
              initials={initialsOf(author.name)}
              className="absolute inset-0 h-full w-full [&>span]:text-[0.6rem]"
            />
          )}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold transition-colors group-hover:text-accent">
            {author.name}
          </span>
          <span className="block font-mono text-[0.6rem] tracking-[0.14em] text-fg-subtle uppercase">
            {author.role}
          </span>
        </span>
      </Link>
    </aside>
  );
}
