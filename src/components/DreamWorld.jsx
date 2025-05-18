import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Glitch,
} from "@react-three/postprocessing";
import { FogExp2 } from "three";
import FloatingObjects from "./FloatingObjects";
import ParticleSystem from "./ParticleSystem";

function DreamWorld() {
  const { scene, camera } = useThree();
  const audioRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Set up fog
    scene.fog = new FogExp2(0x11111f, 0.002);

    // Set up audio
    const audio = new window.Audio("/assets/music/ambient.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Play audio on user interaction
    const playAudio = () => {
      audio.play();
      window.removeEventListener("click", playAudio);
    };
    window.addEventListener("click", playAudio);

    // Set up mouse movement
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      audio.pause();
      window.removeEventListener("click", playAudio);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [scene]);

  useFrame(() => {
    // Smoothly interpolate camera position for dreamy effect
    camera.position.x += (mouse.current.x * 8 - camera.position.x) * 0.04;
    camera.position.y += (mouse.current.y * 4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color={0xff77ff} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={0x77ffff} />

      <ParticleSystem />
      <FloatingObjects />

      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
        />
        <Vignette eskil={false} offset={0.2} darkness={1.1} />
        <Glitch
          delay={[1.5, 3.5]}
          duration={[0.3, 0.6]}
          strength={[0.01, 0.02]}
          active={false}
        />
      </EffectComposer>
    </>
  );
}

export default DreamWorld;
