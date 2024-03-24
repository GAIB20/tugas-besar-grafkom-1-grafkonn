import { useEffect } from "react";
import "./App.css";
import { createWebGL } from "./webgl";

function App() {
  useEffect(() => {
    createWebGL();
  }, []);
  return (
    <div className="m-4">
      <div className="flex flex-row">
        <div className="p-2">
          <p>Translate</p>
          <div>
            x <input type="range" id="slider-translation-x" min="0" max="100" defaultValue="0" />
          </div>
          <div>
            y <input type="range" id="slider-translation-y" min="0" max="100" defaultValue="0"/>
          </div>
        </div>
        <div className="p-2">
          <p>Rotation</p>
          <div>
            0 <input type="range" id="slider-rotation" min="0" max="360" defaultValue="0" /> 360
          </div>
        </div>
      </div>
      <canvas
        id="canvas"
        style={{ width: "100%", height: "100%", border: "1px solid black" }}
      />
    </div>
  );
}

export default App;
