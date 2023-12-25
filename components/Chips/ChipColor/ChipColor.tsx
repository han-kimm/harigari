import { useState } from "react";
import clsx from "clsx";
import style from "./ChipColor.module.css";
import { ChipColorProps } from "@/components/Chips/chips.type";
const ChipColor = ({ size, color, onClick, isSelected }: ChipColorProps) => {
  return (
    <>
      <div
        className={clsx(
          style.container,
          { [style.large]: size === "lg" },
          { [style.green]: color === "green" },
          { [style.purple]: color === "purple" },
          { [style.orange]: color === "orange" },
          { [style.blue]: color === "blue" },
          { [style.pink]: color === "pink" }
        )}
        onClick={onClick}
      >
        {/* 크기에 따라 check.svg 변경 */}
        {isSelected ? <img src="/images/icons/check_small.svg" /> : null}
      </div>
    </>
  );
};

export default ChipColor;