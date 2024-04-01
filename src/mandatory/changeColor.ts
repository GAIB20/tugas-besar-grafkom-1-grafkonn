import { AbstractShape } from "../shape/AbstractShape";
import { hexToRgb, rgbToHex } from "../utils/colorConversion";
import { unTranslateRotate } from "../utils/unTranslateRotate";

export function onChangeColorVertexHandleMouseDown(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  chosenShapeIndex: number,
  shape: AbstractShape,
  changedColorVertexIdxArr: number[],
  mouseDownType: "create" | "move" | "changeColor" | string,
  colorPicker: HTMLInputElement,
  drawScene: () => void,
) {
  if (chosenShapeIndex === shape.id && mouseDownType === "changeColor") {

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
        changedColorVertexIdxArr.push(i / 2);
      }
    }
    if (changedColorVertexIdxArr.length > 0) {
      const colorHex = rgbToHex(
        shape.color[4 * changedColorVertexIdxArr[0]],
        shape.color[4 * changedColorVertexIdxArr[0] + 1],
        shape.color[4 * changedColorVertexIdxArr[0] + 2]
      );
      colorPicker.focus();
      colorPicker.value = colorHex;
      // for some reason we need to put it to timeout
      // because when we try to oppen the color picker without it,
      // it's showing the previous hex value assigned, idk why
  
      setTimeout(() => colorPicker.click(), 0);

      colorPicker.addEventListener("input", () => {
        const rgb = hexToRgb(colorPicker.value);
        for (let j = 0; j < changedColorVertexIdxArr.length; j += 1) {
          shape.color[4 * changedColorVertexIdxArr[j]] = rgb.r;
          shape.color[4 * changedColorVertexIdxArr[j] + 1] = rgb.g;
          shape.color[4 * changedColorVertexIdxArr[j] + 2] = rgb.b;
        }
        drawScene()
      });
      console.log(changedColorVertexIdxArr);
      console.log(colorHex);
    }
  }
}
