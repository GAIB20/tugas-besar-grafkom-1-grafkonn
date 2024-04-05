// Rectangle.ts
import { AbstractShape } from "./AbstractShape";

export class Line extends AbstractShape {
    onCreate(width: number, height: number) {
        const newLoc = 
        [ 0,0,
          width,height,];
        this.locationArr = newLoc;
        this.bufferLocSize = this.locationArr.length;
        this.type = "line";
        this.scaleFactor = 0;
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
