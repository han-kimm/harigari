import { CardData } from "@/types/api.type";
import ChipNum from "../Chips/ChipNum/ChipNum";
import ChipPlus from "../Chips/ChipPlus/ChipPlus";
import ChipTodo from "../Chips/ChipTodo/ChipTodo";
import style from "./Card.module.css";
import Card from "@/components/Card/Card";
import Image from "next/image";

interface ColumnPorps {
  cardList: CardData[];
}

const Column = ({ cardList }: ColumnPorps) => {
  return (
    <div className={style.totalContainer}>
      {/* 칼럼 상단 */}
      <div className={style.headerContainer}>
        <div className={style.todoWrapper}>
          <ChipTodo size="sm" color="white">
            On Progress
          </ChipTodo>
          <ChipNum>{cardList.length}</ChipNum>
        </div>
        <button>
          <Image width={24} height={24} src="/icons/icon-settings.svg" alt="칼럼 설정하기" />
        </button>
      </div>

      <div className={style.contentContainer}>
        {/* 컴포넌트로 바꾸기 */}
        <div className={style.buttonWrapper}>
          <ChipPlus size="lg"></ChipPlus>
        </div>
        {cardList.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Column;
