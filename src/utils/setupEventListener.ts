import { onChangeColorVertexHandleMouseDown } from "../mandatory/changeColor";
import { onCreateHandleMouseDown } from "../mandatory/create";
import {
  onMoveVertexHandleMouseDown,
  onMoveVertexHandleMouseMove,
  onMoveVertexHandleMouseUp,
} from "../mandatory/moveVertex";
import { handleResize } from "../mandatory/resize";
import { handleResizeX } from "../mandatory/resizeX";
import { handleResizeY } from "../mandatory/resizeY";
import { handleRotate } from "../mandatory/rotate";
import { handleTranslate } from "../mandatory/translate";
import { AbstractShape } from "../shape/AbstractShape";
import { setupSlider } from "./setupSlider";

export function setupEventListener(
  setShapeTypeArr: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        type?: "line" | "square" | "rectangle" | "polygon";
      }[]
    >
  >,
  canvas: HTMLCanvasElement,
  colorPicker: HTMLInputElement,
  selectionShapes: HTMLSelectElement,
  // make it as a function so that it will always called on render, not just at the first render
  shapesArr: () => AbstractShape[],
  mouseDownType: () => string,
  selectedShapeIdx: () => number,
  shape: () => AbstractShape,
  drawScene: () => void,
  draggedVertexIdxArr: () => number[],
  changedColorVertexIdxArr: () => number[]
) {
  // Event listeners for creating new shape
  canvas.addEventListener("mousedown", (e: MouseEvent) => {
    if (mouseDownType() === "create") {
      onCreateHandleMouseDown(
        e,
        canvas,
        selectionShapes,
        shapesArr(),
        mouseDownType(),
        setShapeTypeArr
      );
      drawScene();
    }
  });

  // event listeners for translation
  setupSlider("#slider-translation-x", canvas.width, (e: Event) => {
    handleTranslate(e, shape(), "x");
    drawScene();
  });
  setupSlider("#slider-translation-y", canvas.height, (e: Event) => {
    handleTranslate(e, shape(), "y");
    drawScene();
  });

  // event listeners for rotation
  setupSlider("#slider-rotation", 360, (e: Event) => {
    handleRotate(e, shape());
    drawScene();
  });

  setupSlider("#slider-resize", canvas.width, (e: Event) => {
    handleResize(e, shape())
    drawScene();
  });

  setupSlider("#slider-resize-x", canvas.width, (e: Event) => {
    handleResizeX(e, shape())
    drawScene();
  });

  setupSlider("#slider-resize-y", canvas.width, (e: Event) => {
    handleResizeY(e, shape())
    drawScene();
  });

  // event listeners for moving vertex
  canvas.addEventListener("mousedown", (e: MouseEvent) =>
    onMoveVertexHandleMouseDown(
      e,
      canvas,
      shape(),
      draggedVertexIdxArr(),
      mouseDownType()
    )
  );
  canvas.addEventListener("mousemove", (e: MouseEvent) => {
    if (draggedVertexIdxArr().length > 0) {
      onMoveVertexHandleMouseMove(
        e,
        shapesArr()[selectedShapeIdx()],
        draggedVertexIdxArr(),
        canvas
      );
      drawScene();
    }
  });
  canvas.addEventListener("mouseup", () =>
    onMoveVertexHandleMouseUp(draggedVertexIdxArr())
  );

  // event listeners to change colors
  canvas.addEventListener("mousedown", (e: MouseEvent) => {
    if (mouseDownType() === "changeColor") {
      onChangeColorVertexHandleMouseDown(
        e,
        canvas,
        selectedShapeIdx(),
        shape(),
        changedColorVertexIdxArr(),
        mouseDownType(),
        colorPicker,
        drawScene
      );
    }
  });
}
