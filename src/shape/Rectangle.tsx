// Rectangle.ts
import { AbstractShape } from "./AbstractShape";

export class Rectangle extends AbstractShape {
    onCreate(width: number, height: number) {
        const size = width < height ? height : width;
        const newLoc = [0, 0, 0, size, size*2, size, size*2, size, size*2, 0, 0, 0];
        this.locationArr = newLoc;
        this.bufferLocSize = this.locationArr.length;
        this.type = "rectangle";
        this.scaleFactor = 0;
        this.scaleFactorX = 0;
        this.scaleFactorY = 0;
        const v1 = [Math.random(), Math.random(), Math.random(), 1];
        const v2 = [Math.random(), Math.random(), Math.random(), 1];
        const v3 = [Math.random(), Math.random(), Math.random(), 1];
        const v4 = [Math.random(), Math.random(), Math.random(), 1];
        
        this.color = [
            ...v1,
            ...v2,
            ...v3,
            ...v3,
            ...v4,
            ...v1,
        ]
            // 16	5
            // 2	34
    }
    drawShape(): void {}
}
