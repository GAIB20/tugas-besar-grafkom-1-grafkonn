import { AbstractShape } from "../shape/AbstractShape";

export function handleResizeX(e: Event, shape: AbstractShape) {
    const slider = e.target as HTMLInputElement;
    const factorX = parseInt(slider.value)/100;

    if (factorX >= shape.scaleFactorX){
        shape.locationArr[4] += (factorX-shape.scaleFactorX) *20 
        shape.locationArr[6] += (factorX-shape.scaleFactorX) *20 
        shape.locationArr[8] += (factorX-shape.scaleFactorX) *20
    }else{
        shape.locationArr[4] -= (shape.scaleFactorX-factorX) *20 
        shape.locationArr[6] -= (shape.scaleFactorX-factorX) *20 
        shape.locationArr[8] -= (shape.scaleFactorX-factorX) *20
    }
    shape.scaleFactorX = factorX;
}
