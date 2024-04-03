// Circle.ts
import { AbstractShape } from "./AbstractShape";

export class Circle extends AbstractShape {
  private radius: number;

  constructor(id: number, radius: number) {
    super(id);
    this.radius = radius;
  }

  onCreate(width: number, height: number) {
    const centerX = width / 2;
    const centerY = height / 2;

    const numVertices = 32;
    const angleIncrement = (2 * Math.PI) / numVertices;

    const newLoc = [];
    for (let i = 0; i < numVertices; i++) {
      const angle = i * angleIncrement;
      const x = centerX + this.radius * Math.cos(angle);
      const y = centerY + this.radius * Math.sin(angle);
      newLoc.push(x, y, 0);
    }
    this.locationArr = newLoc;
    this.bufferLocSize = this.locationArr.length;
    this.type = "circle";

    // Generate random color
    const color = [];
    for (let i = 0; i < numVertices; i++) {
      const r = Math.random();
      const g = Math.random();
      const b = Math.random();
      const a = 1; // Alpha value
      color.push(r, g, b, a);
    }
    this.color = color;
  }

  drawShape(): void {}
}
