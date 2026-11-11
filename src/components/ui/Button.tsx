import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold " +
  "transition-[transform,box-shadow,background-color,border-color] duration-300 " +
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent " +
  "motion-safe:hover:-translate-y-0.5";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg shadow-[0_0_0_0_transparent] hover:shadow-[0_8px_40px_-8px_var(--accent)]",
  ghost:
    "border border-surface-border text-fg hover:border-accent hover:text-accent",
};

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
} & ({ href: string; type?: never } | { href?: never; type?: "button" | "submit" });

export function Button({
  children,
  variant = "primary",
  className,
  href,
  type = "button",
}: Props) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
