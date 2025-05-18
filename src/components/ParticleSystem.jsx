import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleSystem() {
  const particlesRef = useRef();
  const particleCount = 5000;

  // Generate positions and colors
  const positions = useRef(
    Float32Array.from(
      { length: particleCount * 3 },
      () => (Math.random() - 0.5) * 50
    )
  );

  const colors = useRef(
    Float32Array.from(
      { length: particleCount * 3 },
      () => Math.random() * 0.5 + 0.5
    )
  );

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;

      // Dreamy shimmer effect
      particlesRef.current.material.opacity =
        0.4 + 0.2 * Math.sin(clock.getElapsedTime() * 2);
      particlesRef.current.material.size =
        0.12 + 0.05 * Math.sin(clock.getElapsedTime() * 3);

      // Subtle wave motion
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] +=
          Math.sin(clock.getElapsedTime() + positions[i] * 0.1) * 0.01;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default ParticleSystem;
