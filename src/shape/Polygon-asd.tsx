import { AbstractShape } from "./AbstractShape";

export type Point = [number, number];

export class Polygon extends AbstractShape {
  vertex: Point[] = [];
  convexHullVertex: Point[] = [];

  onCreate(width: number, height: number) {
    const size = width < height ? height : width;
    // hexagon
    this.vertex = [
      [size / 2, 0],
      [size, size / 3],
      [size, (2 * size) / 3],
      [size / 2, size],
      [0, (2 * size) / 3],
      [0, size / 3],
    ];

    this.makeLocationArr()
    this.bufferLocSize = this.locationArr.length;
    this.type = "polygon";
    this.scaleFactor = 0;


    this.color = [...v1, ...v2, ...v3, ...v3, ...v4, ...v1];
    // 16	5
    // 2	34
  }
  drawShape(): void {}
  

  orientation(p: Point, q: Point, r: Point): number {
    const value = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
    if (value === 0) return 0; 
    return value > 0 ? 1 : 2; 
  }
  
  convexHull(points: Point[]): Point[] {
    const n = points.length;
    if (n < 3) return [];
  
    const hull: Point[] = [];
  
    // Find the leftmost point
    let leftmost = 0;
    for (let i = 1; i < n; i++) {
      if (points[i][0] < points[leftmost][0])
        leftmost = i;
    }
  
    let p = leftmost;
    let q: number;
    do {
      hull.push(points[p]);
      q = (p + 1) % n;
  
      for (let i = 0; i < n; i++) {
        if (this.orientation(points[p], points[i], points[q]) === 2)
          q = i;
      }
  
      p = q;
    } while (p !== leftmost);
  
    return hull;
  }

  makeLocationArr() {
    this.convexHullVertex = this.convexHull(this.vertex)
    let newLoc : number[] = []
    for (let i = 1; i < this.convexHullVertex.length - 2; i++) {
      newLoc = [...newLoc, ...this.vertex[0], ...this.vertex[i], ...this.vertex[i+1]]
    }
    this.locationArr = newLoc
  }

  makeColorArr() {
    let newColor: number[] = []
    const v1 = [Math.random(), Math.random(), Math.random(), 1];
    const v2 = [Math.random(), Math.random(), Math.random(), 1];
    const v3 = [Math.random(), Math.random(), Math.random(), 1];
    const v4 = [Math.random(), Math.random(), Math.random(), 1];
    const v5 = [Math.random(), Math.random(), Math.random(), 1];
    const v6 = [Math.random(), Math.random(), Math.random(), 1];
    
  }
}
