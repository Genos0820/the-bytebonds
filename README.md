# Portfolio

Portfolio site for a six-person freelance collective.

**Next.js 16 · React 19 · React Three Fiber · Tailwind CSS v4 · Motion · Lenis**

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

`.env.local` is optional — the site runs without it. The only variable that
changes behaviour today is `NEXT_PUBLIC_FORMSPREE_ID`: set it and the contact
page renders the enquiry form, leave it unset and the page shows the email
address instead.

## Where things live

| Path | What it holds |
|---|---|
| `src/content/` | **All editable data** — team, projects, services, site config. Start here. |
| `src/content/types.ts` | The schema, with the rules for every field |
| `src/styles/themes.css` | Three visual directions as token sets |
| `src/components/three/` | WebGL scenes |
| `src/components/sections/` | Home page sections |
| `src/components/cards/` | ProjectCard / MemberCard / ServiceCard — shared by sections and index pages |
| `src/components/work/` | WorkGrid — client-side category filter |
| `src/components/ui/` | Primitives (Button, Chip, Reveal, TiltCard, PageHeader…) |
| `public/team/` | Member photos (square, 800×800 min) |
| `public/work/<slug>/` | Project images (landscape, 1920×1080 min) |

## Changing the look

Set `data-theme` on `<html>` in `src/app/layout.tsx`:

```tsx
<html lang="en" data-theme="midnight">   // "midnight" | "paper" | "press"
```

Components reference semantic tokens (`bg-bg`, `text-fg-muted`, `text-accent`)
rather than raw colors, so the whole site reskins from that one attribute.

## Updating content

Edit the files in `src/content/`. No component changes needed — nothing is
hard-coded in JSX.

## Docs

- [PLAN.md](PLAN.md) — architecture, roadmap, open decisions, performance budget
- [CONTENT-CHECKLIST.md](CONTENT-CHECKLIST.md) — what content is still needed

## Commands

```bash
npm run dev
npm run build
npm run lint
```

## Deploying to GitHub Pages

The site is exported as static HTML and served from the `gh-pages` branch at
`https://genos0820.github.io/the-knights-portfolio/`.

```bash
npm run deploy      # builds with the /the-knights-portfolio base path and pushes gh-pages
```

For a custom domain later: build with `npm run build` (no base path), set
`NEXT_PUBLIC_SITE_URL` to the domain, and add a `CNAME` file under `public/`.
