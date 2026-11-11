"use client";

import { Float } from "@react-three/drei";
import { DistortedCore } from "./objects/DistortedCore";
import { ParticleField } from "./objects/ParticleField";

/**
 * Contents of the hero canvas.
 *
 * Lit with an explicit three-point rig rather than drei's `<Environment>`:
 * the presets fetch an HDR map from an external CDN, which adds a network
 * round-trip on the critical path and fails closed if that host is slow.
 * Three lights cost nothing and the look is predictable.
 *
 * Six small satellites, one per member of the team — the one piece of literal
 * meaning in an otherwise abstract scene.
 */
export function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      {/* Key from upper right, cool rim from lower left — the contrast between
          them is what makes the faceted surface legible. */}
      <directionalLight position={[4, 5, 3]} intensity={2.6} color="#c9b3ff" />
      <directionalLight position={[-5, -2, -3]} intensity={1.6} color="#4dd0e1" />
      <pointLight position={[1.5, 1, 3.5]} intensity={3} color="#8b5cf6" distance={11} />

      <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.5}>
        <DistortedCore />
      </Float>

      <ParticleField />

      {Array.from({ length: 6 }, (_, index) => {
        const angle = (index / 6) * Math.PI * 2;
        const radius = 2.9;
        return (
          <Float
            key={index}
            speed={1 + index * 0.16}
            rotationIntensity={0.9}
            floatIntensity={1.1}
          >
            <mesh
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle) * radius * 0.55,
                Math.sin(angle) * 1.2 - 0.6,
              ]}
              rotation={[angle, angle * 0.5, 0]}
              scale={0.13}
            >
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color="#4dd0e1"
                emissive="#1d6f7a"
                emissiveIntensity={0.9}
                roughness={0.3}
                metalness={0.6}
                flatShading
              />
            </mesh>
          </Float>
        );
      })}
    </>
  );
}
