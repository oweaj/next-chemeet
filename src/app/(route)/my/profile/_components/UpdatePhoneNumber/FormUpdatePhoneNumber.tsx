"use client";

import Input from "@/common/Molecules/Form/Input";
import ProfileInputArea from "../ProfileInputArea";
import Button from "@/common/Atoms/Form/Button";
import { ChangeEvent, FormEvent, useState } from "react";
import { updateUserData } from "@/lib/actions/profileAction";
import handleAlert from "@/common/Molecules/handleAlert";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

export default function FormUpdatePhoneNumber({ userId }: { userId: string }) {
  const [phoneData, setPhoneData] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const phone = formData.get("phone") as string;

    if (phone.length < 13) {
      handleAlert("error", "전화번호 자릿수를 다시 확인해주세요.");
      return;
    }

    try {
      const result = await updateUserData(userId, { phone });
      if (result?.state) {
        handleAlert("success", result.message);
      } else {
        handleAlert("error", result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handlePhoneInput(e: ChangeEvent<HTMLInputElement>) {
    const formatData = formatPhoneNumber(e.target.value);
    setPhoneData(formatData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <ProfileInputArea>
        <div className="flex gap-4 items-center">
          <Input.Text
            name="phone"
            placeholder="핸드폰 번호(숫자만)를 입력하세요"
            className="w-full"
            onChange={handlePhoneInput}
            maxLength={13}
            value={phoneData}
          />
          <Button variation="outline" disabled={phoneData.length < 1}>
            수정하기
          </Button>
        </div>
      </ProfileInputArea>
    </form>
  );
}
