"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, type Points } from "three";

/** Deterministic PRNG, so the field is identical on every render and reload. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A slowly rotating shell of points around the core.
 *
 * Points are placed on a Fibonacci sphere rather than by random angles: golden-
 * angle spacing distributes them far more evenly, with none of the clumping and
 * bald patches a uniform random sample leaves at this count. Only the radius
 * jitter is pseudo-random, and it comes from a seeded generator so the field is
 * deterministic — no `Math.random()` during render, no variation between the
 * server and client, and the same scene on every reload.
 *
 * The whole field is one buffer and one draw call, which is why 900 points is
 * cheap. Animating each point on the CPU would not be.
 */
export function ParticleField({ count = 900 }: { count?: number }) {
  const points = useRef<Points>(null);

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    const random = mulberry32(0x5eed);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i += 1) {
      // y walks evenly from +1 to -1; the ring radius follows from it.
      const y = 1 - (i / (count - 1)) * 2;
      const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      const radius = 3.2 + random() * 2.6;

      array[i * 3] = Math.cos(theta) * ringRadius * radius;
      array[i * 3 + 1] = y * radius;
      array[i * 3 + 2] = Math.sin(theta) * ringRadius * radius;
    }

    return array;
  }, [count]);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.035;
    points.current.rotation.x += delta * 0.012;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#8be9f0"
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
