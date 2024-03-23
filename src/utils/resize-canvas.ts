export function resizeCanvas(canvas: HTMLCanvasElement) {
  const screenWidth = canvas.clientWidth;
  const screenHeight = canvas.clientHeight;
  if (canvas.width !== screenWidth || canvas.height !== screenHeight) {
    canvas.width = screenWidth;
    canvas.height = screenHeight;
  }
}
