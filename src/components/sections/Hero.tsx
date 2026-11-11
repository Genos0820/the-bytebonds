import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * The opener.
 *
 * Deliberately NOT `min-h-screen`. A full-viewport hero means the first thing a
 * visitor sees contains no evidence the site continues — the stats row peeking
 * above the fold is what tells them to scroll.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-16 sm:pt-44">
      <HeroCanvas />

      <div className="mx-auto max-w-7xl px-6">
        <Reveal immediate>
          <p className="font-mono text-xs tracking-[0.22em] text-accent uppercase">
            {site.hero.kicker}
          </p>
        </Reveal>

        <Reveal immediate delay={0.08}>
          <h1 className="mt-6 max-w-4xl text-4xl leading-[1.02] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {site.hero.headline}
          </h1>
        </Reveal>

        <Reveal immediate delay={0.16}>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            {site.hero.lead}
          </p>
        </Reveal>

        <Reveal immediate delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="/contact">
              Start a project
              <ArrowRight size={16} aria-hidden />
            </Button>
            <Button href="/work" variant="ghost">
              See our work
            </Button>
          </div>
        </Reveal>

        <RevealGroup
          immediate
          delay={0.3}
          as="ul"
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-theme border border-surface-border bg-surface-border lg:grid-cols-4"
        >
          {site.stats.map((stat, index) => (
            <RevealItem
              as="li"
              key={`${stat.label}-${index}`}
              className="bg-bg-elevated px-5 py-6"
            >
              <p className="font-mono text-[0.65rem] tracking-[0.16em] text-fg-subtle uppercase">
                {stat.label}
              </p>
              <p className="mt-2 text-3xl font-bold tabular-nums text-accent sm:text-4xl">
                {stat.value}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <Marquee items={site.hero.marquee} className="mt-16" />
    </section>
  );
}
