import { AbstractShape } from "./AbstractShape";

export type Point = [number, number];

export class Polygon extends AbstractShape {
  vertex: Point[] = [];
  convexHullVertex: Point[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCreate(width: number, height: number) {
    // const defSize = 200;
    this.vertex = [
      [width / 2, 0],
      [width, width / 3],
      [width, (2 * width) / 3],
      [width / 2, width],
      [0, (2 * width) / 3],
      [0, width / 3],
    ];

    this.makeLocationArr();
    this.bufferLocSize = this.locationArr.length;
    this.type = "polygon";
    this.scaleFactor = 0;
    const v = [0, 0, 0, 1];
    this.color = [
      ...v,
      ...v,
      ...v,
      ...v,
      ...v,
      ...v,
      ...v,
      ...v,
      ...v,
      ...v,
      ...v,
      ...v,
    ];
  }

  onAddVertex(x: number, y: number): void {
    console.log("add vertex", x, y);
    // const inputLoc = [...this.locationArr, x, y];
    this.vertex.push([x, y]);
    // console.log(this.vertex)
    this.makeLocationArr()
    this.bufferLocSize = this.locationArr.length;
    const newColor = [];
    for (let i = 0; i < this.locationArr.length; i++) {
      newColor.push(...[0, 0, 0, 1]);
    }
    // console.log(newColor);
    // console.log(this.locationArr);
    this.color = newColor;
  }

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
      if (points[i][0] < points[leftmost][0]) leftmost = i;
    }

    let p = leftmost;
    let q: number;
    do {
      hull.push(points[p]);
      q = (p + 1) % n;

      for (let i = 0; i < n; i++) {
        if (this.orientation(points[p], points[i], points[q]) === 2) q = i;
      }
      p = q;
    } while (p !== leftmost);

    return hull;
  }

  makeLocationArr() {
    this.convexHullVertex = this.convexHull(this.vertex);
    console.log(this.convexHullVertex);
    let newLoc: number[] = [];
    for (let i = 1; i < this.convexHullVertex.length - 1; i++) {
      newLoc = [
        ...newLoc,
        ...this.convexHullVertex[0],
        ...this.convexHullVertex[i],
        ...this.convexHullVertex[i + 1],
      ];
    }
    this.locationArr = newLoc;
  }

  drawShape(): void {}
}
