import { cn } from "@/lib/cn";

/**
 * The small bordered pill used for tech stacks, skills and categories.
 *
 * Extracted because it appeared in six places with six slightly different sets
 * of padding and type sizes, which is exactly how a design system erodes.
 */
export function Chip({
  children,
  className,
  tone = "muted",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "muted" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border px-2.5 py-0.5 font-mono text-[0.65rem] whitespace-nowrap",
        tone === "muted"
          ? "border-surface-border text-fg-subtle"
          : "border-accent/40 text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
