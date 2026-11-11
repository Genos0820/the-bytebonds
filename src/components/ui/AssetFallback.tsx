import { cn } from "@/lib/cn";

/**
 * Stands in for a project cover or member photo that hasn't been supplied yet.
 *
 * Derives a deterministic hue rotation from the seed, so each placeholder is
 * distinguishable from its neighbours instead of the whole grid looking like
 * one repeated tile. Labelled plainly — a placeholder that pretends to be real
 * content is worse than one that admits what it is.
 */
export function AssetFallback({
  seed,
  label,
  className,
  initials,
}: {
  seed: string;
  label?: string;
  className?: string;
  initials?: string;
}) {
  // Cheap string hash → stable 0-359 hue offset.
  const hash = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rotate = hash % 360;

  return (
    <div
      aria-hidden
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-bg-elevated",
        className,
      )}
      style={{ filter: `hue-rotate(${rotate}deg)` }}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(120% 90% at 20% 10%, color-mix(in oklab, var(--accent) 38%, transparent), transparent 60%), radial-gradient(90% 80% at 85% 80%, color-mix(in oklab, var(--accent-2) 32%, transparent), transparent 62%)",
        }}
      />
      <div className="grid-bg absolute inset-0 opacity-40" />
      {initials ? (
        <span className="relative text-3xl font-bold tracking-tight text-fg/80">
          {initials}
        </span>
      ) : (
        <span className="relative font-mono text-[0.6rem] tracking-[0.2em] text-fg-subtle uppercase">
          {label ?? "Image pending"}
        </span>
      )}
    </div>
  );
}
