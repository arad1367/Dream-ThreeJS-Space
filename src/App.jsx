import { Canvas } from "@react-three/fiber";
import DreamWorld from "./components/DreamWorld";

function App() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        dpr={window.devicePixelRatio}
      >
        <DreamWorld />
      </Canvas>
    </div>
  );
}

export default App;
