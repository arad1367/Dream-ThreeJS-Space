import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingObject({ position, color }) {
  const meshRef = useRef();
  const initialPosition = useRef(position);
  const rotationSpeed = useRef({
    x: Math.random() * 0.02 - 0.01,
    y: Math.random() * 0.02 - 0.01,
    z: Math.random() * 0.02 - 0.01,
  });

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Rotation
      meshRef.current.rotation.x += rotationSpeed.current.x;
      meshRef.current.rotation.y += rotationSpeed.current.y;
      meshRef.current.rotation.z += rotationSpeed.current.z;

      // Floating motion
      const time = clock.getElapsedTime();
      meshRef.current.position.x =
        initialPosition.current[0] + Math.sin(time * 0.5) * 0.5;
      meshRef.current.position.y =
        initialPosition.current[1] + Math.cos(time * 0.3) * 0.5;
      meshRef.current.position.z =
        initialPosition.current[2] + Math.sin(time * 0.4) * 0.5;

      // Pulsating scale
      const scale = 1 + Math.sin(time * 2) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[1, 1]} />
      <meshPhongMaterial
        color={color}
        shininess={100}
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FloatingObjects() {
  const objects = Array.from({ length: 50 }, () => ({
    position: [
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 40,
    ],
    color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
  }));

  return (
    <>
      {objects.map((obj, i) => (
        <FloatingObject key={i} position={obj.position} color={obj.color} />
      ))}
    </>
  );
}

export default FloatingObjects;
