# What I need from you

## Current status (updated)

**In and live on the site:**
- **Team name: The Knights.** Drives the logo, every page title, the footer and
  the OG images.
- 5 members by name and role: Prajjwal Tawri (Backend/Go), Milind Sahu
  (Backend/Django), Ashwani Singh (DevOps), Milind Thakur (AI/ML), Fatma Dalvi.
- 3 projects with real titles, summaries, categories and live links: One8Data,
  NJLRII, Kaale Coat Wale. Summaries were written from the live sites.

**Blocking, smallest first:**
1. **Fatma Dalvi's role** — currently renders as `TODO_ROLE` on her card, her
   profile and her OG image.
2. **The sixth member**, or tell me the team is five and I'll remove the slot
   and fix the "six specialists" copy.
3. **Tagline and description** — still placeholder. The description is your
   Google result and your link preview, so it is worth 10 minutes.
4. **Domain** — `site.url` is still `https://todo-your-domain.com`, which every
   canonical tag and the sitemap currently advertise.

**Design coverage (resolved):** Milind Sahu, Prajjwal Tawri and Ashwani Singh cover design and architecture; Fatma and Ankit cover frontend and QA/data. Confirm whether "Product Design" in `services.ts` means visual UI design — if so, say who owns it.

Everything below maps to a file in `src/content/`. You can paste answers to me
in chat and I'll fill the files in, or edit the files directly — they're
commented with the rules for each field.

**Priority order:** Block A and B unblock the whole build. C and D can arrive
later without holding anything up.

---

## Block A — The team identity (blocks everything)

→ goes into `src/content/site.ts`

1. **Team name** — what do the six of you trade as?
2. **One-line tagline** — under 60 characters, goes next to the logo
   *e.g. "Six specialists. One delivery team."*
3. **Description** — 150–160 characters. This is your Google search result and
   your WhatsApp/LinkedIn link preview. Say what you build and for whom.
4. **Contact email** — the shared one, not a personal inbox
5. **Phone** — optional, E.164 format (`+919876543210`)
6. **Location** — *e.g. "Pune, India — working worldwide"*
7. **Domain** — bought already, or still deciding?
8. **Team-level social links** — shared GitHub org / LinkedIn page / Instagram
9. **Four headline stats** — these carry real weight with clients:
   - Projects delivered: ___
   - Combined years of experience: ___
   - Specialists on the team: 6
   - One more of your choosing (client retention %, countries served, …)
10. **Logo** — SVG if you have one. If not, say so and I'll set type-only branding.

---

## Block B — The six members (blocks the team section)

→ goes into `src/content/team.ts`

**Copy this block six times, once per person:**

```
Name:
Role:                 (short — "Backend & Infrastructure", not a job title essay)
Tagline:              (one line, under 90 chars, what they're known for)
Bio:                  (2-4 sentences, third person. What they do, the problems
                       they like, one concrete thing they've shipped.)
Skills:               (5-8, most important first — these render as chips)
Years of experience:
Location:
Links:                (GitHub / LinkedIn / Dribbble / personal site / X)
Projects worked on:   (which of the projects in Block C)
Photo:                (see spec below)
```

### Photo spec
- **Square**, minimum 800×800px
- Consistent across all six — same background treatment, similar crop, similar
  lighting. Six photos in six different styles is the single most common thing
  that makes a team page look amateur.
- JPG or PNG, under 2MB each (I'll compress and convert to WebP/AVIF)
- Name them `member-<slug>.jpg` and drop them in `public/team/`
- **No good photos?** Tell me and we use monogram cards or stylized 3D avatars
  instead — a consistent fallback beats inconsistent photos.

---

## Block C — Projects / case studies (blocks the work section)

→ goes into `src/content/projects.ts`

Three strong case studies beat ten thin ones. A client who reads two detailed
write-ups is more convinced than one who skims a wall of logos.

**Copy this block per project:**

```
Title:
Client:               (or "Confidential" if under NDA)
Year:
Category:             web-app | mobile-app | website | branding | ai-ml |
                      e-commerce | data-platform
Summary:              (one line, under 100 chars)
Challenge:            (2-3 sentences — what they needed and WHY IT WAS HARD.
                       Name the real constraint: legacy system, hard deadline,
                       scale, compliance. This is the part clients read.)
Solution:             (2-4 sentences — what you built and the key decisions.
                       Name trade-offs, not just the tool list.)
Metrics:              (2-4 measurable outcomes — "Load time: -62%",
                       "Signups: +3.4x", "Support tickets: -40%".
                       Numbers are what convert. Estimate honestly if you
                       didn't instrument it, or leave it out — don't invent.)
Tech stack:
Live URL:             (optional)
Repo URL:             (optional)
Which members:
Featured on homepage?: yes / no   (keep 3-6 as yes)
Images:               (see spec below)
```

### Project image spec
- **Cover:** landscape, minimum 1920×1080
- **Gallery:** 2–5 more screenshots, same width
- Real product screenshots beat laptop-mockup stock images
- NDA work: blur or redact the sensitive parts and say so — a redacted real
  screenshot still carries more weight than a generic placeholder
- Drop them in `public/work/<project-slug>/`

---

## Block D — Positioning (lower priority, easy to change later)

→ goes into `src/content/services.ts` and `site.ts`

11. **Services** — I've drafted four (Product Design, Web Development, Mobile
    Apps, Backend & Cloud) with deliverables for each. Review and tell me what
    to cut, add or reword. Trim to what you want to be *hired for* — listing
    everything reads as a freelancer marketplace, not a specialist team.
12. **Process** — I've drafted a four-step Discovery → Design → Build → Launch.
    Does that match how you actually work?
13. **Testimonials** — real, attributable quotes only (quote, name, role,
    company). I've left this array empty deliberately; invented testimonials are
    a liability, not a feature. Skip the section entirely if you have none yet.
14. **Engagement model** — do you want to state it? Hourly / fixed-price /
    retainer, typical project size, typical timeline. Stating it filters out
    bad-fit enquiries before they reach your inbox.

---

## Decisions to make (from PLAN.md)

- [x] ~~**Visual direction**~~ — midnight
- [x] ~~**Contact form**~~ — Formspree
- [ ] **Formspree form ID** — create the form and send me the ID (or put it in `.env.local`)
- [ ] **CMS or git-based editing** — do non-technical members need to edit copy?
- [ ] **3D hero subject** — keep the abstract crystal, or swap in your logo once branding exists
- [ ] **Analytics** — Vercel / Plausible / none

---

## How to send it

Paste it in chat in any format, or fill the `src/content/*.ts` files directly —
they're typed, so your editor will flag anything missing. Images go straight
into `public/team/` and `public/work/<slug>/`.

Partial is fine. Send Block A and one complete member entry and I can start
Phase 2 immediately.
