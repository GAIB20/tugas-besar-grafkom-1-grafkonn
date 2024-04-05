// Rectangle.ts
import { AbstractShape } from "./AbstractShape";

export class Polygon extends AbstractShape {
    onCreate(width: number, height: number) {
        const defSize = 200;
        const defLoc = [
            width, height, 
            width+defSize, height+defSize, 
            width-defSize, height+defSize];
        this.locationArr = defLoc;
        this.bufferLocSize = this.locationArr.length;
        this.type = "polygon";
        this.scaleFactor = 0;
        const v1 = [Math.random(), Math.random(), Math.random(), 1];
        const v2 = [Math.random(), Math.random(), Math.random(), 1];
        const v3 = [Math.random(), Math.random(), Math.random(), 1];
        this.color = [
            ...v1,
            ...v2,
            ...v3,
        ]
    }

    convexHull() : number[][] {
        const points: number[][] = []
        for(let i=0;i<this.locationArr.length;i+=2){
            points.push([this.locationArr[i],this.locationArr[i+1]])
        }

        const n = points.length;
        // There must be at least 3 points
        if(n<=3){
            return points
        }

        const hull: number[][] = []
        let l = 0;
        for(let i=1;i<n;i++){
            if(points[i][0]<points[l][0]){
                l = i
            }
        }

        let p = l,q;
        do{
            hull.push(points[p])
            q = (p+1)%n
            for(let i=0;i<n;i++){
                if(this.orientation(points[p],points[i],points[q])==2){
                    q = i
                }
            }
            p = q
        }while(p!=l)
        return hull
    }

    orientation(p: number[],q: number[],r: number[]): number {
        const val = (q[1]-p[1])*(r[2]-q[2])-(q[2]-p[2])*(r[1]-q[1])
        if(val==0){
            return 0
        }
        return (val>0)?1:2
    }
    drawShape(): void {}
    
}
