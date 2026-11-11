import { processSteps } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * How the team works.
 *
 * The numbered markers earn their place here: this genuinely is a sequence, and
 * the order is information the reader needs. They'd be decoration on the
 * services or team grid, which is why neither has them.
 */
export function ProcessSection() {
  return (
    <section
      id="process"
      className="border-y border-surface-border bg-bg-elevated/40"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <SectionHeading
          eyebrow="How we work"
          title="Four stages, and you see progress at every one."
          lead="No black box. A working preview link lands at the end of every sprint, not at the end of the project."
        />

        <RevealGroup as="ol" className="mt-16 grid gap-px bg-surface-border md:grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-theme border border-surface-border">
          {processSteps.map((step) => (
            <RevealItem
              as="li"
              key={step.step}
              className="flex flex-col bg-bg px-6 py-8"
            >
              <span
                aria-hidden
                className="font-mono text-4xl font-bold tabular-nums text-accent/25"
              >
                {step.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {step.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
