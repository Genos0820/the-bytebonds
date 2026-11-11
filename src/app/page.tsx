import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactCTA } from "@/components/sections/ContactCTA";

/**
 * The order below is the argument the page makes to a visitor:
 * who we are → what we do → proof → the people → how we work → get in touch.
 *
 * Proof comes before the people deliberately. A visitor cares what you've
 * shipped before they care who you are.
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <WorkShowcase />
      <TeamGrid />
      <ProcessSection />
      <ContactCTA />
    </main>
  );
}
