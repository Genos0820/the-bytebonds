import type { Metadata } from "next";
import { projects, usedCategories } from "@/content/projects";
import { publicAssetExists } from "@/lib/assets";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkGrid, type WorkItem } from "@/components/work/WorkGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects and case studies — the constraint, the decisions, and what moved afterwards.",
};

export default function WorkPage() {
  // The filesystem check is server-only, so resolve covers here and hand the
  // client grid plain data.
  const items: WorkItem[] = projects.map((project) => ({
    project,
    coverSrc: publicAssetExists(project.cover) ? project.cover : null,
  }));

  return (
    <main>
      <PageHeader
        eyebrow={`${projects.length} projects`}
        title="Work"
        lead="Every project here is a full write-up rather than a thumbnail. Filter by what you're looking for."
      />

      <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32">
        <WorkGrid items={items} categories={usedCategories()} />
      </div>

      <ContactCTA />
    </main>
  );
}
