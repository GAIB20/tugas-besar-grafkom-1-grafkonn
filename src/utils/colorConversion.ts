export function rgbToHex(r: number, g: number, b: number): string {
  console.log(r, g, b);
  const componentToHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hexR = componentToHex(r);
  const hexG = componentToHex(g);
  const hexB = componentToHex(b);

  return `#${hexR}${hexG}${hexB}`;
}

export function hexToRgb(hex: string): { r: number, g: number, b: number } {
  hex = hex.replace('#', '');
  const decimal = parseInt(hex, 16);

  const r = ((decimal >> 16) & 255) / 255;
  const g = ((decimal >> 8) & 255) / 255;
  const b = (decimal & 255) / 255;

  return { r, g, b };
}