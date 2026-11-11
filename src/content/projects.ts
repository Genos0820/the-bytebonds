import type { Project } from "./types";

/**
 * Case studies.
 *
 * Titles, summaries, categories and live URLs were written from the live sites.
 * The challenge/solution text, client names, team assignments and "stack" chips
 * were DRAFTED on the team's instruction from what the sites show — review them
 * and correct anything that differs from what really happened. Two things are
 * deliberately not invented: `metrics` (empty hides the row — add real numbers
 * when you have them) and tech that can't be seen from outside (the stack chips
 * on NJLRII and Kaale Coat Wale list capabilities, not frameworks).
 */
export const projects: Project[] = [
  {
    slug: "one8data",
    title: "One8Data Databricks APIs",
    client: "One8Data",
    year: 2025,
    category: "data-platform",
    summary:
      "A native Databricks app that turns Unity Catalog tables into governed REST APIs, with no code.",
    challenge:
      "Exposing warehouse data as an API usually means a shared service account — which quietly bypasses the access rules the data team spent months defining. The goal was APIs where every call runs as the caller's own Databricks identity, so Unity Catalog permissions keep applying.",
    solution:
      "We built it as a native Databricks app that runs inside the customer's own workspace, so data never leaves their boundary. A no-code dataset builder turns Unity Catalog tables into REST endpoints, and the engine is deliberately read-only for now — a smaller surface to secure while the model proves itself.",
    metrics: [],
    stack: ["Databricks", "Unity Catalog", "SQL", "REST APIs", "Python"],
    cover: "/work/one8data_hd.jpg",
    gallery: [],
    team: [
      "prajjwal-tawri",
      "milind-sahu",
      "ashwani-singh",
      "milind-thakur",
      "ankit-paul",
    ],
    liveUrl: "https://one8data.com",
    featured: true,
  },
  {
    slug: "njlrii",
    title: "NJLRII",
    client: "National Journal for Legal Research and Innovative Ideas",
    year: 2025,
    category: "web-app",
    summary:
      "A publishing platform for an academic legal journal — seven volumes of issues, peer review and open submissions.",
    challenge:
      "An academic journal lives or dies on process: submissions arrive continuously, peer review has to stay organised, and seven volumes of back-issues must remain findable for researchers. The brief was to bring all of that into one dependable, credible-looking home.",
    solution:
      "We built a publishing platform with a clean issue archive by volume, an open submissions pipeline, pages for each editorial board and the journal's published policies. Structure and typography were kept deliberately plain and scholarly so the research, not the interface, takes centre stage.",
    metrics: [],
    stack: [
      "Issue Archive",
      "Submissions Workflow",
      "Peer Review",
      "Responsive Design",
      "SEO",
    ],
    cover: "/work/njlrid_hd.jpg",
    gallery: [],
    team: ["milind-sahu", "fatma-dalvi", "ankit-paul"],
    liveUrl: "https://njlrii.com",
    featured: true,
  },
  {
    slug: "kaale-coat-wale",
    title: "Kaale Coat Wale",
    client: "Kaale Coat Wale",
    year: 2025,
    category: "website",
    summary:
      "A legal-tech platform pairing legal education with corporate advisory — company registration, trademarks and drafting.",
    challenge:
      "The brand began as a student-focused legal initiative and grew into corporate advisory. The site had to speak to both audiences — learners and founders — without feeling like two businesses stitched together.",
    solution:
      "We organised the site around clear service pages for company registration, trademarks and drafting, kept a blog for legal explainers, and gave the Academy its own section — one coherent brand with a clear path for each type of visitor.",
    metrics: [],
    stack: ["Content Management", "Blog", "Responsive Design", "SEO"],
    cover: "/work/kaale_coat_wale_hd.jpg",
    gallery: [],
    team: ["fatma-dalvi", "ashwani-singh", "ankit-paul"],
    // NOTE: the bare domain kaalecoatwale.com serves an expired TLS certificate,
    // so it is linked via www, which does not. Worth fixing at the DNS/host end —
    // anyone typing the bare domain gets a browser security warning.
    liveUrl: "https://www.kaalecoatwale.com",
    featured: true,
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const featuredProjects = () => projects.filter((p) => p.featured);

export const projectsByMember = (memberSlug: string) =>
  projects.filter((p) => p.team.includes(memberSlug));

/**
 * The project before and after this one, for case-study footer navigation.
 *
 * Wraps around, so the last project's "next" is the first. A dead end at the
 * bottom of a case study is a dead end in the funnel — there should always be
 * somewhere else to go.
 */
export function adjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };

  const { length } = projects;
  return {
    previous: projects[(index - 1 + length) % length],
    next: projects[(index + 1) % length],
  };
}

/** Categories actually present in the content, in the order they first appear. */
export function usedCategories() {
  return [...new Set(projects.map((p) => p.category))];
}
