import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function ContactCTA() {
  return (
    <section id="contact" className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 120% at 50% 110%, color-mix(in oklab, var(--accent) 26%, transparent), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-4xl px-6 py-28 text-center sm:py-36">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.22em] text-accent uppercase">
            Next step
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 text-3xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Tell us what you&rsquo;re building.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-lg text-base text-fg-muted sm:text-lg">
            Send over the brief, however rough. We&rsquo;ll come back within two
            working days with questions and a view on scope.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact">
              Start a project
              <ArrowRight size={16} aria-hidden />
            </Button>
            {site.contactEmail && (
              <Button href={`mailto:${site.contactEmail}`} variant="ghost">
                {site.contactEmail}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
