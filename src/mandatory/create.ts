import { AbstractShape } from "../shape/AbstractShape";
import { Square } from "../shape/Square";

export function onCreateHandleMouseDown(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  shapeBuffer: AbstractShape[],
  mouseDownType: "create" | "move" | string,
  creationType: "square" | "line" | string
) {
  if (mouseDownType === "create") {
    const canvasRect = canvas.getBoundingClientRect();

    // Calculate the mouse position relative to the canvas
    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;
    let shape: AbstractShape;

    if (creationType === "square") {
      shape = new Square(shapeBuffer.length);
      shape.onCreate(mouseX, mouseY);
      shapeBuffer.push(shape);
    }
  }
}
