"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Button from "@/common/Atoms/Form/Button";
import Label from "@/common/Atoms/Form/Label";
import handleAlert from "@/common/Molecules/handleAlert";
import { unregisterAction } from "@/lib/actions/authAction";
import useModal from "@/hooks/useModal";
import Input from "@/common/Molecules/Form/Input";

export default function DeleteAccountConfirm() {
  const { data: session } = useSession();
  const email = session?.user.email as string;

  const [checked, setChecked] = useState<boolean>(false);
  const { Modal, open, close } = useModal({
    children: (
      <div className="max-lg:w-full max-lg:h-full flex flex-col justify-center items-center gap-6 max-w-96">
        <p className="text-H3 text-label-normal">회원 탈퇴를 진행할까요?</p>
        <p className="text-body-400 text-center text-label-neutral break-words">
          계정을 삭제하면 작성한 게시물들의 작성자가 익명 처리되며 자동으로
          삭제되지 않습니다.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button variation="solid" color="danger" onClick={unregister}>
            계정 삭제
          </Button>
        </div>
      </div>
    ),
    key: "confirm-unregister",
  });

  async function unregister() {
    try {
      const result = await unregisterAction(email);

      if (result.state) {
        setTimeout(() => {
          signOut({ callbackUrl: "/" });
        }, 2000);
        close();
        handleAlert("success", result.message);
      } else {
        handleAlert("error", result.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="flex flex-row gap-2 items-start mb-4">
        <Input.Checkbox
          type="checkbox"
          id="agreeDeleteAccount"
          className="my-[2px] pointer-events-auto"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <Label
          htmlFor="agreeDeleteAccount"
          className="text-body-400 text-label-dimmed select-none"
        >
          버튼을 클릭하면 계정이 영구적으로 삭제되는 것을 이해했습니다.
          <br />
          계정을 삭제한 후에 해당 계정을 복구할 수 없습니다.
          <br />
          작성한 게시물의 작성자가 익명 처리됩니다.
        </Label>
      </div>
      <Button
        variation="outline"
        color="danger"
        disabled={!checked}
        onClick={open}
      >
        회원 탈퇴
      </Button>
      {Modal}
    </div>
  );
}
