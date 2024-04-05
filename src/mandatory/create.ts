import { AbstractShape } from "../shape/AbstractShape";
import { Square } from "../shape/Square";
import { Rectangle } from "../shape/Rectangle";
import { Line } from "../shape/Line";
import { Polygon } from "../shape/Polygon";

export function onCreateHandleMouseDown(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  selectionShapes: HTMLSelectElement,
  shapeBuffer: AbstractShape[],
  mouseDownType: "create" | "move" | string,
  setShapeTypeArr: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        type?: "line" | "square" | "rectangle" | "polygon";
      }[]
    >
  >
) {
  const createTypeElmt = document.getElementById(
    "creation-type"
  ) as HTMLInputElement;
  const creationType = createTypeElmt.value
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
    } else if (creationType === "rectangle"){
      shape = new Rectangle(shapeBuffer.length);
      shape.onCreate(mouseX, mouseY);
      shapeBuffer.push(shape);
    } else if (creationType === "line") {
      shape = new Line(shapeBuffer.length);
      shape.onCreate(mouseX, mouseY);
      shapeBuffer.push(shape);
    } else if (creationType === "polygon") {
      shape = new Polygon(shapeBuffer.length);
      shape.onCreate(mouseX, mouseY);
      shapeBuffer.push(shape);
    }

    shape = shapeBuffer[shapeBuffer.length - 1]
    const selectionShapesEvent = new Event('change', { bubbles: true });
    selectionShapes.value = `${shape.id}-${shape.type}`

    // setting it to timeout because the dispatch event is triggered before the shapebuffer update
    setTimeout(() => selectionShapes.dispatchEvent(selectionShapesEvent), 0);
    

    setShapeTypeArr((prevState) => {
      const newState = [...prevState];
      const newShapeType = { id: shape.id, type: shape.type };
      newState.push(newShapeType);
      return newState;
    });
  }
}
