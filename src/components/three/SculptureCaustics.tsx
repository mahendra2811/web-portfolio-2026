"use client";

import { ReactNode } from "react";
import { Caustics } from "@react-three/drei";

interface SculptureCausticsProps {
  isMobile: boolean;
  children: ReactNode;
}

export function SculptureCaustics({ isMobile, children }: SculptureCausticsProps) {
  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <Caustics
      lightSource={[-5, 8, -8]}
      intensity={0.02}
      color="#6366F1"
      ior={1.1}
      worldRadius={1.0}
      resolution={512}
      frames={Infinity}
      backside
      causticsOnly={false}
    >
      {children}
    </Caustics>
  );
}
