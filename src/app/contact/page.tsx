import type { Metadata } from "next";
import { processSteps, site } from "@/content/site";
import { formspreeEndpoint } from "@/lib/contact";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with the team. Send the brief, however rough — we reply within two working days.",
};

export default function ContactPage() {
  const endpoint = formspreeEndpoint();

  return (
    <main>
      <PageHeader
        eyebrow="Next step"
        title="Tell us what you're building."
        lead="Send over the brief, however rough. We'll come back within two working days with questions and a view on scope."
      />

      <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal>
            {endpoint ? (
              <ContactForm endpoint={endpoint} />
            ) : (
              /* No form ID configured yet. Rather than render a form that
                 silently fails on submit, point people at the inbox directly. */
              <div className="glass flex flex-col gap-4 p-8">
                <h2 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                  Email us
                </h2>
                {site.contactEmail && (
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="text-2xl font-bold tracking-tight break-words transition-colors hover:text-accent sm:text-3xl"
                  >
                    {site.contactEmail}
                  </a>
                )}
                <p className="text-sm text-fg-muted">
                  Tell us the problem, who it&rsquo;s for, and any deadline
                  you&rsquo;re working to.
                </p>
                <p className="mt-4 border-t border-surface-border pt-4 font-mono text-[0.65rem] tracking-wider text-fg-subtle uppercase">
                  Form pending setup — see .env.example
                </p>
              </div>
            )}
          </Reveal>

          <div className="flex flex-col gap-12">
            <Reveal delay={0.1}>
              <div>
                <h2 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                  Or reach us directly
                </h2>
                {site.contactEmail && (
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="mt-4 block font-mono text-sm break-words text-fg-muted transition-colors hover:text-accent"
                  >
                    {site.contactEmail}
                  </a>
                )}
                {site.phone && (
                  <a
                    href={`tel:${site.phone}`}
                    className="mt-2 block font-mono text-sm text-fg-muted transition-colors hover:text-accent"
                  >
                    {site.phone}
                  </a>
                )}
                <p className="mt-5 font-mono text-xs tracking-wider text-fg-subtle uppercase">
                  {site.location}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div>
                <h2 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                  What happens next
                </h2>
                <RevealGroup
                  as="ol"
                  className="mt-6 flex flex-col gap-6"
                  step={0.08}
                >
                  {processSteps.map((step) => (
                    <RevealItem as="li" key={step.step} className="flex gap-5">
                      <span
                        aria-hidden
                        className="font-mono text-sm font-bold tabular-nums text-accent/40"
                      >
                        {step.step}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold tracking-tight">
                          {step.title}
                        </span>
                        <span className="mt-1.5 block text-sm leading-relaxed text-fg-muted">
                          {step.description}
                        </span>
                      </span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}
