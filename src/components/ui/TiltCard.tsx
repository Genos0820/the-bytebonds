"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useHasFinePointer } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";

/**
 * Tilts toward the cursor, with a light sheen tracking the pointer.
 *
 * Disabled entirely for touch devices and anyone with reduced motion — on a
 * phone a tilt card is a card that flickers when you try to tap it.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 7,
}: {
  children: React.ReactNode;
  className?: string;
  /** Degrees of rotation at the card's corners. */
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useHasFinePointer();
  const reduceMotion = useReducedMotion();
  const enabled = finePointer && !reduceMotion;

  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);

  // Sheen position, in percent of the card.
  const sheenX = useMotionValue(50);
  const sheenY = useMotionValue(50);
  const sheenOpacity = useSpring(useMotionValue(0), spring);

  const sheen = useMotionTemplate`radial-gradient(420px circle at ${sheenX}% ${sheenY}%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 65%)`;

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * maxTilt * 2);
    rotateX.set((0.5 - py) * maxTilt * 2);
    sheenX.set(px * 100);
    sheenY.set(py * 100);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
    sheenOpacity.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerEnter={() => enabled && sheenOpacity.set(1)}
      onPointerLeave={reset}
      style={
        enabled
          ? { rotateX, rotateY, transformPerspective: 900 }
          : undefined
      }
      className={cn("relative isolate", className)}
    >
      {enabled && (
        <motion.span
          aria-hidden
          style={{ background: sheen, opacity: sheenOpacity }}
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit]"
        />
      )}
      {children}
    </motion.div>
  );
}
