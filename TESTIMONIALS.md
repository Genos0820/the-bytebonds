# Getting testimonials that actually help

The site is built for these. `TestimonialsSection` renders on the home page and
each quote also appears on its project's case study. Both render nothing while
`testimonials` in `src/content/site.ts` is empty, so the site is complete
without them and improves the moment one arrives.

## The one rule

Every quote must be real, from a real person, who has seen the exact wording
and agreed to it going on this site.

That rule isn't about ethics in the abstract, it's about what a testimonial is
*for*. A client reading your site already assumes you'll say your work is good.
The only thing a quote adds is that **someone else** said it — so the only
property that matters is that it can be checked. A quote that can't survive a
prospective client emailing the journal to ask is worth less than no quote,
because it puts your three genuine projects next to something invented.

Two practical consequences:

- **Fabricated endorsements are a legal problem, not just a reputational one.**
  In India they fall under misleading advertising and unfair trade practice
  provisions of the Consumer Protection Act 2019, and the BIS guidelines on
  online reviews (IS 19000:2022) cover exactly this. The person with standing
  to complain is the client you named.
- **The people you'd be quoting are identifiable and reachable.** NJLRII lists
  its editorial board publicly. Kaale Coat Wale has a contact page. Anyone
  considering hiring you can reach both in under a minute.

## Start here: the one that's worth the most

**A LinkedIn recommendation beats everything else on this page.** It's public,
it carries the client's own name and photo, it's dated, and nobody has to take
your word for it. Paste the text here, set `sourceUrl` to the LinkedIn URL, and
the card renders a "Verify" link.

Ask for the recommendation on the *person's* profile (whoever on the team led
that project), not the team page. People are far more willing to recommend a
person than to endorse a company.

Second best: a Google review on the client's own business listing, or a public
post. Third: a private email you have permission to quote (no `sourceUrl`,
which is fine — most testimonials on most sites are this).

## Why most teams have none

Not because clients say no. Because "could you write us a testimonial?" hands
the client a blank page and a writing task, and it sits in their drafts
forever.

Fix: **ask specific questions, then offer to draft from their answers.** The
client's job becomes replying to four short questions and approving a
paragraph. Reply rates go from maybe 1 in 5 to most of them.

## Ready to send

Three messages below, one per project. Send from the person who actually
worked with that client, not a shared inbox — it reads as a note from someone
they know, which is what it is.

---

### NJLRII — to the editor or whoever commissioned the platform

> Subject: Quick favour — two minutes
>
> Hi [name],
>
> We're putting together a site for our team and we'd like to include NJLRII
> as one of the projects we're proudest of. Would you be happy for us to
> mention it, with a line from you?
>
> I don't want to hand you a writing job, so if it's easier — just reply to
> these, a sentence each is plenty:
>
> 1. What was the situation before? (How were submissions and issues being
>    handled?)
> 2. What's different now, day to day?
> 3. Was there anything you were worried about before starting that turned out
>    fine — or anything we could have done better?
> 4. If a colleague at another journal asked whether to work with us, what
>    would you tell them?
>
> I'll turn your answers into two or three sentences and send them back for
> your approval — nothing goes up until you've seen the exact wording and said
> yes. Happy to drop it entirely if you'd rather not, no awkwardness either
> way.
>
> Thanks,
> [name]

---

### Kaale Coat Wale — to the founder

> Subject: Would you vouch for us?
>
> Hi [name],
>
> We're building out our team's portfolio site and kaalecoatwale.com is one of
> three projects on it. Would you be okay with us featuring it, and would you
> be willing to say a few words we could quote?
>
> Four questions, a sentence each is fine:
>
> 1. What were you trying to fix when you came to us?
> 2. What's the site doing for the business now — enquiries, students signing
>    up, anything you've noticed?
> 3. What was it like working with us, honestly?
> 4. Would you work with us again, and on what?
>
> I'll draft something from your answers and send it over before anything is
> published — your call on the final wording.
>
> One separate thing worth flagging: the bare domain kaalecoatwale.com is
> serving an expired TLS certificate, so anyone typing it without the www gets
> a browser security warning. The www version is fine. Happy to point your host
> at the fix.
>
> Thanks,
> [name]

---

### One8Data

If One8Data is your own product rather than client work, don't ask for a
testimonial — ask a **user** of it instead. A line from someone at a company
running it ("we had governed APIs on our own tables in an afternoon") is worth
more than a quote from yourselves, and it's the only one of the three where you
could also publish a usage number honestly.

If it was built for a client, use the NJLRII message with the questions
swapped for these:

> 1. What were you doing before to get data out to the teams that needed it?
> 2. What changed about who can get an API and how long it takes?
> 3. Governance was the hard part of this — does it do what you needed it to?
> 4. Would you recommend it to another data team?

## When a reply lands

Draft two or three sentences from their words. Keep *their* phrasing — a quote
that sounds like marketing copy reads as written-by-you even when it isn't.
Send it back: "Does this sound like you? Change anything you like." Publish
only after they say yes.

Then paste into `testimonials` in `src/content/site.ts`:

```ts
export const testimonials: Testimonial[] = [
  {
    quote:
      "Their exact approved words, two or three sentences.",
    author: "Full Name",
    authorRole: "Editor-in-Chief, NJLRII",
    projectSlug: "njlrii", // also shows it on that case study
    date: "March 2026",
    sourceUrl: "https://linkedin.com/in/...", // only if public — renders "Verify"
    avatar: "/testimonials/name.jpg", // optional, drop a square photo in public/testimonials/
  },
];
```

Keep the approval email. If anyone ever asks, you want to be able to produce
it.

## What actually makes the site credible before any of this lands

Testimonials are one signal and not the fastest one. These are all true today
and cost nothing:

- **Three live URLs anyone can click.** Most portfolios at this stage have
  screenshots of things that aren't online. Yours are real and running.
- **Named people with real roles.** Six specialists who can be looked up beats
  an anonymous "we".
- **Real numbers, once you have them.** The `metrics` array on each project is
  still empty. Two honest figures per project — issues published, APIs created,
  pages indexed, whatever you can actually count — will convince a client more
  than three warm quotes. If you didn't instrument it, leave it out.

Get one real quote and the section turns on. Get three and it carries the page.
