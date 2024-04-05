import { useEffect, useState } from "react";
import "./App.css";
import { createWebGL } from "./webgl";
import Toolbar from "./components/toolbar.tsx";
import Sidebar from "./components/sidebar.tsx";
import { AbstractShape } from "./shape/AbstractShape.ts";

function App() {
  const [shapeTypeArr, setShapeTypeArr] = useState<
    {
      id: number;
      type?: "line" | "square" | "rectangle" | "polygon";
    }[]
  >([]);

  const [shapesArr, setShapesArr] = useState<AbstractShape[]>([]);

  useEffect(() => {
    createWebGL(setShapeTypeArr, (shapes) => {
      setShapesArr(shapes);
    });
  }, []);
  console.log(shapeTypeArr);
  console.log(shapesArr)
  return (
    <div className="flex h-screen">
      {/* Toolbar */}
      <Toolbar />

      {/* Main Canvas */}
      <div className="w-full h-full relative">
        <canvas
          id="canvas"
          className="h-full w-full bg-primaryCanvas border-black"
        />
      </div>

      {/* Properties */}
      <Sidebar shapeTypeArr={shapeTypeArr} shapesArr={shapesArr} />
    </div>
  );
}

export default App;
