import { handleRotate } from "../mandatory/rotate";
import { handleTranslate } from "../mandatory/translate";
import { AbstractShape } from "../shape/AbstractShape";
import { setupSlider } from "./setupSlider";

export function setupEventListener(
  canvas: HTMLCanvasElement,
  selectedShapeIdx: number,
  translationArr: number[],
  shape: AbstractShape,
  drawScene : () => void,
  
) {
  // event listeners for translation
  setupSlider("#slider-translation-x", canvas.width, (e: Event) => {
    handleTranslate(e, selectedShapeIdx, translationArr, shape, "x");
    drawScene();
  });
  setupSlider("#slider-translation-y", canvas.height, (e: Event) => {
    handleTranslate(e, selectedShapeIdx, translationArr, shape, "y");
    drawScene();
  });

  // event listeners for rotation
  setupSlider("#slider-rotation", 360, (e: Event) => {
    handleRotate(e, selectedShapeIdx, rotationArr, shapesArr[selectedShapeIdx]);
    drawScene();
  });
}
