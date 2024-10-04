"use client";

import Button from "@/common/Atoms/Form/Button";
import handleAlert from "@/common/Molecules/handleAlert";
import useModal from "@/hooks/useModal";
import { cfetch } from "@/utils/customFetch";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ studyId }: { studyId: string }) {
  const rotuer = useRouter();
  const [disabled, setDisabled] = useState(false);

  function onDeleteCancel() {
    close();
  }

  async function onDelete() {
    setDisabled(() => true);
    const result = await cfetch("/api/study/" + studyId, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(({ data }) => data)
      .catch((err) => {
        console.error(err);
        return { state: false, message: "스터디삭제에 실패했습니다." };
      });

    if (!result?.state) {
      setDisabled(() => false);
      handleAlert("error", result.message);
      return;
    }

    handleAlert("success", result.message);
    rotuer.replace("/study");
    rotuer.refresh();
  }

  const { Modal, open, close } = useModal({
    children: (
      <div className="flex flex-col gap-5">
        <p className="text-H4">스터디를 삭제하시겠습니까?</p>
        <div className="flex items-center justify-center gap-4">
          <Button variation="outline" color="default" onClick={onDeleteCancel}>
            취소
          </Button>
          <Button
            variation="solid"
            color="danger"
            onClick={onDelete}
            disabled={disabled}
          >
            삭제
          </Button>
        </div>
      </div>
    ),
  });

  return (
    <>
      <button
        className="hover:underline hover:text-status-danger"
        onClick={open}
      >
        삭제
      </button>
      {Modal}
    </>
  );
}
