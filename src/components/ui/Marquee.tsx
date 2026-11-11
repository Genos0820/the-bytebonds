import { cn } from "@/lib/cn";

/**
 * An endlessly scrolling strip.
 *
 * The item list is rendered twice and the track translates exactly -50%, so the
 * second copy lands precisely where the first began — that is what makes the
 * loop seamless. The duplicate is `aria-hidden`, so a screen reader hears the
 * list once.
 *
 * Pure CSS animation, so `prefers-reduced-motion` in globals.css stops it.
 */
export function Marquee({
  items,
  className,
  durationSeconds = 32,
  reverse = false,
}: {
  items: string[];
  className?: string;
  durationSeconds?: number;
  reverse?: boolean;
}) {
  const strip = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {items.map((item) => (
        <li
          key={item}
          className="font-mono text-sm tracking-widest whitespace-nowrap text-fg-subtle uppercase"
        >
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "relative flex overflow-hidden",
        // Fade the strip into the page background at both ends.
        "[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]",
        className,
      )}
    >
      <div
        className="flex w-max animate-[marquee_var(--marquee-duration)_linear_infinite] motion-reduce:animate-none"
        style={
          {
            "--marquee-duration": `${durationSeconds}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {strip(false)}
        {strip(true)}
      </div>
    </div>
  );
}
