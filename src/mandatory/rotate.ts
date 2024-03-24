import { AbstractShape } from "../shape/AbstractShape";

export function handleRotate(
  e: Event,
  chosenShapeIndex: number,
  rotateArr: number[],
  shape: AbstractShape,
) {
  if (chosenShapeIndex === shape.id) {
    const slider = e.target as HTMLInputElement;
    const value = parseInt(slider.value);

    const angleInDegrees = 360 - value;
    const angleInRadians = angleInDegrees * Math.PI / 180;
    shape.rotation[0] = Math.sin(angleInRadians);
    shape.rotation[1] = Math.cos(angleInRadians);
    
    const index = shape.indexInRotationBuffer
    rotateArr[index] = shape.rotation[0];
    rotateArr[index + 1] = shape.rotation[1];
  }
}
