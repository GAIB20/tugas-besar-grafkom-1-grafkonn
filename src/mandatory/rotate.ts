import { AbstractShape } from "../shape/AbstractShape";

export function handleRotate(e: Event, shape: AbstractShape) {
  const slider = e.target as HTMLInputElement;
  const value = parseInt(slider.value);

  const angleInDegrees = 360 - value;
  const angleInRadians = (angleInDegrees * Math.PI) / 180;
  shape.rotation[0] = Math.sin(angleInRadians);
  shape.rotation[1] = Math.cos(angleInRadians);
}
