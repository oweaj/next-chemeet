"use client";

import handleAlert from "@/common/Molecules/handleAlert";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ApplyButton({
  resultDay,
  studyPostId,
}: {
  resultDay: number;
  studyPostId: string;
}) {
  const router = useRouter();
  const { data: session } = useSession();

  const onClickHandler = () => {
    if (session?.user.id) {
      handleAlert("success", "참여가 완료되었습니다.");
      router.replace(`/study/${studyPostId}`);
    } else {
      router.replace("/login");
    }
  };

  const disabledControl = resultDay <= 0 || !session?.user ? false : true;

  return (
    <button
      onClick={onClickHandler}
      disabled={disabledControl}
      className={`px-2 w-full max-w-[12.5rem] h-16 border rounded-ten bg-main-700 font-semibold text-base text-white ${
        resultDay <= 0 && "disabled:opacity-75 disabled:cursor-no-drop"
      }`}
    >
      스터디 참여 신청하기
    </button>
  );
}
