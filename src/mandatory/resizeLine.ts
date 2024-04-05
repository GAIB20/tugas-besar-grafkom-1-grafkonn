import { AbstractShape } from "../shape/AbstractShape";

export function handleResizeLine(e: Event, shape: AbstractShape) {
    const slider = e.target as HTMLInputElement;
    const factor = parseInt(slider.value)/100;

    for (let i = 2; i < 4; i++) {
        if (factor >= shape.scaleFactor) {
            shape.locationArr[i] += (factor - shape.scaleFactor) * 20;
        } else {
            shape.locationArr[i] -= (shape.scaleFactor - factor) * 20;
        }
    }
    shape.scaleFactor = factor;
}
