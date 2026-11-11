"use client";

import dynamic from "next/dynamic";
import { useWebGLAllowed } from "@/hooks/useWebGLAllowed";

/**
 * three + fiber + drei are roughly 250KB gzipped. Loading them is a deliberate
 * act, not a side effect of rendering the home page — hence the dynamic import
 * with `ssr: false`, which keeps them out of the server render and the initial
 * client bundle alike.
 */
const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });

/**
 * Static backdrop. Always rendered, under the canvas.
 *
 * This is what mobile and reduced-motion visitors see, and it is also what
 * fills the hero during the moment before the 3D chunk arrives — so the hero
 * is never an empty box, and the first paint never waits on WebGL.
 */
function HeroBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-60" />
      {/* Glows sit on the right, where the 3D object lives, so the headline
          column stays on near-flat dark ground. */}
      <div
        className="absolute top-1/2 right-0 h-[38rem] w-[38rem] translate-x-1/4 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 40%, transparent) 0%, transparent 68%)",
        }}
      />
      <div
        className="absolute top-1/4 right-1/3 h-[20rem] w-[20rem] rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent-2) 38%, transparent) 0%, transparent 70%)",
        }}
      />
      {/* Fades the backdrop into the section below, so the hero has no hard seam. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}

export function HeroCanvas() {
  const webglAllowed = useWebGLAllowed();

  return (
    <>
      <HeroBackdrop />
      {webglAllowed && (
        <div
          aria-hidden
          // Confined to the right of the hero rather than full-bleed. Centred
          // behind the text, the object competes with the headline for the same
          // pixels and the copy loses — the words are the point of the section.
          className="absolute inset-y-0 right-0 -z-10 w-[62%] max-w-[52rem]"
        >
          <SceneCanvas />
          {/* Feathers the canvas into the page on the text side, so there's no
              visible rectangular edge where the WebGL layer stops. */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-bg to-transparent" />
        </div>
      )}
    </>
  );
}
