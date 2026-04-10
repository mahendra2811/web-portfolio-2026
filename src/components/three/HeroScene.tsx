"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { LiquidMetalSculpture } from "./LiquidMetalSculpture";
import { SculptureCaustics } from "./SculptureCaustics";
import { BackgroundParticles } from "./BackgroundParticles";
import { useCameraParallax, useMouseParallax } from "./useMouseParallax";
import { useScrollFade } from "./useScrollFade";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type PerfTier = "high" | "medium" | "low";

function usePerfTier(isMobile: boolean): PerfTier {
  return useMemo(() => {
    if (isMobile) return "low";
    if (typeof window === "undefined") return "medium";

    const dpr = window.devicePixelRatio || 1;
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as { deviceMemory?: number }).deviceMemory || 4;

    // Low-end: low DPR or few cores or low memory
    if (dpr < 1.5 || cores <= 2 || memory <= 2) return "low";
    // High-end: high DPR + many cores + good memory
    if (dpr >= 1.5 && cores >= 6 && memory >= 6) return "high";
    return "medium";
  }, [isMobile]);
}

function SculptureGroup({
  isMobile,
  scrollProgress,
}: {
  isMobile: boolean;
  scrollProgress: number;
}) {
  const parallaxRef = useMouseParallax(0.3);

  return (
    <SculptureCaustics isMobile={isMobile}>
      <group ref={parallaxRef}>
        <LiquidMetalSculpture isMobile={isMobile} scrollProgress={scrollProgress} />
      </group>
    </SculptureCaustics>
  );
}

function Scene({
  isMobile,
  scrollProgress,
  tier,
}: {
  isMobile: boolean;
  scrollProgress: number;
  tier: PerfTier;
}) {
  useCameraParallax();

  const particleCount = tier === "high" ? 4000 : tier === "medium" ? 2500 : 1200;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={55} />

      <ambientLight intensity={0.15} />
      <directionalLight position={[-5, 8, -8]} intensity={0.8} color="#E0E7FF" />
      <pointLight position={[-5, 5, -5]} intensity={0.4} color="#6366F1" />
      <pointLight position={[5, -3, 5]} intensity={0.3} color="#06B6D4" />
      {tier === "high" && <pointLight position={[0, 5, 0]} intensity={0.2} color="#8B5CF6" />}

      <Environment preset="night" />

      <SculptureGroup isMobile={isMobile} scrollProgress={scrollProgress} />

      <BackgroundParticles count={particleCount} />

      {tier === "high" && (
        <EffectComposer multisampling={4}>
          <Bloom intensity={0.8} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.0004, 0.0004)}
          />
          <Vignette eskil={false} offset={0.1} darkness={0.7} />
          <Noise blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.08} />
        </EffectComposer>
      )}
      {tier === "medium" && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.5} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
          <Vignette eskil={false} offset={0.1} darkness={0.7} />
        </EffectComposer>
      )}
    </>
  );
}

export default function HeroScene() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const scrollProgress = useScrollFade();
  const tier = usePerfTier(isMobile);

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        dpr={tier === "high" ? [1, 2] : tier === "medium" ? [1, 1.5] : [1, 1]}
        gl={{
          antialias: tier !== "low",
          alpha: true,
          powerPreference: tier === "low" ? "low-power" : "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <Suspense fallback={null}>
          <Scene isMobile={isMobile} scrollProgress={scrollProgress} tier={tier} />
        </Suspense>
      </Canvas>
    </div>
  );
}
