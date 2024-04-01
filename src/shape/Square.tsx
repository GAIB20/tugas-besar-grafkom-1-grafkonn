import { AbstractShape } from "./AbstractShape";

export class Square extends AbstractShape {
  onCreate(width: number, height: number) {
    const size = width < height ? height : width;
    const newLoc = [0, 0, 0, size, size, size, size, size, size, 0, 0, 0];
    this.locationArr = newLoc;
    this.bufferLocSize = this.locationArr.length;
  }

  drawShape(): void {}
}
