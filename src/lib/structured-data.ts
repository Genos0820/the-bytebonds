import { site } from "@/content/site";
import { services } from "@/content/services";
import type { Project, TeamMember } from "@/content/types";
import { categoryLabels } from "@/lib/categories";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

/**
 * JSON-LD builders.
 *
 * Search engines use these to understand that this is one organisation made of
 * six named people with a body of work, rather than six unrelated pages. It is
 * also what powers the knowledge-panel style results for a studio name.
 */

/** Profile URLs for `sameAs`. Email is an identity, not a profile — excluded. */
const profileUrls = (socials: { platform: string; url: string }[]) =>
  socials.filter((s) => s.platform !== "email").map((s) => s.url);

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: site.name,
    url: siteUrl,
    description: site.description,
    ...(site.contactEmail ? { email: site.contactEmail } : {}),
    ...(site.phone ? { telephone: site.phone } : {}),
    slogan: site.tagline,
    sameAs: profileUrls(site.socials),
    numberOfEmployees: { "@type": "QuantitativeValue", value: 6 },
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
      },
    })),
  };
}

export function personSchema(member: TeamMember) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl(`/team/${member.slug}#person`),
    name: member.name,
    url: absoluteUrl(`/team/${member.slug}`),
    jobTitle: member.role,
    description: member.bio,
    knowsAbout: member.skills,
    sameAs: profileUrls(member.socials),
    worksFor: { "@id": `${siteUrl}/#organization` },
    ...(member.location ? { homeLocation: member.location } : {}),
  };
}

export function projectSchema(project: Project, teamMembers: TeamMember[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": absoluteUrl(`/work/${project.slug}#work`),
    name: project.title,
    url: absoluteUrl(`/work/${project.slug}`),
    description: project.summary,
    abstract: project.challenge,
    genre: categoryLabels[project.category],
    dateCreated: String(project.year),
    keywords: project.stack.join(", "),
    creator: { "@id": `${siteUrl}/#organization` },
    contributor: teamMembers.map((member) => ({
      "@type": "Person",
      name: member.name,
      url: absoluteUrl(`/team/${member.slug}`),
    })),
  };
}

/**
 * Serialises a schema object for embedding in a `<script>`.
 *
 * `<` is escaped so a stray `</script>` in any content field cannot close the
 * tag early and inject markup. The content is ours, but it is edited by six
 * people in a data file, and this costs nothing.
 */
export const serializeSchema = (schema: object) =>
  JSON.stringify(schema).replace(/</g, "\\u003c");
