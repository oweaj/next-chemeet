"use client";

import { FormEvent, MouseEventHandler, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Button from "@/common/Atoms/Form/Button";
import {
  CATEGORIES,
  CATEGORIES_ALL_OPTIONS,
} from "@/constants/categories/job_category";
import Input from "@/common/Molecules/Form/Input";
import { RefreshIcon } from "@/common/Atoms/Image/Icon";
import { saveMyCategory } from "@/lib/actions/profileAction";
import handleAlert from "@/common/Molecules/handleAlert";

export default function SetCategoryFavor({ userId }: { userId: string }) {
  const router = useRouter();
  const categoryGroup = CATEGORIES.map(({ value, label }) => ({
    value,
    label,
  }));
  const [shown, setShown] = useState<number>(0);
  const categoryRef = useRef<HTMLFormElement>(null);

  const skipThis: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    handleAlert("success", "회원가입이 완료되어 로그인 되었습니다.");
    router.replace("/");
  };

  async function saveCategory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const checkedData = new FormData(e.currentTarget);
    const formData = new FormData();
    const my_category = [];

    for (const [key, value] of checkedData) {
      if (key !== "category_group") {
        my_category.push(
          CATEGORIES_ALL_OPTIONS.find((opt) => opt.value === value)
        );
      }
    }

    formData.append("my_category", JSON.stringify(my_category));

    try {
      const result = await saveMyCategory(userId, formData);
      if (result.state) {
        router.replace("/");
        handleAlert("success", result.message);
      } else {
        handleAlert("error", result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col gap-6 shadow-emphasize rounded-twenty p-10">
      <div className="flex items-center justify-between">
        <p>
          <span className="text-H3 text-label-normal block">
            관심 있는 전공 · 직무 카테고리를 선택하세요
          </span>
          <span className="text-label-400 text-label-neutral">
            선택한 카테고리와 관련된 스터디를 우선으로 추천해 드립니다. <br />
            선택하지 않고 건너뛰어 홈으로 이동할 수도 있습니다.
          </span>
        </p>
        <Button.Icon
          onClick={() => {
            if (categoryRef?.current) {
              categoryRef.current.reset();
            }
          }}
        >
          <RefreshIcon />
        </Button.Icon>
      </div>
      <form
        onSubmit={saveCategory}
        ref={categoryRef}
        className="flex flex-col gap-6 p-2"
      >
        <div className="flex gap-2 items-start justify-center min-h-full overflow-hidden [&>ul]:max-h-[400px]">
          <ul className="w-[200px] h-full overflow-y-auto">
            {categoryGroup.map((group, index) => (
              <li key={group.value}>
                <label className="flex items-center justify-start [&>input]:hidden [&>input:checked+span]:bg-main-25 [&>input:checked+span]:text-body-600 [&>input:checked+span]:text-main-600">
                  <input
                    name="category_group"
                    type="radio"
                    checked={shown === index}
                    onChange={() => setShown(index)}
                  />
                  <span className="block w-full px-8 py-4 rounded-xl">
                    {group.label}
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <ul className="w-[320px] h-full overflow-y-auto">
            {CATEGORIES.map(({ value, options }, index) => (
              <div
                key={`${value}-option-${index}`}
                className={clsx({
                  block: index === shown,
                  hidden: index !== shown,
                })}
              >
                {options.map(({ value, label }) => (
                  <li key={value}>
                    <label className="flex items-center gap-2 px-8 py-4">
                      <Input.Checkbox
                        name="my_category"
                        id={value}
                        value={value}
                      />
                      {label}
                    </label>
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>
        <div className="w-full h-0 border-t border-t-line-neutral"></div>
        <div className="flex gap-4 justify-between">
          <Button variation="outline" onClick={skipThis}>
            건너뛰기
          </Button>
          <Button type="submit" variation="solid">
            관심 카테고리 저장
          </Button>
        </div>
      </form>
    </div>
  );
}
