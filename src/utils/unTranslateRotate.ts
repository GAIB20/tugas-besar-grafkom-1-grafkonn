export function unTranslateRotate(
  x: number,
  y: number,
  translationArr: number[],
  rotationArr: number[]
): number[] {
  const unTranslatedX = x - translationArr[0];
  const unTranslatedY = y - translationArr[1];

  const unRotatedX =
    unTranslatedX * rotationArr[1] - unTranslatedY * rotationArr[0];
  const unRotatedY =
    unTranslatedY * rotationArr[1] + unTranslatedX * rotationArr[0];

  return [unRotatedX, unRotatedY];
}
