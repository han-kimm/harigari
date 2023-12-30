import React from "react";
import styles from "./AssigneeAndDueDateInfo.module.css";

import formatDate from "@/utils/formatDateString";
import { TaskInfo } from "../../Modal.type";
import ProfileIcon from "@/components/Members/ProfileIcon";

interface TaskCardInfoProps {
  data: TaskInfo;
}
const AssigneeAndDueDateInfo = ({ data }: TaskCardInfoProps) => {
  return (
    <div className={styles.assignee_and_dueDate}>
      <div className={styles.dueDate}>
        <span className={styles.label}>담당자</span>
        <div className={styles.assignee}>
          <div className={styles.profile_icon}>
            <ProfileIcon size="lg" member={data.assignee} />
          </div>
          <span className={styles.detail}>{data.assignee.nickname}</span>
        </div>
      </div>
      <div className={styles.dueDate}>
        <span className={styles.label}>마감일</span>
        <span className={styles.detail}>{formatDate(data.dueDate)}</span>
      </div>
    </div>
  );
};

export default AssigneeAndDueDateInfo;