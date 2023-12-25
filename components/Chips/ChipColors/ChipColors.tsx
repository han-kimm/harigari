import { useState } from "react";
import style from "./ChipColors.module.css";
import ChipColor from "../ChipColor/ChipColor";
import { ChipColorsProps } from "@/components/Chips/chips.type";
import { ChipColorProps } from "@/components/Chips/chips.type";

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