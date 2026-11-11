import Link from "next/link";
import Image from "next/image";
import type { TeamMember } from "@/content/types";
import { AssetFallback } from "@/components/ui/AssetFallback";
import { Chip } from "@/components/ui/Chip";
import { TiltCard } from "@/components/ui/TiltCard";

/** Initials for the photo fallback: first letter of the first two words. */
export function initialsOf(name: string) {
  return name
    .split(/[\s_-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * One member in a grid. Like `ProjectCard`, takes `avatarSrc` pre-resolved so
 * the filesystem check stays in the server page.
 */
export function MemberCard({
  member,
  avatarSrc,
}: {
  member: TeamMember;
  avatarSrc: string | null;
}) {
  return (
    <TiltCard className="h-full" maxTilt={5}>
      <Link
        href={`/team/${member.slug}`}
        className="group glass flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-accent"
      >
        <div className="relative aspect-square w-full overflow-hidden">
          {avatarSrc ? (
            <Image
              src={avatarSrc}
              alt={`${member.name}, ${member.role}`}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.04]"
            />
          ) : (
            <AssetFallback
              seed={member.slug}
              initials={initialsOf(member.name)}
              className="absolute inset-0 h-full w-full"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-semibold tracking-tight">
            {member.name}
          </h3>
          <p className="mt-1 font-mono text-[0.65rem] tracking-[0.16em] text-accent uppercase">
            {member.role}
          </p>
          <p className="mt-3 text-sm text-fg-muted">{member.tagline}</p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
            {/* Index-combined: a duplicated entry in a hand-edited skills list
                is a content typo, and React silently drops the duplicate
                rather than showing it. */}
            {member.skills.slice(0, 3).map((skill, index) => (
              <Chip key={`${skill}-${index}`}>{skill}</Chip>
            ))}
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
