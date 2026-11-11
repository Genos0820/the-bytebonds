"use client";

import { Canvas } from "@react-three/fiber";
import { HeroScene } from "./HeroScene";

/**
 * The WebGL canvas.
 *
 * This module is the dynamic-import boundary — three, fiber and drei are only
 * fetched when `HeroCanvas` decides to mount it, so they never land in the
 * initial bundle.
 *
 * `dpr` is capped at 1.6: on a 3x phone or a 5K display, rendering at full
 * device pixel ratio quadruples fragment work for a difference nobody sees on
 * a soft-edged, glowing object.
 */
export default function SceneCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{
        antialias: true,
        alpha: true,
        // The scene is composited over the page background, which already
        // provides the dark ground; clearing to opaque would hide the CSS glow.
        powerPreference: "high-performance",
      }}
      // The canvas is decoration sitting behind live text.
      aria-hidden
      style={{ pointerEvents: "none" }}
    >
      <HeroScene />
    </Canvas>
  );
}
