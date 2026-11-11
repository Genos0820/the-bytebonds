import type { Transition, Variants } from "motion/react";

/**
 * Shared motion language.
 *
 * One easing curve and one duration scale across the whole site — scattered
 * ad-hoc timings are what makes an animated page feel twitchy rather than
 * composed.
 */

/** Custom cubic-bezier: quick departure, long settle. */
export const ease = [0.16, 1, 0.3, 1] as const;

export const transition = {
  fast: { duration: 0.4, ease },
  base: { duration: 0.7, ease },
  slow: { duration: 1.1, ease },
} satisfies Record<string, Transition>;

/** Fade up — the default section-entry move. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transition.base },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.base },
};

/**
 * Parent variant that staggers children.
 *
 * `delayChildren` keeps the first child from firing on the same frame the
 * container becomes visible, which reads as a single pop rather than a sequence.
 */
export const stagger = (step = 0.08, delay = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: step, delayChildren: delay },
  },
});

/** Viewport config for scroll-triggered reveals. */
/**
 * `amount: "some"` (any pixel visible), not a fraction. A fraction is measured
 * against the element's own height, so on a phone a tall stacked grid (six team
 * cards in one column) can need more than a screenful visible at once — the
 * observer never fires and the content stays at opacity 0.
 */
export const viewportOnce = { once: true, amount: "some" } as const;
