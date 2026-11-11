import { services } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/cards/ServiceCard";

export function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="What we do"
        title="One team, the whole delivery chain."
        lead="Most projects stall at the hand-off between designer, developer and whoever runs the servers. There are no hand-offs here."
      />

      <RevealGroup as="ul" className="mt-16 grid gap-5 md:grid-cols-2" step={0.1}>
        {services.map((service) => (
          <RevealItem as="li" key={service.id}>
            <ServiceCard service={service} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
