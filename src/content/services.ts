import type { Service } from "./types";

/**
 * What the team sells. `icon` is a named export from `lucide-react`.
 *
 * Trim this to the services you genuinely want to be hired for — listing
 * everything reads as a freelancer marketplace, not a specialist team.
 */
export const services: Service[] = [
  {
    id: "product-design",
    title: "Product Design",
    description:
      "Research, user flows, interface design and a component system your developers can actually build from.",
    icon: "PenTool",
    deliverables: [
      "Discovery & user research",
      "Wireframes and high-fidelity screens",
      "Design system in Figma",
      "Interactive prototype",
    ],
  },
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Production web applications and marketing sites — fast, accessible and built to be maintained after we leave.",
    icon: "Code2",
    deliverables: [
      "Next.js / React applications",
      "Headless CMS integration",
      "Performance & Core Web Vitals work",
      "Accessibility to WCAG 2.2 AA",
    ],
  },
  {
    id: "mobile-development",
    title: "Mobile Apps",
    description:
      "Cross-platform iOS and Android apps from one codebase, shipped to both stores.",
    icon: "Smartphone",
    deliverables: [
      "React Native / Flutter builds",
      "Offline-first data sync",
      "App Store & Play Store release",
      "Crash reporting and analytics",
    ],
  },
  {
    id: "backend-cloud",
    title: "Backend & Cloud",
    description:
      "APIs, data models and infrastructure that hold up under real traffic and real audits.",
    icon: "Server",
    deliverables: [
      "REST & GraphQL API design",
      "Database architecture and migrations",
      "AWS / GCP infrastructure as code",
      "CI/CD pipelines and monitoring",
    ],
  },
];

export const getService = (id: string) => services.find((s) => s.id === id);
