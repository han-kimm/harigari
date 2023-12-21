import clsx from "clsx";
import styles from "./Dropdown.module.css";
import { Dispatch, MouseEvent, ReactNode, SetStateAction, useState } from "react";
import Option from "./Option";
import Image from "next/image";
import Label from "@/components/Label/Label";

interface DropdownProp {
  children: ReactNode;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  options: string[];
}

const Dropdown = ({ options, value, setValue, children }: DropdownProp) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setIsOpen((value) => !value);
  };

  const selectedStyle = clsx(styles.selected, isOpen && styles.selectedBorder);

  return (
    <>
      <Label>{children}</Label>
      <div className={styles.root}>
        <div className={selectedStyle} onClick={handleClick}>
          {value}
          <Image src="/images/icons/arrow_drop_down.svg" alt="" width={26} height={26} />
        </div>
        {isOpen && (
          <div className={styles.options}>
            {options.map((option, index) => {
              return <Option value={value} setValue={setValue} setIsOpen={setIsOpen} option={option} key={index} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
