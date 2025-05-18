import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingObject({ position, color }) {
  const meshRef = useRef();
  const rotationSpeed = useRef({
    x: Math.random() * 0.02 - 0.01,
    y: Math.random() * 0.02 - 0.01,
    z: Math.random() * 0.02 - 0.01,
  });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed.current.x;
      meshRef.current.rotation.y += rotationSpeed.current.y;
      meshRef.current.rotation.z += rotationSpeed.current.z;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[1]} />
      <meshPhongMaterial
        color={color}
        shininess={100}
        transparent
        opacity={0.7}
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
