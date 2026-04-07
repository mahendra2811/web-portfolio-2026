"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const METAL_PROPS = {
  metalness: 0.95,
  roughness: 0.05,
  color: "#C0C0D0",
  envMapIntensity: 2.5,
  clearcoat: 1.0,
  clearcoatRoughness: 0.03,
  iridescence: 1.0,
  iridescenceIOR: 1.3,
  iridescenceThicknessRange: [100, 400] as [number, number],
  sheen: 0.5,
  sheenColor: new THREE.Color("#8B5CF6"),
  sheenRoughness: 0.2,
} as const;

interface LiquidMetalSculptureProps {
  isMobile: boolean;
  scrollProgress: number;
}

/** Top-left: Primary blob + small satellite */
function CornerTopLeft({ isMobile }: { isMobile: boolean }) {
  const primaryRef = useRef<THREE.Mesh>(null);
  const satRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (primaryRef.current) {
      primaryRef.current.rotation.y += 0.003;
      primaryRef.current.rotation.x += 0.001;
    }
    if (satRef.current) {
      const t = state.clock.elapsedTime;
      satRef.current.position.x = Math.cos(t * 0.5) * 1.5 - 6.5;
      satRef.current.position.y = Math.sin(t * 0.6) * 0.6 + 4.5;
      satRef.current.position.z = -2;
      satRef.current.rotation.y += 0.005;
    }
  });

  return (
    <>
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={primaryRef} position={[-6.5, 4.0, -2]}>
          <icosahedronGeometry args={[1.2, isMobile ? 3 : 6]} />
          {isMobile ? (
            <meshPhysicalMaterial {...METAL_PROPS} />
          ) : (
            <MeshDistortMaterial speed={2} distort={0.4} radius={1} {...METAL_PROPS} />
          )}
        </mesh>
      </Float>
      {!isMobile && (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <mesh ref={satRef}>
            <sphereGeometry args={[0.35, 24, 24]} />
            <MeshDistortMaterial speed={3} distort={0.3} radius={1} {...METAL_PROPS} />
          </mesh>
        </Float>
      )}
    </>
  );
}

/** Top-right: Large flowing dodecahedron */
function CornerTopRight({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
      ref.current.rotation.z += 0.001;
    }
  });

  return (
    <Float speed={0.6} rotationIntensity={0.25} floatIntensity={0.35}>
      <mesh ref={ref} position={[7.0, 3.5, -1]}>
        <dodecahedronGeometry args={[isMobile ? 1.0 : 1.5, isMobile ? 2 : 4]} />
        {isMobile ? (
          <meshPhysicalMaterial {...METAL_PROPS} />
        ) : (
          <MeshDistortMaterial speed={1.5} distort={0.5} radius={1} {...METAL_PROPS} />
        )}
      </mesh>
    </Float>
  );
}

/** Bottom-left: Small torus knot */
function CornerBottomLeft({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.004;
      ref.current.rotation.z += 0.003;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.5}>
      <mesh ref={ref} position={[-5.5, -4.5, -3]}>
        <torusKnotGeometry args={[isMobile ? 0.4 : 0.6, 0.15, 64, 16]} />
        {isMobile ? (
          <meshPhysicalMaterial {...METAL_PROPS} />
        ) : (
          <MeshDistortMaterial speed={2.5} distort={0.35} radius={1} {...METAL_PROPS} />
        )}
      </mesh>
    </Float>
  );
}

/** Bottom-right: Sphere cluster */
function CornerBottomRight() {
  const mainRef = useRef<THREE.Mesh>(null);
  const smallARef = useRef<THREE.Mesh>(null);
  const smallBRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mainRef.current) {
      mainRef.current.rotation.y += 0.003;
    }
    const t = state.clock.elapsedTime;
    if (smallARef.current) {
      smallARef.current.position.x = Math.cos(t * 0.7) * 1.0 + 6.0;
      smallARef.current.position.y = Math.sin(t * 0.5) * 0.5 - 3.5;
      smallARef.current.position.z = -1.5;
    }
    if (smallBRef.current) {
      smallBRef.current.position.x = Math.cos(t * 0.4 + Math.PI) * 0.8 + 6.5;
      smallBRef.current.position.y = Math.sin(t * 0.6 + 1) * 0.4 - 4.5;
      smallBRef.current.position.z = -2;
    }
  });

  return (
    <>
      <Float speed={0.9} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={mainRef} position={[6.0, -4.0, -1.5]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <MeshDistortMaterial speed={2} distort={0.4} radius={1} {...METAL_PROPS} />
        </mesh>
      </Float>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh ref={smallARef}>
          <sphereGeometry args={[0.3, 20, 20]} />
          <MeshDistortMaterial speed={2.5} distort={0.3} radius={1} {...METAL_PROPS} />
        </mesh>
      </Float>
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}>
        <mesh ref={smallBRef}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <MeshDistortMaterial speed={3} distort={0.25} radius={1} {...METAL_PROPS} />
        </mesh>
      </Float>
    </>
  );
}

/** Scattered torus knot variations — different knot types, sizes, positions */
const SCATTERED_KNOTS = [
  // [p, q] controls the knot shape — different combos make visually distinct knots
  {
    pos: [3.5, 1.5, -4] as const,
    p: 3,
    q: 2,
    tube: 0.08,
    radius: 0.35,
    rotSpeed: [0.005, 0.003, 0.002],
    floatSpeed: 1.3,
    distort: 0.3,
  },
  {
    pos: [-3.0, -1.5, -5] as const,
    p: 2,
    q: 5,
    tube: 0.06,
    radius: 0.28,
    rotSpeed: [0.003, 0.006, 0.001],
    floatSpeed: 1.0,
    distort: 0.25,
  },
  {
    pos: [8.5, 0.5, -3] as const,
    p: 3,
    q: 4,
    tube: 0.1,
    radius: 0.4,
    rotSpeed: [0.002, 0.004, 0.005],
    floatSpeed: 0.8,
    distort: 0.4,
  },
  {
    pos: [-8.0, 1.0, -6] as const,
    p: 2,
    q: 3,
    tube: 0.07,
    radius: 0.32,
    rotSpeed: [0.004, 0.002, 0.004],
    floatSpeed: 1.1,
    distort: 0.2,
  },
  {
    pos: [1.5, -5.5, -4] as const,
    p: 5,
    q: 3,
    tube: 0.09,
    radius: 0.3,
    rotSpeed: [0.006, 0.001, 0.003],
    floatSpeed: 1.4,
    distort: 0.35,
  },
];

function ScatteredKnot({
  config,
  isMobile,
}: {
  config: (typeof SCATTERED_KNOTS)[number];
  isMobile: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x += config.rotSpeed[0];
    ref.current.rotation.y += config.rotSpeed[1];
    ref.current.rotation.z += config.rotSpeed[2];
  });

  return (
    <Float speed={config.floatSpeed} rotationIntensity={0.35} floatIntensity={0.45}>
      <mesh ref={ref} position={[config.pos[0], config.pos[1], config.pos[2]]}>
        <torusKnotGeometry
          args={[config.radius, config.tube, isMobile ? 32 : 64, 12, config.p, config.q]}
        />
        {isMobile ? (
          <meshPhysicalMaterial {...METAL_PROPS} />
        ) : (
          <MeshDistortMaterial speed={2} distort={config.distort} radius={1} {...METAL_PROPS} />
        )}
      </mesh>
    </Float>
  );
}

export function LiquidMetalSculpture({ isMobile, scrollProgress }: LiquidMetalSculptureProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const s = 1.0 - scrollProgress * 0.3;
    groupRef.current.scale.setScalar(s);
    groupRef.current.position.y = scrollProgress * 2.0;
  });

  return (
    <group ref={groupRef}>
      {/* Corner formations */}
      <CornerTopLeft isMobile={isMobile} />
      <CornerTopRight isMobile={isMobile} />
      <CornerBottomLeft isMobile={isMobile} />
      {!isMobile && <CornerBottomRight />}

      {/* Scattered torus knot variations */}
      {SCATTERED_KNOTS.map(
        (config, i) =>
          // On mobile show only 2 of the 5
          (!isMobile || i < 2) && <ScatteredKnot key={i} config={config} isMobile={isMobile} />,
      )}
    </group>
  );
}
