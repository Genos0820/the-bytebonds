"use client";

import { motion, type Variants } from "motion/react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay before this element animates, in seconds. */
  delay?: number;
  variants?: Variants;
  as?: "div" | "section" | "li" | "article" | "header";
  /**
   * Animate on mount instead of on scroll-into-view.
   *
   * Required for anything above the fold. A hero wired to `whileInView` is
   * already in view on load, so it depends on the observer firing before the
   * visitor sees anything — which is how a page ends up blank in a thumbnail,
   * a link preview, or for the first moment on a slow device.
   */
  immediate?: boolean;
};

/**
 * Fades its child up when scrolled into view.
 *
 * The resting state is `visible`, not `hidden` — `initial="hidden"` only applies
 * while the element is off-screen. A reader who lands mid-page, or whose
 * IntersectionObserver never fires, still sees the content. Leaving sections at
 * `opacity: 0` waiting for an observer is the most common way an animated page
 * ships broken.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = "div",
  immediate = false,
}: RevealProps) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: viewportOnce })}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

/**
 * Reveals its children one after another. Each child must be a `RevealItem`
 * (or any element with the matching variant names).
 */
export function RevealGroup({
  children,
  className,
  step,
  as = "div",
  immediate = false,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  step?: number;
  as?: "div" | "ul" | "ol" | "section";
  /** See `Reveal`'s `immediate` — use it for anything above the fold. */
  immediate?: boolean;
  delay?: number;
}) {
  const Component = motion[as];

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: viewportOnce })}
      variants={stagger(step, delay)}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Component = motion[as];
  return (
    <Component className={className} variants={fadeUp}>
      {children}
    </Component>
  );
}
