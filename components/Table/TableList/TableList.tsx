import Button from "@/components/Buttons/Button/Button";
import ProfileIcon from "@/components/Members/ProfileIcon";
import { BasicUserType, InvitationData } from "@/types/api.type";
import styles from "./TableList.module.css";
import makeColorProfile from "@/utils/makeColorProfile";

type TableIndexType = {
  [a: string]: "nickname" | "dashboard" | "inviter" | "email" | "deleteButton" | "acceptButton" | "cancelButton";
};

interface TableListProps {
  data: (BasicUserType | InvitationData)[];
  tableIndex: TableIndexType;
  row: number;
}

const TableList = ({ data, tableIndex, row }: TableListProps) => {
  const column = Object.keys(tableIndex).length;
  const isAccept = Object.values(tableIndex).includes("acceptButton");
  console.log(column, isAccept);

  return (
    <ul className={isAccept ? styles.list__mobile : ""}>
      {data.map((data, idx) => {
        const arr = [];
        for (const key of Object.keys(tableIndex)) {
          const v = tableIndex[key];
          switch (true) {
            case v === "nickname":
              if (!(v in data)) continue;
              arr.push(
                <div className={styles.row__item} key={data[v]}>
                  <ProfileIcon member={data} tabIndex={-1} />
                  <p className={styles.row__item}>{data[v]}</p>
                </div>
              );
              continue;
            case v === "dashboard":
              if (!(v in data)) continue;
              arr.push(
                <div className={styles.row__item} key={data[v].title}>
                  {isAccept && <span className={styles.row__text__mobile}>{key}</span>}
                  <div className={styles.row__icon} style={{ backgroundColor: makeColorProfile(data[v].title) }} />
                  <p>{data[v].title}</p>
                </div>
              );
              continue;
            case v === "inviter":
              if (!(v in data)) continue;
              arr.push(
                <p className={styles.row__item} key={data[v].nickname}>
                  {isAccept && <span className={styles.row__text__mobile}>{key}</span>}
                  {data[v].nickname}
                </p>
              );
              continue;
            case v === "email":
              if ("inviter" in data) {
                arr.push(
                  <div className={styles.row__item} key={data.inviter[v]}>
                    <p className={styles.row__item}>{data.inviter[v]}</p>
                  </div>
                );
              }
              continue;
            case v === "deleteButton":
              {
                arr.push(
                  <Button buttonType="delete" color="white" key={v}>
                    삭제
                  </Button>
                );
              }
              continue;
            case v === "acceptButton":
              {
                arr.push(
                  <div className={styles.acceptbutton__wrapper} key={v}>
                    <Button buttonType="accept_reject" color="violet">
                      수락
                    </Button>
                    <Button buttonType="accept_reject" color="white">
                      거절
                    </Button>
                  </div>
                );
              }
              continue;
            case v === "cancelButton":
              arr.push(
                <Button buttonType="delete" color="white" key={v}>
                  취소
                </Button>
              );
              continue;
            default:
              arr.push(null);
          }
        }

        return (
          <li
            className={styles.row}
            style={{
              gridTemplateColumns: `repeat(${column - 1}, minmax(max-content, 1fr)) minmax(1rem, 8rem)`,
            }}
            key={idx}
          >
            {arr}
          </li>
        );
      })}
      {row !== Infinity &&
        data.length < row &&
        Array(row - data.length)
          .fill("")
          .map((v, i) => <li className={styles.row} key={i}></li>)}
    </ul>
  );
};

export default TableList;
