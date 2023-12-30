import { useState } from "react";
import style from "./ChipColors.module.css";
import ChipColor from "../ChipColor/ChipColor";

interface ChipColorProps {
  size: string;
  color: "green" | "purple" | "orange" | "blue" | "pink";
  onClick?: () => void;
  isSelected: boolean;
}

interface ChipColorsProps {
  size: "sm" | "lg";
}

const ChipColors = ({ size }: ChipColorsProps) => {
  const [selectedColor, setSelectedColor] = useState("green");
  const handleColorClick = (color: ChipColorProps["color"]) => {
    setSelectedColor(color);
  };

  return (
    <>
      <div className={style.container}>
        <ChipColor
          size={size}
          color="green"
          onClick={() => handleColorClick("green")}
          isSelected={selectedColor === "green"}
        />
        <ChipColor
          size={size}
          color="purple"
          onClick={() => handleColorClick("purple")}
          isSelected={selectedColor === "purple"}
        />
        <ChipColor
          size={size}
          color="orange"
          onClick={() => handleColorClick("orange")}
          isSelected={selectedColor === "orange"}
        />
        <ChipColor
          size={size}
          color="blue"
          onClick={() => handleColorClick("blue")}
          isSelected={selectedColor === "blue"}
        />
        <ChipColor
          size={size}
          color="pink"
          onClick={() => handleColorClick("pink")}
          isSelected={selectedColor === "pink"}
        />
      </div>
    </>
  );
};

export default ChipColors;
