import type { TeamMember } from "./types";

/**
 * The team.
 *
 * Names, roles and the core technologies came from the team. The taglines, bios,
 * experience figures (summing to the 28 combined years on the home page),
 * locations and project assignments were DRAFTED on the team's instruction and
 * should be reviewed by each person — edit freely, they're plain strings.
 * Socials and photos are intentionally empty until real links/photos exist.
 *
 * Slugs are derived from full names, not first names, because two members share
 * the first name Milind. Once live, a slug must not change or shared links break.
 */
export const team: TeamMember[] = [
  {
    slug: "prajjwal-tawri",
    name: "Prajjwal Tawri",
    role: "Backend Engineering",
    tagline: "Designs the architecture, then builds the Go services behind it.",
    bio: "Prajjwal leads solution design and architecture, then ships the backend systems in Go, with a focus on clean API contracts, predictable performance and code that is easy to operate. He enjoys the unglamorous problems — data modelling, concurrency, failure handling — that decide whether a product holds up under real traffic.",
    avatar: "/team/prajjwal-tawri.jpg",
    skills: ["Go", "Solution Architecture", "System Design", "REST APIs", "Microservices", "PostgreSQL"],
    yearsExperience: 5,
    location: "India",
    socials: [],
    projects: ["one8data"],
  },
  {
    slug: "milind-sahu",
    name: "Milind Sahu",
    role: "Backend Engineering",
    tagline: "Architects and builds Python/Django products around real workflows.",
    bio: "Milind shapes product and system design and builds the backends in Python and Django, from submission pipelines and editorial workflows to the admin tooling teams use every day. He likes turning messy, multi-step processes into systems that are simple to use and straightforward to maintain.",
    avatar: "/team/milind-sahu.jpg",
    skills: ["Python", "Django", "System Design", "Solution Architecture", "REST APIs", "PostgreSQL"],
    yearsExperience: 5,
    location: "India",
    socials: [],
    projects: ["njlrii", "one8data"],
  },
  {
    slug: "ashwani-singh",
    name: "Ashwani Singh",
    role: "DevOps & Infrastructure",
    tagline: "Designs cloud architecture and automates the path to production.",
    bio: "Ashwani designs the cloud and deployment architecture and owns delivery infrastructure: CI/CD pipelines, containerised deployments, monitoring and cloud setup. His goal is boring releases — repeatable, observable and easy to roll back — so the rest of the team can ship without fear.",
    avatar: "/team/ashwani-singh.jpg",
    skills: ["Cloud Architecture", "CI/CD", "Docker", "Kubernetes", "AWS", "Terraform"],
    yearsExperience: 6,
    location: "India",
    socials: [],
    projects: ["one8data", "kaale-coat-wale"],
  },
  {
    slug: "milind-thakur",
    name: "Milind Thakur",
    role: "AI & Machine Learning",
    tagline: "Turns data into models that earn their place in production.",
    bio: "Milind works on machine-learning systems end to end — framing the problem, preparing data, training and evaluating models, then getting them into production. He favours simple baselines first and measurable improvements over impressive-sounding complexity.",
    avatar: "/team/milind-thakur.jpg",
    skills: ["Machine Learning", "Python", "Deep Learning", "NLP", "Model Evaluation", "MLOps"],
    yearsExperience: 5,
    location: "India",
    socials: [],
    projects: ["one8data"],
  },
  {
    slug: "fatma-dalvi",
    name: "Fatma Dalvi",
    // Role was not supplied — drafted as frontend/UI so the team covers the
    // design-and-interface side that the services page promises. Confirm.
    role: "Frontend & UI Engineering",
    tagline: "Crafts accessible, responsive interfaces that feel considered.",
    bio: "Fatma builds the part of the product people actually touch: responsive layouts, component systems and interactions that stay fast and accessible. She cares about the details — spacing, states, keyboard use — that separate a site that works from one that feels right.",
    avatar: "/team/fatma-dalvi.jpg",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "UI Design", "Accessibility"],
    yearsExperience: 4,
    location: "India",
    socials: [],
    projects: ["njlrii", "kaale-coat-wale"],
  },
  {
    slug: "ankit-paul",
    name: "Ankit Paul",
    role: "QA & Data Engineering",
    tagline: "Makes sure the data is right and the product behaves before users see it.",
    bio: "Ankit works across quality and data: building automated test suites and release checks, and the pipelines that move and validate data. Having both hats means bugs get caught early and the numbers a product shows can be trusted.",
    avatar: "/team/ankit-paul.jpg",
    skills: ["Test Automation", "Data Pipelines", "SQL", "Python", "API Testing", "Data Quality"],
    yearsExperience: 3,
    location: "India",
    socials: [],
    projects: ["one8data", "njlrii", "kaale-coat-wale"],
  },
];

export const getMember = (slug: string) => team.find((m) => m.slug === slug);
