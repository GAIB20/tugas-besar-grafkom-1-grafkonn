import {
  onChangeColorVertexHandleMouseDown,
} from "../mandatory/changeColor";
import { onCreateHandleMouseDown } from "../mandatory/create";
import {
  onMoveVertexHandleMouseDown,
  onMoveVertexHandleMouseMove,
  onMoveVertexHandleMouseUp,
} from "../mandatory/moveVertex";
import { handleRotate } from "../mandatory/rotate";
import { handleTranslate } from "../mandatory/translate";
import { AbstractShape } from "../shape/AbstractShape";
import { setupSlider } from "./setupSlider";

export function setupEventListener(
  canvas: HTMLCanvasElement,
  colorPicker: HTMLInputElement,
  // make it as a function so that it will always called on render, not just at the first render
  shapesArr: () => AbstractShape[],
  mouseDownType: () => string,
  createType: () => string,
  selectedShapeIdx: () => number,
  shape: () => AbstractShape,
  drawScene: () => void,
  draggedVertexIdxArr: () => number[],
  changedColorVertexIdxArr: () => number[]
) {
  // event listeners to change options

  // Event listeners for creating new shape
  canvas.addEventListener("mousedown", (e: MouseEvent) => {
    onCreateHandleMouseDown(
      e,
      canvas,
      shapesArr(),
      mouseDownType(),
      createType()
    );
    drawScene();
  });

  // event listeners for translation
  setupSlider("#slider-translation-x", canvas.width, (e: Event) => {
    handleTranslate(e, selectedShapeIdx(), shape(), "x");
    drawScene();
  });
  setupSlider("#slider-translation-y", canvas.height, (e: Event) => {
    handleTranslate(e, selectedShapeIdx(), shape(), "y");
    drawScene();
  });

  // event listeners for rotation
  setupSlider("#slider-rotation", 360, (e: Event) => {
    handleRotate(e, selectedShapeIdx(), shape());
    drawScene();
  });

  // event listeners for moving vertex
  canvas.addEventListener("mousedown", (e: MouseEvent) =>
    onMoveVertexHandleMouseDown(
      e,
      canvas,
      selectedShapeIdx(),
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
  });
}
