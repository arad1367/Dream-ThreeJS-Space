import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function ParticleSystem() {
  const particlesRef = useRef();
  const particleCount = 5000;

  // Generate positions only once
  const positions = useRef(
    Float32Array.from(
      { length: particleCount * 3 },
      () => (Math.random() - 0.5) * 50
    )
  );

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
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
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={0xffffff}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default ParticleSystem;
