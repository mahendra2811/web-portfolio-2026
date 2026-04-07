"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function useMouseParallax(depthFactor: number) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const { x, y } = state.pointer;
    ref.current.position.x = THREE.MathUtils.lerp(
      ref.current.position.x,
      x * depthFactor * 0.5,
      0.05,
    );
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      y * depthFactor * 0.3,
      0.05,
    );
  });

  return ref;
}

export function useCameraParallax() {
  useFrame((state) => {
    const { x, y } = state.pointer;
    state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, x * 0.03, 0.05);
    state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, y * 0.02, 0.05);
  });
}
