import type { Metadata } from "next";
import { services } from "@/content/services";
import { PageHeader } from "@/components/ui/PageHeader";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Product design, web and mobile development, backend and cloud — what the team builds and what you get.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="What we do"
        title="One team, the whole delivery chain."
        lead="Most projects stall at the hand-off between designer, developer and whoever runs the servers. There are no hand-offs here."
      />

      <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-28">
        <RevealGroup as="ul" className="grid gap-5 md:grid-cols-2" step={0.1}>
          {services.map((service) => (
            <RevealItem as="li" key={service.id}>
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <ProcessSection />
      <ContactCTA />
    </main>
  );
}
