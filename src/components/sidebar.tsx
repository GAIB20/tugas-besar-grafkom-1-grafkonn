import React, { useState } from "react";
import "../styles/sidebar.css";
import LineIcon from "../assets/toolbar-icon/line.png";
import SquareIcon from "../assets/toolbar-icon/square.png";
import RectangleIcon from "../assets/toolbar-icon/rectangle.png";
import PolygonIcon from "../assets/toolbar-icon/polygon.png";
import SelectIcon from "../assets/toolbar-icon/select.png";
import MoveIcon from "../assets/toolbar-icon/move.png";
import DeleteIcon from "../assets/toolbar-icon/delete.png";
import SaveIcon from "../assets/toolbar-icon/save.png";
import LoadIcon from "../assets/toolbar-icon/load.png";

function Sidebar() {
    const [activeButton, setActiveButton] = useState(null);

    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const buttonStyle = (buttonName) => {
        return activeButton === buttonName ? "bg-primaryCanvas" : "bg-primaryDark";
    };

    const handleSliderChange = (event, sliderId) => {
        const newValue = event.target.value;
        document.getElementById(`sliderVal${sliderId}`).textContent = newValue;
    };

    return (
        <div className="static bg-primaryDark text-white">
            <div className="p-2 text-center">
                <p className="text-sm">Slider</p>
                <hr className="border-primaryCanvas border-[0.1px] opacity-25"/>
                <div className="flex flex-col gap-y-2">
                    <div className="flex items-center mt-2">
                        <span className="text-xs pr-2  w-12 text-left  w-16 text-left">x-axis</span>
                        <input
                            type="range"
                            id="slider-translation-x"
                            min="0"
                            max="100"
                            defaultValue="0"
                            className="slider"
                            onChange={(event) => handleSliderChange(event, 'X')}
                        />
                        <div className="bg-black rounded-md w-10 px-2 py-1 ml-2 text-white text-xs">
                            <output id="sliderValX" style={{display: 'block'}}>0</output>
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
                            onChange={(event) => handleSliderChange(event, 'Y')}
                        />
                        <div className="bg-black rounded-md w-10 px-2 py-1 ml-2 text-white text-xs">
                            <output id="sliderValY" style={{display: 'block'}}>0</output>
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
                            onChange={(event) => handleSliderChange(event, 'Rotation')}
                        />
                        <div className="bg-black rounded-md w-10 px-2 py-1 ml-2 text-white text-xs">
                            <output id="sliderValRotation" style={{display: 'block'}}>0</output>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-2">
                <select id="selectOption">
                    <option value="create">Create</option>
                    <option value="move">Move vertex</option>
                </select>
            </div>
        </div>
    );
}

export default Sidebar;
