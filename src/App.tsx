import { useEffect } from "react";
import "./App.css";
import { createWebGL } from "./webgl";
import Toolbar from "./components/toolbar.tsx";
import Sidebar from "./components/sidebar.tsx";

function App() {
  useEffect(() => {
    createWebGL();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Toolbar */}
      <Toolbar />

      {/* Main Canvas */}
      <canvas
        id="canvas"
        className="flex-grow bg-primaryCanvas border-black"
      />

      {/* Properties */}
      <Sidebar/>
    </div>
  );
}

export default App;
