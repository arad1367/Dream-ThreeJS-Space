import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { FogExp2 } from "three";
import FloatingObjects from "./FloatingObjects";
import ParticleSystem from "./ParticleSystem";

function DreamWorld() {
  const { scene } = useThree();
  const audioRef = useRef();

  useEffect(() => {
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

    return () => {
      audio.pause();
      window.removeEventListener("click", playAudio);
    };
  }, [scene]);

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
      </EffectComposer>
    </>
  );
}

export default DreamWorld;
