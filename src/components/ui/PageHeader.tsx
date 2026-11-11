import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/**
 * The opener for interior pages.
 *
 * Uses `immediate` reveals throughout: this is always above the fold, so it must
 * never wait on a scroll observer to become visible.
 *
 * The top padding clears the fixed navbar (`h-18`), which sits outside normal
 * flow and would otherwise overlap the eyebrow.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Optional meta row rendered under the lead. */
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "relative isolate overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16",
        className,
      )}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div
          className="absolute -top-40 right-0 h-[26rem] w-[26rem] translate-x-1/3 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--accent) 36%, transparent) 0%, transparent 68%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <Reveal immediate>
          <p className="font-mono text-xs tracking-[0.22em] text-accent uppercase">
            {eyebrow}
          </p>
        </Reveal>
        <Reveal immediate delay={0.08}>
          <h1 className="mt-5 max-w-4xl text-4xl leading-[1.04] font-bold tracking-tight text-balance sm:text-6xl">
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal immediate delay={0.16}>
            <p className="mt-6 max-w-xl text-base text-fg-muted sm:text-lg">
              {lead}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal immediate delay={0.24}>
            <div className="mt-8">{children}</div>
          </Reveal>
        )}
      </div>
    </header>
  );
}
