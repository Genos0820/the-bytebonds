import { featuredProjects } from "@/content/projects";
import { publicAssetExists } from "@/lib/assets";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/cards/ProjectCard";

export function WorkShowcase() {
  const featured = featuredProjects();

  return (
    <section id="work" className="border-y border-surface-border bg-bg-elevated/40">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <SectionHeading
          eyebrow="Selected work"
          title="Proof, not a logo wall."
          lead="Each of these is a full write-up: the constraint, the decisions, and what moved afterwards."
        />

        <RevealGroup as="ul" className="mt-16 grid gap-6 lg:grid-cols-2" step={0.12}>
          {featured.map((project, index) => {
            // First card spans both columns — the showcase needs a focal point,
            // and an even grid of equal cards gives the eye nowhere to land.
            const wide = index === 0 && featured.length > 1;

            return (
              <RevealItem
                as="li"
                key={project.slug}
                className={wide ? "lg:col-span-2" : undefined}
              >
                <ProjectCard
                  project={project}
                  coverSrc={
                    publicAssetExists(project.cover) ? project.cover : null
                  }
                  wide={wide}
                />
              </RevealItem>
            );
          })}
        </RevealGroup>

        <div className="mt-12">
          <Button href="/work" variant="ghost">
            All projects
          </Button>
        </div>
      </div>
    </section>
  );
}
