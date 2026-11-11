"use client";

import { useReducedMotion } from "motion/react";
import { useIsDesktop } from "./useMediaQuery";

/**
 * The single gate for mounting WebGL.
 *
 * A 3D hero is decoration. It renders only when the viewport is wide enough to
 * justify the bytes and the visitor hasn't asked their OS to reduce motion.
 * Everywhere else the hero falls back to a static CSS treatment — see
 * `HeroBackdrop`.
 *
 * Both checks resolve to `false` on the first render, so the canvas is always
 * mounted after hydration rather than during it.
 */
export function useWebGLAllowed(): boolean {
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();
  return isDesktop && !reduceMotion;
}
