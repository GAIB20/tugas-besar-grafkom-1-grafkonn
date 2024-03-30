import React, { useState } from "react";
import LineIcon from "../assets/toolbar-icon/line.png";
import SquareIcon from "../assets/toolbar-icon/square.png";
import RectangleIcon from "../assets/toolbar-icon/rectangle.png";
import PolygonIcon from "../assets/toolbar-icon/polygon.png";
import SelectIcon from "../assets/toolbar-icon/select.png";
import MoveIcon from "../assets/toolbar-icon/move.png";
import DeleteIcon from "../assets/toolbar-icon/delete.png";
import SaveIcon from "../assets/toolbar-icon/save.png";
import LoadIcon from "../assets/toolbar-icon/load.png";

function Toolbar() {
    const [activeButton, setActiveButton] = useState(null);

    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const buttonStyle = (buttonName) => {
        return activeButton === buttonName ? "bg-primaryCanvas" : "bg-primaryDark";
    };

    return (
        <div className="bg-primaryDark w-10 h-full p-1 static flex flex-col items-center">
            <button
                className={`p-1 m-0.5 rounded-sm ${buttonStyle("Line")}`}
                onClick={() => handleClick("Line")}
            >
                <img src={LineIcon} alt="Line" className="w-4 h-auto" />
            </button>
            <button
                className={`p-1 m-0.5 rounded-sm ${buttonStyle("Square")}`}
                onClick={() => handleClick("Square")}
            >
                <img src={SquareIcon} alt="Square" className="w-4 h-auto" />
            </button>
            <button
                className={`p-1 m-0.5 rounded-sm ${buttonStyle("Rectangle")}`}
                onClick={() => handleClick("Rectangle")}
            >
                <img src={RectangleIcon} alt="Rectangle" className="w-6 h-auto" />
            </button>
            <button
                className={`p-1 m-0.5 rounded-sm ${buttonStyle("Polygon")}`}
                onClick={() => handleClick("Polygon")}
            >
                <img src={PolygonIcon} alt="Polygon" className="w-6 h-auto" />
            </button>
            <button
                className={`p-1 m-0.5 rounded-sm ${buttonStyle("Select")}`}
                onClick={() => handleClick("Select")}
            >
                <img src={SelectIcon} alt="Select" className="w-4 h-auto" />
            </button>
            <button
                className={`p-1 m-0.5 rounded-sm ${buttonStyle("Move")}`}
                onClick={() => handleClick("Move")}
            >
                <img src={MoveIcon} alt="Move" className="w-4 h-auto" />
            </button>
            <button
                className={`p-1 m-0.5 rounded-sm ${buttonStyle("Delete")}`}
                onClick={() => handleClick("Delete")}
            >
                <img src={DeleteIcon} alt="Delete" className="w-4 h-auto" />
            </button>
            <button
                className={`p-1 m-0.5 rounded-sm ${buttonStyle("Save")}`}
                onClick={() => handleClick("Save")}
            >
                <img src={SaveIcon} alt="Save" className="w-4 h-auto" />
            </button>
            <button
                className={`p-1 m-0.5 rounded-sm ${buttonStyle("Load")}`}
                onClick={() => handleClick("Load")}
            >
                <img src={LoadIcon} alt="Load" className="w-6 h-auto" />
            </button>
        </div>
    );
}

export default Toolbar;
