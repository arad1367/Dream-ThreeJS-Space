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
      <footer className="dreamy-footer">
        ©2025 Pejman Ebrahimi — All rights reserved.
        <span className="footer-message">
          | Crafted for dreamers. Experience the impossible.
        </span>
      </footer>
    </div>
  );
}

export default App;
