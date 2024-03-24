import { AbstractShape } from "./AbstractShape";

export class Square extends AbstractShape {
  onCreate(MainLocationBuffer: number[], width: number, height: number) {
    const size = width < height ? height : width;
    const newLoc = [0, 0, 0, size, size, size, size, size, size, 0, 0, 0];
    this.locationArr = newLoc;
    this.bufferLocSize = this.locationArr.length;
    this.addLocToBuffer(MainLocationBuffer);
  }

  drawShape(): void {}
}
