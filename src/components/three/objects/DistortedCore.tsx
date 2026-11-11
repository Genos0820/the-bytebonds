"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

/**
 * The hero's centrepiece: a faceted sphere whose surface is displaced by a
 * noise field, so the silhouette reads as something organic rather than a
 * primitive.
 *
 * Geometry detail is 4 — enough facets for the distortion to show, few enough
 * to keep the vertex count near 2.5k. Pushing it to 6 roughly quadruples that
 * for no visible gain at this size.
 */
export function DistortedCore() {
  const mesh = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.12;
    mesh.current.rotation.z += delta * 0.04;

    // Drift toward the pointer rather than tracking it, so the object feels
    // weighted instead of glued to the cursor.
    const { x, y } = state.pointer;
    mesh.current.position.x += (x * 0.35 - mesh.current.position.x) * 0.03;
    mesh.current.position.y += (y * 0.25 - mesh.current.position.y) * 0.03;
  });

  return (
    <mesh ref={mesh} scale={1.35}>
      {/* Detail 2, not 4. A high-poly sphere plus distortion reads as a smooth
          blob; chunky facets are what make it read as a crystal. It is also
          ~320 triangles instead of ~5k. */}
      <icosahedronGeometry args={[1, 2]} />
      <MeshDistortMaterial
        color="#6b4fd6"
        emissive="#1a1040"
        // Kept low on purpose. Emissive doesn't respond to the light rig, so
        // turning it up flattens the object into a glowing ball and loses every
        // facet the geometry gives us.
        emissiveIntensity={0.25}
        roughness={0.28}
        metalness={0.55}
        distort={0.3}
        speed={1.1}
        // Normals per face rather than per vertex — this is what actually draws
        // the facet edges.
        flatShading
      />
    </mesh>
  );
}
