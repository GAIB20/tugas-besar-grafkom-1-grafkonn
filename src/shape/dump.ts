import { Color, Model, Point } from "./model";

interface addVertexParam {
    point : Point;
    color : Color;
}

interface updateVertexParam {
    index : number;
    point : Point;
    color : Color;
}

interface convexHullReturn {
    points : Point[];
}

export default class Polygon extends Model {
    private data: number[] = []
    public type: string = "polygon"
    private color: Color = {red:0,green:0,blue:0,alpha:1}
    constructor(
    ) {
        super();
        this.data = []
    }

    updateData(data: number[]): void {
        this.data = data
    }

    translatePoint({index,value}: {index:number,value:Point}): void {
        this.data[index*6]+=value.x
        this.data[index*6+1]+=value.y
    } 

    getPoints({}: any): number {
        return this.data.length/6
    }

    updateVertex({index,point,color}:updateVertexParam): void {
        if(index+1<this.data.length/6){
            this.data[index*6] = point.x
            this.data[index*6+1] = point.y
            this.data[index*6+2] = color.red
            this.data[index*6+3] = color.green
            this.data[index*6+4] = color.blue
            this.data[index*6+5] = color.alpha
        }
        else{
            this.data.push(point.x,point.y,color.red,color.green,color.blue,color.alpha)
        }
    }

    addVertex({point,color}:addVertexParam): void {
        this.data.push(point.x,point.y,color.red,color.green,color.blue,color.alpha)
    }

    touchVertex({}: any): boolean {
        return false
    }

    updateColor({color}:{color:Color}): void {
        this.color = color
        for(let i=0;i<this.data.length;i+=6){
            this.data[i+2] = color.red
            this.data[i+3] = color.green
            this.data[i+4] = color.blue
            this.data[i+5] = color.alpha
        }
    }

    touchLine({}: any): boolean {
        return false
    }

    midPoint(): Point {
        let x=0
        let y=0

        for(let i=0;i<this.data.length;i+=6){
            x+=this.data[i]
            y+=this.data[i+1]
        }
        x/=this.data.length/6
        y/=this.data.length/6
        return {x:x,y:y}
    }

    translate(point:Point): void {
        for(let i=0;i<this.data.length;i+=6){
            this.data[i]+=point.x
            this.data[i+1]+=point.y
        }
    }

    rotate(angle: number): void {
        const angleRad = angle * Math.PI / 180
        const midPoint = this.midPoint()
        const cos = Math.cos(angleRad)
        const sin = Math.sin(angleRad)
        for (let i=0; i<this.data.length; i += 6) {
            const x = this.data[i]
            const y = this.data[i+1]
            this.data[i] = (x - midPoint.x) * cos - (y - midPoint.y) * sin + midPoint.x
            this.data[i+1] = (x - midPoint.x) * sin + (y - midPoint.y) * cos + midPoint.y
        }
    }

    dilate({}: any): void {
        
    }

    convexHull() : convexHullReturn {
        let points: Point[] = []
        for(let i=0;i<this.data.length;i+=6){
            points.push({x:this.data[i],y:this.data[i+1]})
        }
        let n = points.length;
        if(n<=3){
            return {points:points}
        }
        let hull: Point[] = []
        let l = 0;
        for(let i=1;i<n;i++){
            if(points[i].x<points[l].x){
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
        return {points:hull}
    }

    orientation(p: Point,q: Point,r: Point): number {
        let val = (q.y-p.y)*(r.x-q.x)-(q.x-p.x)*(r.y-q.y)
        if(val==0){
            return 0
        }
        return (val>0)?1:2
    }

    render(gl: WebGLRenderingContext): void {
        let convexHull : Point[] = this.convexHull().points
        let data : number[] = []
        for(let i=0;i<convexHull.length-2;i++){
            data.push(convexHull[0].x,convexHull[0].y,this.color.red,this.color.green,this.color.blue,this.color.alpha)
            data.push(convexHull[i+1].x,convexHull[i+1].y,this.color.red,this.color.green,this.color.blue,this.color.alpha)
            data.push(convexHull[i+2].x,convexHull[i+2].y,this.color.red,this.color.green,this.color.blue,this.color.alpha)
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        if(data.length>12){
            gl.drawArrays(gl.TRIANGLES, 0, data.length/6);
        }
        else if(data.length==12){
            gl.drawArrays(gl.LINES, 0, data.length/6);
        }
        else{
            gl.drawArrays(gl.POINTS, 0, data.length/6);
        }

    }
}