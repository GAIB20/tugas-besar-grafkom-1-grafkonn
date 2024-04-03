import "../styles/sidebar.css";

interface SidebarProps {
  shapeTypeArr: {
    id: number;
    type?: "square" | "circle" | "line" | "rectangle" | "polygon";
  }[];
}

function Sidebar({ shapeTypeArr }: SidebarProps) {
  const handleSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    sliderId: string
  ) => {
    const newValue = event.target.value;
    const slider = document.getElementById(`sliderVal${sliderId}`);
    if (!slider) return;
    slider.textContent = newValue;
  };

  return (
    <div className="static bg-primaryDark text-white">
      <div className="p-2 text-center">
        <p className="text-sm">Choose Shape</p>
        <hr className="border-primaryCanvas border-[0.1px] opacity-25 mb-0.5" />
        <select id="selectShape" className="w-full selector">
          {shapeTypeArr
            .filter(
              (shape, index, self) =>
                self.findIndex((i) => i.id === shape.id) === index
            )
            .map((shape) => (
              <option key={`${shape.id}`} value={`${shape.id}-${shape.type}`}>
                {shape.id}-{shape.type}
              </option>
            ))}
        </select>
        <p className="text-sm mt-4">Slider</p>
        <hr className="border-primaryCanvas border-[0.1px] opacity-25" />
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center mt-2">
            <span className="text-xs pr-2  w-12 text-left">x-axis</span>
            <input
              type="range"
              id="slider-translation-x"
              min="0"
              max="100"
              defaultValue="0"
              className="slider"
              onChange={(event) => handleSliderChange(event, "X")}
            />
            <div className="bg-black rounded-md w-10 px-2 py-1 ml-2 text-white text-xs">
              <output id="sliderValX" style={{ display: "block" }}>
                0
              </output>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-xs pr-2  w-12 text-left">y-axis</span>
            <input
              type="range"
              id="slider-translation-y"
              min="0"
              max="100"
              defaultValue="0"
              className="slider"
              onChange={(event) => handleSliderChange(event, "Y")}
            />
            <div className="bg-black rounded-md w-10 px-2 py-1 ml-2 text-white text-xs">
              <output id="sliderValY" style={{ display: "block" }}>
                0
              </output>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-xs pr-2  w-12 text-left">rotation</span>
            <input
              type="range"
              id="slider-rotation"
              min="0"
              max="360"
              defaultValue="0"
              className="slider"
              onChange={(event) => handleSliderChange(event, "Rotation")}
            />
            <div className="bg-black rounded-md w-10 px-2 py-1 ml-2 text-white text-xs">
              <output id="sliderValRotation" style={{ display: "block" }}>
                0
              </output>
            </div>
          </div>
        </div>
        <p className="text-sm mt-4">Choose Method</p>
        <hr className="border-primaryCanvas border-[0.1px] opacity-25 mb-0.5" />
        <select id="selectOption" className="selector">
          <option value="create">Create</option>
          <option value="move">Move vertex</option>
          <option value="changeColor">Change Color</option>
        </select>
      </div>
      <input
        id="color-picker"
        type="color"
        className="opacity-0 w-0 h-0 ml-3"
      />
    </div>
  );
}

export default Sidebar;
