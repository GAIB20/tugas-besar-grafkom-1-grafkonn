export abstract class AbstractShape {
  public id: number;
  // for location purposes
  public locationArr: number[];
  public indexInLocBuffer: number;
  public bufferLocSize: number;

  // for translation purposes
  public translationArr: number[];
  public indexInTranslateBuffer: number;

  // for rotation purposes
  public rotation: number;
  public indexInRotationBuffer: number;

  // check if it's in the buffer
  public isInBuffer: boolean;

  constructor(id: number) {
    this.id = id;
    this.locationArr = [];
    this.bufferLocSize = 0;
    this.indexInLocBuffer = -1;

    this.translationArr = [0, 0];
    this.indexInTranslateBuffer = id * 2;

    this.rotation = 0;
    this.indexInRotationBuffer = id;

    this.isInBuffer = false;
  }

  // add this object to the buffer
  addLocToBuffer(MainLocationBuffer: number[]) {
    this.indexInLocBuffer = MainLocationBuffer.length;
    this.isInBuffer = true;

    for (const element of this.locationArr) {
      MainLocationBuffer.push(element);
    }
  }

  // modify the main buffer for this object
  setLocToBuffer(MainLocationBuffer: number[]) {
    for (let i = 0; i < this.bufferLocSize; i++) {
      MainLocationBuffer[i + this.indexInLocBuffer] = this.locationArr[i];
    }
  }

  abstract onCreate(
    MainLocationBuffer: number[],
    width: number,
    height: number
  ): void;

  // draw the shape
  abstract drawShape(): void;
}
