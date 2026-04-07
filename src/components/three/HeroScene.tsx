"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
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
        <LiquidMetalSculpture
          isMobile={isMobile}
          scrollProgress={scrollProgress}
        />
      </group>
    </SculptureCaustics>
  );
}

function Scene({
  isMobile,
  scrollProgress,
}: {
  isMobile: boolean;
  scrollProgress: number;
}) {
  useCameraParallax();

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={55} />

      <ambientLight intensity={0.15} />
      <directionalLight
        position={[-5, 8, -8]}
        intensity={0.8}
        color="#E0E7FF"
      />
      <pointLight position={[-5, 5, -5]} intensity={0.4} color="#6366F1" />
      <pointLight position={[5, -3, 5]} intensity={0.3} color="#06B6D4" />
      <pointLight position={[0, 5, 0]} intensity={0.2} color="#8B5CF6" />

      <Environment preset="night" />

      <SculptureGroup isMobile={isMobile} scrollProgress={scrollProgress} />

      <BackgroundParticles count={isMobile ? 1500 : 4000} />

      <EffectComposer multisampling={isMobile ? 0 : 4}>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0004, 0.0004)}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.7} />
        <Noise blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.08} />
      </EffectComposer>
    </>
  );
}

export default function HeroScene() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const scrollProgress = useScrollFade();

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <Suspense fallback={null}>
          <Scene isMobile={isMobile} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
