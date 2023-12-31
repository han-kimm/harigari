import style from "./dashboard.module.css";
import ChipPlus from "@/components/Chips/ChipPlus/ChipPlus";
import Button from "@/components/Buttons/Button/Button";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import sender from "@/apis/sender";
import { getAccessTokenFromCookie } from "@/utils/getAccessToken";
import MenuLayout from "@/components/Menulayout/MenuLayout";
import { FormEvent, useState, useEffect } from "react";
import stylesFromSingle from "@/modals/Modal.module.css";
import ModalWrapper from "@/modals/ModalWrapper";
import ModalButton from "@/modals/components/ModalButton/ModalButton";
import useInputController from "@/hooks/useInputController";
import InputWrapper from "@/components/Input/InputWrapper";
import Input from "@/components/Input/Input";
import useApi from "@/hooks/useApi";
import { ColumnData } from "@/types/api.type";
import { Column } from "@/components/Column/Column";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const accessToken = getAccessTokenFromCookie(context) as string;

  const boardId = context.query["boardId"];

  const {
    data: { data: columnData },
  } = await sender.get({ path: "columns", id: Number(boardId), accessToken });

  const {
    data: { members: assigneeList },
  } = await sender.get({ path: "members", id: Number(boardId), accessToken });

  return {
    props: { accessToken, columnData, assigneeList, boardId },
  };
};

const Dashboard = ({
  accessToken,
  columnData,
  assigneeList,
  boardId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [columnList, setColumnList] = useState<ColumnData[]>(columnData);
  const [isCreateModal, setIsCreateModal] = useState(false);

  const handleCreateNewColumnModalToggle = () => {
    setIsCreateModal((prevValue) => !prevValue);
  };
  const createModal = useInputController({
    inputConfig: { id: "createModal" },
    labelConfig: { labelName: "이름" },
  });

  const { pending, wrappedFunction } = useApi("post");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await wrappedFunction({
      path: "column",
      data: {
        title: createModal.input.value,
        dashboardId: Number(boardId),
      },
      accessToken,
    });

    if (res?.status === 201) {
      createModal.input.setValue("");
      handleCreateNewColumnModalToggle();
      setColumnList((prevValue) => [...prevValue, res.data]);
    }
  };

  return (
    <>
      {/* 대시보드에 맞는 레이아웃으로 설정-헤더 수정 */}
      <MenuLayout>
        <div className={style.layoutContainer}>
          <div className={style.columnContainer}>
            {columnList.map((column, index) => {
              return (
                <Column
                  setColumnList={setColumnList}
                  accessToken={accessToken}
                  columnId={column.id}
                  assigneeList={assigneeList}
                  title={column.title}
                  dashboardId={column.dashboardId}
                  key={column.id}
                />
              );
            })}
          </div>
          <div className={style.buttonWrapper}>
            <Button buttonType="add_column" color="white" onClick={handleCreateNewColumnModalToggle}>
              <div className={style.buttonContentWrapper}>
                <span>새로운 컬럼 추가하기</span>
                <ChipPlus size="lg"></ChipPlus>
              </div>
            </Button>
          </div>
        </div>
      </MenuLayout>

      {isCreateModal && (
        <ModalWrapper size="md">
          <form className={stylesFromSingle.form} onSubmit={handleSubmit} noValidate>
            <div className={stylesFromSingle.modal}>
              <div className={stylesFromSingle.modalTitle}>새 컬럼 생성</div>

              <InputWrapper {...createModal.wrapper}>
                <Input {...createModal.input} />
              </InputWrapper>
            </div>

            <ModalButton.DoubleButton disabled={pending} onClick={handleCreateNewColumnModalToggle}>
              생성
            </ModalButton.DoubleButton>
          </form>
        </ModalWrapper>
      )}
    </>
  );
};

export default Dashboard;