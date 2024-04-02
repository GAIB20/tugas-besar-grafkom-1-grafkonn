import { AbstractShape } from "../shape/AbstractShape";
import { unTranslateRotate } from "../utils/unTranslateRotate";

export function onMoveVertexHandleMouseDown(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  shape: AbstractShape,
  draggedVertexIdxArr: number[],
  mouseDownType: "create" | "move" | "changeColor" | string
) {
  if (mouseDownType === "move") {
    const canvasRect = canvas.getBoundingClientRect();

    // Calculate the mouse position relative to the canvas
    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;

    console.log(mouseX, mouseY);

    for (let i = 0; i < shape.bufferLocSize; i += 2) {
      const [unRotatedX, unRotatedY] = unTranslateRotate(
        mouseX,
        mouseY,
        shape.translationArr,
        shape.rotation
      );

      console.log(unRotatedX, unRotatedY);

      if (
        unRotatedX - shape.locationArr[i] <= 10 &&
        unRotatedX - shape.locationArr[i] >= -10 &&
        unRotatedY - shape.locationArr[i + 1] <= 10 &&
        unRotatedY - shape.locationArr[i + 1] >= -10
      ) {
        draggedVertexIdxArr.push(i / 2);
      }
    }
    console.log(draggedVertexIdxArr);
  }
}

// Handle mouse move event
export function onMoveVertexHandleMouseMove(
  event: MouseEvent,
  shape: AbstractShape,
  draggedVertexIdxArr: number[],
  canvas: HTMLCanvasElement
) {
  if (draggedVertexIdxArr.length > 0) {
    // Calculate new vertex position based on mouse movement
    // Update vertex buffer with the new position of the dragged vertex
    const canvasRect = canvas.getBoundingClientRect();

    // Calculate the mouse position relative to the canvas
    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;

    for (let i = 0; i < shape.bufferLocSize; i++) {
      const [unRotatedX, unRotatedY] = unTranslateRotate(
        mouseX,
        mouseY,
        shape.translationArr,
        shape.rotation
      );

      shape.locationArr[draggedVertexIdxArr[i] * 2] = unRotatedX;
      shape.locationArr[draggedVertexIdxArr[i] * 2 + 1] = unRotatedY;
    }
  }
}

// Handle mouse up event
export function onMoveVertexHandleMouseUp(draggedVertexIdxArr: number[]) {
  draggedVertexIdxArr.splice(0);
}
