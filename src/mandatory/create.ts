import { AbstractShape } from "../shape/AbstractShape";
import { Square } from "../shape/Square";

export function onCreateHandleMouseDown(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  shapeBuffer: AbstractShape[],
  mouseDownType: "create" | "move" | string,
  creationType: "square" | "line" | string,
  setShapeTypeArr: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        type?: "square" | "circle" | "line" | "rectangle" | "polygon";
      }[]
    >
  >
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

    setShapeTypeArr((prevState) => {
      const newState = [...prevState];
      const newShapeType = {id: shape.id, type: shape.type}
      newState.push(newShapeType);
      return newState;
    });
  }
}
