import * as icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Service } from "@/content/types";
import { TiltCard } from "@/components/ui/TiltCard";

/**
 * Resolves the icon named in `services.ts`.
 *
 * Falls back to a neutral glyph rather than throwing, so a typo in the content
 * file degrades to a plain card instead of breaking the build.
 */
function ServiceIcon({ name }: { name: string }) {
  const Icon = (icons as unknown as Record<string, LucideIcon>)[name] ?? icons.Box;
  return <Icon size={22} aria-hidden className="text-accent" />;
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <TiltCard className="h-full">
      <article className="glass flex h-full flex-col p-7">
        <ServiceIcon name={service.icon} />
        <h3 className="mt-5 text-xl font-semibold tracking-tight">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">
          {service.description}
        </p>
        <ul className="mt-6 space-y-2 border-t border-surface-border pt-5">
          {service.deliverables.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm text-fg-muted">
              <span
                aria-hidden
                className="mt-2 size-1 shrink-0 rounded-full bg-accent"
              />
              {item}
            </li>
          ))}
        </ul>
      </article>
    </TiltCard>
  );
}
