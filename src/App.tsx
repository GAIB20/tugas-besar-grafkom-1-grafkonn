import { useEffect } from "react";
import "./App.css";
import { createWebGL } from "./webgl";

function App() {
  useEffect(() => {
    createWebGL();
  }, []);
  return (
   <div className="m-4">
    Translate
      <div>
        x <input type="range" id="slider-translation-x" min="0" max="100" />
      </div>
      <div>
        y <input type="range" id="slider-translation-y" min="0" max="100" />
      </div>
      <canvas
        id="canvas"
        style={{ width: "100%", height: "100%", border: "1px solid black" }}
      />
    </div>
  );
}

export default App;
