import type { ProcessStep, SiteConfig, Testimonial } from "./types";

/**
 * PLACEHOLDER — replace every value marked TODO before launch.
 * See CONTENT-CHECKLIST.md in the project root.
 */
export const site: SiteConfig = {
  name: "The ByteBonds",
  tagline: "A collective of six builders",
  description:
    "The ByteBonds is a six-person team of backend, DevOps, AI/ML, frontend and QA engineers building web platforms, data products and cloud systems for clients worldwide.",
  url: "https://genos0820.github.io/the-knights-portfolio",
  // contactEmail: "hello@your-domain.com", // TODO — set when a shared inbox exists
  location: "India — working worldwide",
  socials: [{ platform: "github", url: "https://github.com/Genos0820" }],
  stats: [
    { label: "Projects delivered", value: "8" },
    { label: "Years combined experience", value: "28" },
    { label: "Specialists on the team", value: "6" },
    { label: "Client retention", value: "100%" },
  ],
  hero: {
    kicker: "Six specialists · One delivery team",
    headline: "We build the thing you keep putting off.",
    lead: "Design, web, mobile, backend and cloud under one contract. No hand-offs between agencies, no gaps where the work falls through.",
    marquee: [
      "Product Design",
      "Next.js",
      "React Native",
      "Node.js",
      "Python",
      "AWS",
      "Design Systems",
      "GraphQL",
      "Kubernetes",
      "Test Automation",
    ],
  },
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We map the problem, the users and the constraints before writing a line of code. You get a written scope and a fixed estimate.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Wireframes, then high-fidelity screens and a component system. You review and sign off before build starts.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Two-week sprints with a working preview link after each one. You see progress continuously, not at the end.",
  },
  {
    step: "04",
    title: "Launch & support",
    description:
      "We ship, monitor and hand over documentation. Ongoing support and iteration available on retainer.",
  },
];

/** Leave empty until you have real, attributable quotes. Never invent these. */
export const testimonials: Testimonial[] = [];
