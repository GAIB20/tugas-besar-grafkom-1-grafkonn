function componentToHex(c : number) {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
}

function rgbToHex(rgba: readonly [number, number, number, number]) : string {
    return `#${componentToHex(rgba[0])}${componentToHex(rgba[1])}${componentToHex(rgba[2])}`;
}

function hexToRgb(hex: string) : [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) {
        throw new Error('Invalid hex color');
    }
    return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
    ];
}

export { rgbToHex, hexToRgb };

