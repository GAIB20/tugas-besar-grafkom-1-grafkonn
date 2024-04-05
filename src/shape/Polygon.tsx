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
        const v1 = [0, 0, 0, 1];
        const v2 = [0, 0, 0, 1];
        const v3 = [0, 0, 0, 1];
        this.color = [
            ...v1,
            ...v2,
            ...v3,
        ]
    }

    onAddVertex(x: number, y: number): void {
        console.log("add vertex", x, y);
        const inputLoc = [...this.locationArr, x, y];
        const convexHull = this.convexHull(inputLoc)
        const data : number[] = []
        for(let i=0;i<convexHull.length-2;i++){
            data.push(convexHull[0][0],convexHull[0][1])
            data.push(convexHull[i+1][0],convexHull[i+1][1])
            data.push(convexHull[i+2][0],convexHull[i+2][1])
        }
        this.locationArr = data
        this.bufferLocSize = this.locationArr.length
        const newColor = []
        for (let i = 0; i < this.locationArr.length; i ++) {
            newColor.push(...[0, 0, 0, 1]);
        }
        console.log(newColor)
        console.log(this.locationArr)
        this.color = newColor;
    }

    convexHull(inputLoc: number[]) : number[][] {
        const points: number[][] = []
        for(let i=0;i<inputLoc.length;i+=2){
            points.push([inputLoc[i],inputLoc[i+1]])
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
