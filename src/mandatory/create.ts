import { AbstractShape } from "../shape/AbstractShape";
import { Square } from "../shape/Square";

export function onCreateHandleMouseDown(
  event: MouseEvent,
  mainLocationBuffer: number[],
  canvas: HTMLCanvasElement,
  shapeBuffer: AbstractShape[],
  translateBuffer: number[],
  rotationBuffer: number[],
  mouseDownType: "create",
  creationType: "square" | "line"
) {
  if (mouseDownType === "create") {
    const canvasRect = canvas.getBoundingClientRect();

    // Calculate the mouse position relative to the canvas
    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;
    let shape: AbstractShape;

    if (creationType === "square") {
      shape = new Square(shapeBuffer.length);
      shape.onCreate(mainLocationBuffer, mouseX, mouseY);
      shapeBuffer.push(shape);
    }
    // add  0, 0 for translate
    translateBuffer.push(0);
    translateBuffer.push(0);

    // add  0, 1 for rotation (it means 0 degrees)
    rotationBuffer.push(0);
    rotationBuffer.push(1);
    console.log(mainLocationBuffer);
  }
}
