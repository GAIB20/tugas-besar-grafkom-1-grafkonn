export function setupSlider(
  selector: string,
  max: number,
  handleSliderChange: (event: Event) => void
): void {
  const slider = document.querySelector<HTMLInputElement>(selector);

  if (!slider) {
    throw new Error("Slider not found!");
  }

  slider.max = max.toString();
  slider.min = "0";
  slider.value = "0";

  slider.addEventListener("input", handleSliderChange);
}
