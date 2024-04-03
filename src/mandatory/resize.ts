import { AbstractShape } from "../shape/AbstractShape";

export function handleResize(e: Event, shape: AbstractShape) {
    const slider = e.target as HTMLInputElement;
    const factor = parseInt(slider.value)/100;

    if (factor >= shape.scaleFactor){
        shape.locationArr[3] += (factor-shape.scaleFactor) *20
        shape.locationArr[4] += (factor-shape.scaleFactor) *20 
        shape.locationArr[5] += (factor-shape.scaleFactor) *20 
        shape.locationArr[6] += (factor-shape.scaleFactor) *20 
        shape.locationArr[7] += (factor-shape.scaleFactor) *20
        shape.locationArr[8] += (factor-shape.scaleFactor) *20
    }else{
        shape.locationArr[3] -= (shape.scaleFactor-factor) *20
        shape.locationArr[4] -= (shape.scaleFactor-factor) *20 
        shape.locationArr[5] -= (shape.scaleFactor-factor) *20 
        shape.locationArr[6] -= (shape.scaleFactor-factor) *20 
        shape.locationArr[7] -= (shape.scaleFactor-factor) *20
        shape.locationArr[8] -= (shape.scaleFactor-factor) *20
    }
    shape.scaleFactor = factor;
}
