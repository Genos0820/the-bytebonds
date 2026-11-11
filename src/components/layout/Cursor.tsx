"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useHasFinePointer } from "@/hooks/useMediaQuery";

/**
 * A trailing ring that follows the pointer and swells over interactive elements.
 *
 * The native cursor is deliberately left visible. Hiding it is the usual move
 * here, and it's a mistake: if the custom ring ever lags or fails, the visitor
 * is left with no pointer at all. The ring is an accent on top of the real
 * cursor, not a replacement for it.
 *
 * Never rendered on touch devices or under reduced motion.
 */
export function Cursor() {
  const finePointer = useHasFinePointer();
  const reduceMotion = useReducedMotion();
  const enabled = finePointer && !reduceMotion;

  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 480, damping: 36, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 480, damping: 36, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as Element | null;
      setActive(Boolean(target?.closest("a, button, [data-cursor='hover']")));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
      style={{ x: springX, y: springY }}
    >
      <motion.span
        className="block rounded-full border border-accent"
        animate={{
          width: active ? 46 : 26,
          height: active ? 46 : 26,
          opacity: visible ? (active ? 1 : 0.55) : 0,
          margin: active ? -23 : -13,
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* The fill is a child whose opacity animates, rather than an animated
            backgroundColor on the ring: Motion cannot interpolate `color-mix()`
            or the keyword `transparent`, and silently warns instead. */}
        <motion.span
          className="block size-full rounded-full bg-accent"
          animate={{ opacity: active ? 0.14 : 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.span>
    </motion.div>
  );
}
