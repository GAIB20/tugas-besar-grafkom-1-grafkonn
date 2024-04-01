export abstract class AbstractShape {
  public id: number;
  // for location purposes
  public locationArr: number[];
  public indexInBuffer: number;
  public bufferLocSize: number;

  // for translation purposes
  public translationArr: number[];

  // for rotation purposes
  public rotation: number[];

  constructor(id: number) {
    this.id = id;
    this.indexInBuffer = id
    
    this.locationArr = [];
    this.bufferLocSize = 0;
    this.indexInBuffer = -1;

    this.translationArr = [0, 0];

    this.rotation = [0, 1];
  }

  abstract onCreate(
    width: number,
    height: number,
  ): void;

  // draw the shape
  abstract drawShape(): void;
}
