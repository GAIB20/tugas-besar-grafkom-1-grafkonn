export abstract class AbstractShape {
  public id: number;
  // for location purposes
  public type?: "square" | "circle" | "line" | "rectangle" | "polygon";
  public locationArr: number[];
  public indexInBuffer: number;
  public bufferLocSize: number;

  // for translation purposes
  public translationArr: number[];

  // for rotation purposes
  public rotation: number[];

  // for color purposes
  public color: number[];

  // for resize purposes
  public scaleFactor: number;

  constructor(id: number) {
    this.id = id;
    this.indexInBuffer = id
    this.type = undefined // defined later inside onCreate
 
    this.locationArr = [];
    this.bufferLocSize = 0;
    this.indexInBuffer = -1;

    this.translationArr = [0, 0];

    this.rotation = [0, 1];

    // must be initialized on every different shape
    this.color = []
    this.scaleFactor = 0;
  }

  abstract onCreate(
    width: number,
    height: number,
  ): void;

  // draw the shape
  abstract drawShape(): void;
}
