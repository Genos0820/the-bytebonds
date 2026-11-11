import { team } from "@/content/team";
import { publicAssetExists } from "@/lib/assets";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MemberCard } from "@/components/cards/MemberCard";

export function TeamGrid() {
  return (
    <section id="team" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="The team"
        title="Six people you'll actually talk to."
        lead="No account managers in between. You work directly with whoever is building your thing."
      />

      <RevealGroup
        as="ul"
        className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        step={0.07}
      >
        {team.map((member) => (
          <RevealItem as="li" key={member.slug}>
            <MemberCard
              member={member}
              avatarSrc={
                publicAssetExists(member.avatar) ? member.avatar : null
              }
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
