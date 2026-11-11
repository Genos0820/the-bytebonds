# Portfolio — build plan

**Team:** 6 freelancers working as a collective
**Stack:** Next.js 16 (App Router) · React 19 · React Three Fiber · Tailwind CSS v4 · Motion · Lenis
**Status:** Phases 0–7 complete — the build is launch-ready apart from content. 29 prerendered routes, lint and production build clean, WCAG AA contrast verified at 0 failures. Still outstanding: the content in `src/content/*`, the Formspree form ID, and the real domain.

---

## Decisions already made

| Decision | Choice | Why |
|---|---|---|
| Framework | Next.js 16, App Router, TypeScript | Static generation per project/member page, real SEO, image optimization, one-command Vercel deploy |
| 3D approach | **Hero 3D + scroll motion** | One strong WebGL scene at the top, then scroll-driven 2D motion below. Keeps mobile usable and the content readable — a full 3D world looks better in a demo and worse to a client trying to read a case study |
| Styling | Tailwind v4 (CSS-first) + semantic tokens | Whole site reskins from one `data-theme` attribute |
| Content | Typed files in `src/content/` | Any of the six of you can edit a name, bio or project without touching a component |
| Visual direction | **midnight** — dark glass, violet/cyan accents, Space Grotesk | Chosen by the team. Gives the WebGL hero the most contrast to work against |
| 3D hero subject | Abstract faceted crystal + 6 satellites (one per member) | Provisional — decision 3 below. The satellites are the one piece of literal meaning in an abstract scene |
| Contact form | **Formspree** | No server code, no API key, no new dependencies. The form ID is public by design, so there is no secret to leak or rotate |

---

## Architecture

Content never lives in components. Every string, image path and link comes from
`src/content/*`, which is typed in `types.ts`. This matters for a six-person
team: editing the site is editing a data file, so nobody needs to understand
the 3D code to fix their own bio.

```
portfolio/
├── PLAN.md                     ← this file
├── CONTENT-CHECKLIST.md        ← what we need from you
├── public/
│   ├── team/                   member photos (800x800 min, square)
│   ├── work/<slug>/            project images (1920x1080 min, landscape)
│   └── models/                 .glb / .gltf 3D assets
└── src/
    ├── app/
    │   ├── layout.tsx          fonts, metadata, data-theme switch
    │   ├── page.tsx            home — one-page scroll narrative
    │   ├── work/
    │   │   ├── page.tsx        all projects
    │   │   └── [slug]/         case study (static per project)
    │   ├── team/
    │   │   ├── page.tsx        the six of us
    │   │   └── [slug]/         member profile (static per member)
    │   ├── services/page.tsx
    │   └── contact/page.tsx
    ├── components/
    │   ├── three/              WebGL — scenes, objects, canvas wrapper
    │   ├── sections/           home page sections (Hero, Work, Team, Process…)
    │   ├── cards/              ProjectCard, MemberCard, ServiceCard — shared
    │   │                       by the home sections AND the index pages
    │   ├── work/               WorkGrid (client-side category filter)
    │   ├── ui/                 primitives (Button, Chip, TiltCard, Reveal,
    │   │                       Marquee, PageHeader, SectionHeading)
    │   └── layout/             Navbar, Footer, SmoothScroll, Cursor
    ├── content/                ← ALL editable data
    │   ├── types.ts            the schema, fully commented
    │   ├── site.ts             name, contact, stats, process steps
    │   ├── team.ts             6 members
    │   ├── projects.ts         case studies
    │   └── services.ts         what you sell
    ├── hooks/
    ├── lib/
    └── styles/themes.css       3 visual directions as token sets
```

### Why case studies are static pages, not modals
Each project gets a real URL (`/work/<slug>`), prerendered at build time. A
client can be sent one link that loads instantly and previews properly in
WhatsApp, LinkedIn or email. Modals give you none of that.

---

## Roadmap

### Phase 0 — Foundation ✅ done
Scaffold, dependency install, route tree, content schema, three theme token
sets, clean production build (17 static pages).

### Phase 1 — Direction ✅ done
Team picked **midnight**. Typography locked to Space Grotesk + JetBrains Mono.

### Phase 2 — Layout shell ✅ done
Navbar with scroll-triggered glass and a mobile overlay (Escape-dismissable,
scroll-locked), footer, Lenis smooth scroll, trailing custom cursor, skip link.
Every motion feature is gated on `prefers-reduced-motion`.

### Phase 3 — 3D hero ✅ done
Faceted icosahedron with vertex displacement, a 900-point Fibonacci particle
shell, six floating satellites, three-point light rig, pointer-drift parallax.
Lazy-loaded behind `next/dynamic`, confined to the right 62% of the hero, with
a CSS backdrop that always renders underneath.

### Phase 4 — Home sections ✅ done
Hero → Services → Work showcase → Team grid → Process → Contact CTA, with
scroll reveals, staggered grids and tilt cards.

### Phase 5 — Detail pages ✅ done
- **`/work`** — filterable index. Category filters are real `<button>`s with
  `aria-pressed`, filtering client-side over data already in the page, with
  layout animation on reorder.
- **`/work/[slug]`** — full case study: back link, category, client/year, cover,
  metrics row, challenge/solution narrative with a label rail, gallery (only
  images that exist), team credits linking to profiles, previous/next
  navigation that wraps, per-project OG metadata.
- **`/team`** and **`/team/[slug]`** — index plus profile with large photo,
  stats, skills, socials, the projects they worked on, and the rest of the team.
- **`/services`**, **`/contact`** and a designed **404**.
- Cards extracted to `components/cards/` so the home sections and index pages
  render from one component each instead of duplicated markup.

### Phase 6 — Contact form ✅ done
Formspree. No server code, no API key, no new dependencies.

- Name, email, company, budget band and message, with a `_gotcha` honeypot and
  a `_subject` line for the forwarded email.
- **Progressive enhancement:** the `<form>` carries a real `action` and `method`,
  so with JavaScript off the browser posts straight to Formspree and gets its
  confirmation page. With JS, `onSubmit` intercepts and posts via fetch for
  inline feedback.
- Accessible: visible labels, `aria-invalid`, `aria-describedby` wiring each
  error to its field, `role="alert"` on submit failures, and focus moved to the
  first bad field.
- **Falls back gracefully:** with no `NEXT_PUBLIC_FORMSPREE_ID` set, the page
  renders the email address instead of a form that would silently fail. That is
  the current state — see "Before launch" below.

### Phase 7 — Polish ✅ done

**Discovery**
- `sitemap.ts` — generated from the content files, so a new project or member
  appears automatically. 14 URLs today.
- `robots.ts` — allows everything on production, and disallows *everything* on
  any `vercel.app` or localhost host, so preview deploys never compete with the
  real site in search results.
- JSON-LD: `Organization` site-wide, `Person` per member, `CreativeWork` per
  project, cross-linked by `@id` so search engines read this as one studio of
  six named people with a body of work.
- Canonical URLs on every page; one `siteUrl` helper feeds `metadataBase`, the
  sitemap, robots and the JSON-LD graph, so they cannot drift apart.

**Open Graph images**
Generated per page with `next/og` — one for the site, one per project (violet),
one per member (cyan, so a shared profile is visibly a person not a case study).
The pages deliberately do *not* set `openGraph.images`, which is what lets the
generated card win; a designed card carrying the title previews better in Slack
or LinkedIn than a cropped screenshot. **Note:** generation fetches a subsetted
font from Google Fonts at build time, so the build needs network access. That is
the documented Next.js approach and ~3.5KB per image.

**Accessibility — audited, not assumed**
Ran a hand-written audit in the browser (loading axe-core was blocked, so the
checks are bespoke):
- **Contrast was the real finding.** `--fg-subtle` measured 4.20:1 on `--bg` and
  3.83:1 on `--bg-elevated`, both under the 4.5:1 AA floor, and it carried the
  stat labels, chips, eyebrows and meta text — 43 failing text nodes. Raised to
  L=0.62 (5.32:1 / 4.86:1). Now **0 failures across 140 text nodes**, re-verified
  on the home page and a case study.
- Fixed a dangling `aria-controls` on the menu button: the overlay only mounts
  while open, so the reference pointed at nothing most of the time.
- Verified: one `h1` per page, no skipped heading levels, every image has `alt`,
  no interactive element without an accessible name, no duplicate IDs, no
  positive `tabindex`, correct landmarks, `lang="en"`.
- Skip link confirmed working: first Tab focuses it, it becomes visible, and
  `#main` exists.

**Not verified:** Lighthouse scores and Core Web Vitals — those need a deployed
URL on real network conditions, not a localhost dev server. Only the `midnight`
theme was contrast-audited; `paper` and `press` are unused and unchecked.

### Phase 8 — Deploy ← **we are here**
Vercel, custom domain, analytics. Blocked only on the domain decision and an
analytics choice — the build itself is ready to ship.

---

## Open decisions — I need answers before the phase they block

| # | Decision | Blocks | Options |
|---|---|---|---|
| 1 | **Team name & domain** | Phase 7 | Is the name decided? Is the domain bought? |
| 2 | **Content editing after launch** | — | Keep typed files and edit via git — free, needs a PR per change · Add Sanity/Contentful CMS — non-technical members edit in a browser, ~2 days extra work |
| 3 | **3D hero subject** | — | Currently an abstract crystal. Swap for your logo in 3D, or a device mockup, once branding exists |
| 4 | **Member photos** | — | Real photos (strongest) · Stylized 3D avatars · Monogram cards (the current fallback) |
| 5 | **Analytics** | Phase 8 | Vercel Analytics · Plausible (privacy-first, paid) · none |

## Before launch — things only you can do

1. **Create the Formspree form** at <https://formspree.io>, point its
   notification email at the shared inbox, and put the form ID in `.env.local`
   as `NEXT_PUBLIC_FORMSPREE_ID`. Until then the contact page shows the email
   address instead of a form. Copy `.env.example` to start.
2. **Send a real test enquiry** once the ID is set. I could not verify delivery
   end to end — that needs your account, and I avoided posting anything to
   Formspree from here.
3. **Fill in `src/content/*`** — see `CONTENT-CHECKLIST.md`.
4. **Set the real domain.** `site.url` is still `https://todo-your-domain.com`,
   which is what the sitemap, robots.txt and every canonical tag currently
   advertise. Either update `src/content/site.ts` or set `NEXT_PUBLIC_SITE_URL`
   on the host. Shipping with the placeholder would tell Google the wrong site
   exists, so this one is not optional.
5. **Run Lighthouse against the deployed URL** once it is live.

---

## Performance budget

A 3D portfolio that takes eight seconds to load loses the client it was built
to win.

**Measured** against the production build (`npm run build && npm start`), home
page, transfer-encoded bytes:

| | Scripts | JS transferred | WebGL canvas |
|---|---|---|---|
| Mobile (375px) | 9 | **210 KB** | none |
| Desktop (1440px) | 10 | **448 KB** | 1 |

So the 3D payload is **238 KB** and it is fetched only when the canvas actually
mounts — the lazy-load gate is doing its job, and a phone never pays for it.

Note this corrects the 180KB figure originally written here: the real non-3D
payload is 210KB. React 19 + Next's client runtime + Motion is most of it. Worth
revisiting in Phase 7 if it matters, but it is not a blocker.

Still to verify in Phase 7:
- First Contentful Paint < 1.2s on 4G
- Largest Contentful Paint < 2.5s
- Lighthouse ≥ 95

Already enforced in code:
- No WebGL below 768px or under `prefers-reduced-motion` — CSS backdrop instead
- Smooth scroll, custom cursor and tilt all disabled under reduced motion
- `dpr` capped at 1.6; core geometry is ~320 triangles; one draw call for 900 particles

---

## Known maintenance note

`npm audit` reports 7 moderate advisories, all tracing to one transitive
`minimatch` ReDoS inside the ESLint toolchain. Dev-time only — none of it
reaches the browser bundle. It clears when `typescript-eslint` ships an
updated dependency; no action needed.

---

## Commands

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```
