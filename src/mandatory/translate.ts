import { AbstractShape } from "../shape/AbstractShape";

export function handleTranslate(
  e: Event,
  shape: AbstractShape,
  type: "x" | "y"
) {
  const slider = e.target as HTMLInputElement;
  const value = parseInt(slider.value);
  shape.translationArr[type == "x" ? 0 : 1] = value;
}
