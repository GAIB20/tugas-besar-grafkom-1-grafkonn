import { AbstractShape } from "../shape/AbstractShape";
import { Polygon } from "../shape/Polygon";

export function onAddVertexMouseDown(
    e:MouseEvent,
    shape: AbstractShape,
    canvas: HTMLCanvasElement,
) {
    console.log(shape.type);
    if (shape.type == "polygon") {
        const polygon = shape as Polygon;
        const canvasRect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - canvasRect.left;
        const mouseY = e.clientY - canvasRect.top;
        polygon.onAddVertex(mouseX, mouseY);
    }
    
}
