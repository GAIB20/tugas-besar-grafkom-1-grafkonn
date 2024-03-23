abstract class AbstractShape {
  public locationArr: Float32Array | null;
  public indexInBuffer: number | null;
  public bufferSize: number | null;
  public translationArr: Int32Array | null;
  public rotation: number;

  constructor() {
    this.locationArr = null;
    this.bufferSize = null;
    this.indexInBuffer = null;
    this.translationArr = null;
    this.rotation = 0;
  }
  abstract setLocationBuffer(locationArr: Float32Array, indexInBuffer: number): void;
  abstract drawShape(): void;
}
