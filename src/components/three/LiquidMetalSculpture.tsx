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

/** Top-left: Primary icosahedron blob */
function CornerTopLeft({ isMobile }: { isMobile: boolean }) {
  const primaryRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (primaryRef.current) {
      primaryRef.current.rotation.y += 0.003;
      primaryRef.current.rotation.x += 0.001;
    }
  });

  return (
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
      <CornerTopLeft isMobile={isMobile} />
      <CornerTopRight isMobile={isMobile} />
    </group>
  );
}
