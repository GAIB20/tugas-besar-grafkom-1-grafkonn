import { AbstractShape } from "../shape/AbstractShape";

export function handleResizeY(e: Event, shape: AbstractShape) {
    const slider = e.target as HTMLInputElement;
    const factorY = parseInt(slider.value)/100;

    if (factorY >= shape.scaleFactorY){
        shape.locationArr[3] += (factorY-shape.scaleFactorY) *20 
        shape.locationArr[5] += (factorY-shape.scaleFactorY) *20 
        shape.locationArr[7] += (factorY-shape.scaleFactorY) *20
    }else{
        shape.locationArr[3] -= (shape.scaleFactorY-factorY) *20 
        shape.locationArr[5] -= (shape.scaleFactorY-factorY) *20 
        shape.locationArr[7] -= (shape.scaleFactorY-factorY) *20
    }
    shape.scaleFactorY = factorY;
}
