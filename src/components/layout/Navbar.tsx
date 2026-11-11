"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const links = [
  { href: "/work", label: "Work" },
  { href: "/team", label: "Team" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  // Close the menu when the route changes, or the overlay outlives the page.
  // Adjusted during render rather than in an effect — React's documented
  // pattern for resetting state when a prop changes. An effect here would
  // render the stale open menu for one frame, then cascade a second render.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  // Lock the page behind the overlay, and restore on close.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // Escape closes the menu — a full-screen overlay with no keyboard exit is a trap.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled
            ? "border-b border-surface-border bg-bg/70 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight"
            aria-label={`${site.name} — home`}
          >
            {site.name}
            <span className="text-accent">.</span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => {
              const current = pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "relative font-mono text-xs tracking-[0.16em] uppercase transition-colors",
                      current ? "text-accent" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {link.label}
                    {current && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1.5 left-0 h-px w-full bg-accent"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            // No `aria-controls`: the overlay only mounts while open, so the
            // reference would dangle whenever the menu is closed — which is
            // most of the time. `aria-expanded` carries the state that matters,
            // and a broken reference is worse than an absent optional one.
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex h-full flex-col justify-center gap-2 px-8">
              {links.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * index + 0.08, ease }}
                >
                  <Link
                    href={link.href}
                    className="block py-3 text-4xl font-bold tracking-tight"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
