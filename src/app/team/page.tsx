import type { Metadata } from "next";
import { team } from "@/content/team";
import { publicAssetExists } from "@/lib/assets";
import { PageHeader } from "@/components/ui/PageHeader";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MemberCard } from "@/components/cards/MemberCard";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The six specialists behind the work — design, web, mobile, backend, cloud and delivery.",
};

export default function TeamPage() {
  return (
    <main>
      <PageHeader
        eyebrow={`${team.length} specialists`}
        title="The team"
        lead="No account managers in between. You work directly with whoever is building your thing."
      />

      <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32">
        <RevealGroup
          as="ul"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
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
      </div>

      <ContactCTA />
    </main>
  );
}
