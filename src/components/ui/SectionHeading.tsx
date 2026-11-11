import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/**
 * The standard section opener: a mono eyebrow, a display title, an optional
 * lead paragraph. Used by every section so vertical rhythm stays consistent.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
        {eyebrow}
      </p>
      <h2 className="max-w-3xl text-3xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>
      {lead && (
        <p className="max-w-xl text-base text-fg-muted sm:text-lg">{lead}</p>
      )}
    </Reveal>
  );
}
