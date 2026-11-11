import { socialHref, socialLabels } from "@/lib/socials";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { site } from "@/content/site";

const columns = [
  {
    heading: "Site",
    links: [
      { href: "/work", label: "Work" },
      { href: "/team", label: "Team" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-surface-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="text-2xl font-bold tracking-tight">
            {site.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-fg-muted">{site.tagline}</p>
          <p className="mt-6 font-mono text-xs tracking-wider text-fg-subtle uppercase">
            {site.location}
          </p>
        </div>

        {columns.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h2 className="font-mono text-xs tracking-[0.2em] text-fg-subtle uppercase">
              {column.heading}
            </h2>
            <ul className="mt-4 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fg-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* <div>
          <h2 className="font-mono text-xs tracking-[0.2em] text-fg-subtle uppercase">
            Elsewhere
          </h2>
          <ul className="mt-4 space-y-2">
            {site.contactEmail && (
              <li>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="inline-flex items-center gap-1 text-sm text-fg-muted transition-colors hover:text-accent"
                >
                  {site.contactEmail}
                </a>
              </li>
            )}
            {site.socials.map((link) => (
              <li key={link.platform}>
                <a
                  href={socialHref(link)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-sm text-fg-muted transition-colors hover:text-accent"
                >
                  {socialLabels[link.platform]}
                  <ArrowUpRight size={13} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-surface-border px-6 py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p className="font-mono tracking-wider uppercase">
          Available for new projects
        </p>
      </div>
    </footer>
  );
}
