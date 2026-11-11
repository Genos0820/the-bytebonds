"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";
import Lenis from "lenis";

/**
 * Momentum scrolling.
 *
 * Mounted once in the root layout. It renders nothing — it only takes over the
 * scroll behaviour for the document.
 *
 * Skipped entirely under `prefers-reduced-motion`: hijacking the scroll wheel
 * is the single most disorienting thing you can do to someone who has asked for
 * less motion, and it also breaks the browser's own find-on-page scrolling.
 */
export function SmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Exponential ease-out: catches up quickly, settles without bouncing.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch devices already have native momentum; doubling it feels laggy.
      syncTouch: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return null;
}
