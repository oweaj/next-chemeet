"use client";

import React from "react";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";

import Button from "@/common/Atoms/Form/Button";
import GridField from "@/common/Atoms/Form/Field";
import TextEditor from "@/common/Atoms/Form/TextEditor";
import LinkButton from "@/common/Atoms/LinkButton";
import { LabelText } from "@/common/Atoms/Form/Label";
import { AdditionIcon } from "@/common/Atoms/Image/Icon";
import ButtonCheck from "@/common/Molecules/Form/ButtonCheck";
import Input from "@/common/Molecules/Form/Input";
import { CATEGORIES } from "@/constants/categories/job_category";
import { GOALS } from "@/constants/categories/study_goal";
import { ONOFF } from "@/constants/categories/study_type";
import ThumbnailInput from "./ThumbnailInput";
import handleAlert from "@/common/Molecules/handleAlert";
import { useRouter } from "next/navigation";
import { StudySchema } from "@/types/model/StudyCard";
import { cfetch } from "@/utils/customFetch";
import SelectCategory from "./SelectCategory";
import CalenarDates from "./CalenarDates";

type CategoryOption = {
  readonly label: string;
  readonly value: string;
};

export type StudyValue = Omit<
  StudySchema,
  "writer" | "comments" | "createdAt" | "heartCount"
>;

export default function StudyForm({
  defaultValue,
}: {
  defaultValue?: StudyValue;
}) {
  const router = useRouter();
  const [disabled, setDisabled] = useState<boolean>(false);

  // Input 타입이 Number일 경우 (maxlength적용, 숫자만입력되게 적용)
  const onNumberInputFilter = (e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    if (e.currentTarget.value.length > e.currentTarget.maxLength)
      e.currentTarget.value = e.currentTarget.value.slice(
        0,
        e.currentTarget.maxLength
      );
  };

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // 스터디 카테고리
  const [jobCategory, setJobCategory] = useState<CategoryOption | null>({
    value: "",
    label: "",
  });

  // 목표 카테고리
  const [targetCategory, setTargetCategory] = useState<CategoryOption | null>({
    value: "",
    label: "",
  });

  // 모집기간
  const [recruitmentPeriod, setRecruitmentPeriod] = useState<[Date, Date]>([
    new Date(),
    new Date(),
  ]);
  const formRecruitmentDates = recruitmentPeriod?.map((date) =>
    date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, "")
      .replace(/ /g, ".")
  );

  // 스터디기간
  const [studyPreiod, setStudyPeriod] = useState<[Date, Date]>([
    new Date(),
    new Date(),
  ]);

  const formStudyDates = studyPreiod?.map((date) =>
    date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, "")
      .replace(/ /g, ".")
  );

  // 참가비용
  const [freeChecked, setFreeChecked] = useState<boolean>(false);
  const [free, setFree] = useState<number>(0);
  useEffect(() => {
    if (freeChecked === true) setFree(0);
  }, [freeChecked]);

  const FreeCheckedHandler = () =>
    setFreeChecked((freeChecked) => !freeChecked);

  // 스터디방식
  const [locationCategory, setLocationCategory] =
    useState<CategoryOption | null>({ value: "", label: "" });

  const [placeChecked, setPlaceChecked] = useState<boolean>(false);
  const [place, setPlace] = useState<string>("");
  useEffect(() => {
    if (placeChecked === true) setPlace("");
  }, [placeChecked]);
  const PlaceCheckedHandler = () =>
    setPlaceChecked((placeChecked) => !placeChecked);

  const [content, setContent] = useState<string>(
    defaultValue?.contents.content || ""
  );

  // 규칙 & 커리큘럼
  const [ruleList, setRuleList] = useState<string[]>([""]);
  const ruleAddtionHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRuleList([...ruleList, ""]);
  };
  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const newList = [...ruleList];
    newList[index] = event.target.value;
    setRuleList(newList);
  };
  const onHandleInputRuleRemove = (
    index: number,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (ruleList.length > 1) {
      const newRuleList = ruleList.filter((_, i) => i !== index);
      setRuleList(newRuleList);
    } else {
      alert("하나의 입력창이 있어야합니다.");
    }
  };

  const [curriculumList, setCurriculumList] = useState<string[]>([""]);
  const curriculumAddtionHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurriculumList([...curriculumList, ""]);
  };
  const curriculumHandleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const newList = [...curriculumList];
    newList[index] = event.target.value;
    setCurriculumList(newList);
  };
  const onHandleInputCurriculumRemove = (
    index: number,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (curriculumList.length > 1) {
      const newCurriculumList = curriculumList.filter((_, i) => i !== index);
      setCurriculumList(newCurriculumList);
    } else {
      alert("하나의 입력창이 있어야합니다.");
    }
  };

  // action
  async function action(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDisabled(() => true);

    const formData = new FormData(e.currentTarget);

    if (imageUrl) {
      formData.append("thumbnailUrl", imageUrl);
    }

    if (jobCategory) {
      formData.append("jobCategory", JSON.stringify(jobCategory));
    }
    if (targetCategory) {
      formData.append("targetCategory", JSON.stringify(targetCategory));
    }

    if (locationCategory) {
      formData.append("location", JSON.stringify(locationCategory));
    }

    if (formRecruitmentDates) {
      formData.append(
        "recruitmentPeriod",
        JSON.stringify(formRecruitmentDates)
      );
    }

    if (formStudyDates) {
      formData.append("studyPeriod", JSON.stringify(formStudyDates));
    }

    // 참가 비용
    // formData.append("expense", freeChecked ? "0" : free.toString());

    // 스터디 방식 및 장소
    // formData.append("location", locationCategory?.value || "");
    // if (locationCategory?.value === "offline" && !placeChecked) {
    //   formData.append("place", place);
    // }

    if (content) {
      formData.append("content", content);
    }
    // 스터디 규칙 추가
    if (ruleList) {
      formData.append("rules", JSON.stringify(ruleList));
    }

    // 세부 커리큘럼 추가
    if (curriculumList) {
      formData.append("curriculums", JSON.stringify(curriculumList));
    }

    const result = defaultValue?.studyId
      ? await cfetch("/api/study/" + defaultValue.studyId, {
          method: "PATCH",
          body: formData,
        })
          .then((res) => res.json())
          .then(({ data }) => data)
          .catch((err) => {
            console.error(err);
            return err;
          })
      : await cfetch("/api/study", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then(({ data }) => {
            return data;
          })
          .catch((err) => {
            console.log("err", err);
            return err;
          });

    console.log("수정 값 result", result);

    if (result?.state) {
      handleAlert("success", result.message);
      router.replace(
        "/study" + (defaultValue?.studyId ? "/" + defaultValue?.studyId : "")
      );
      router.refresh();
    } else {
      setDisabled(() => false);
      handleAlert(
        "error",
        defaultValue?.studyId
          ? "스터디 업데이트에 실패했어요."
          : "작성에 실패했어요."
      );
    }
  }

  return (
    <form onSubmit={action} className="flex flex-col gap-[36px]">
      <GridField>
        <LabelText form required>
          스터디 제목
        </LabelText>
        <Input.Text
          name="title"
          className="flex-1"
          placeholder="제목을 입력하세요."
          required
          defaultValue={defaultValue?.studyInfo.title}
        />
      </GridField>
      <ThumbnailInput
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        defaultValue={defaultValue?.studyInfo.thumbnailUrl}
      />
      <GridField>
        <LabelText form required>
          스터디 카테고리
        </LabelText>
        <div className="flex gap-3">
          <SelectCategory
            setData={setJobCategory}
            defaultValue={defaultValue?.studyInfo.jobCategory}
            categorys={CATEGORIES}
            placeholder="목표 카테고리"
          />

          <SelectCategory
            setData={setTargetCategory}
            defaultValue={defaultValue?.studyInfo.targetCategory}
            categorys={GOALS}
            placeholder="목표 카테고리"
          />
        </div>
      </GridField>
      <GridField>
        <LabelText form required>
          모집 인원
        </LabelText>
        <div className="flex items-center gap-3">
          <Input.Number
            name="recruitmentPeople"
            onInput={onNumberInputFilter}
            maxLength={3}
            required
            placeholder="0"
            className="w-32 text-right"
            defaultValue={defaultValue?.studyInfo.recruitmentPeople}
          />
          <span>명</span>
        </div>
      </GridField>
      <GridField>
        <LabelText form required>
          모집 기간
        </LabelText>
        <CalenarDates
          defaultDate={defaultValue?.studyInfo.recruitmentPeriod}
          data={recruitmentPeriod}
          setData={setRecruitmentPeriod}
        />
      </GridField>
      <GridField>
        <LabelText form required>
          스터디 기간
        </LabelText>
        <CalenarDates
          defaultDate={defaultValue?.studyInfo.studyPeriod}
          data={studyPreiod}
          setData={setStudyPeriod}
        />
      </GridField>
      <GridField>
        <LabelText form required>
          참가 비용
        </LabelText>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Input.Number
              onInput={onNumberInputFilter}
              maxLength={7}
              name="expense"
              required
              placeholder="0"
              className="w-32 text-right"
              onChange={(e) => {
                console.log("free", free, freeChecked);

                setFree(parseInt(e.target.value));
              }}
              value={!freeChecked ? free : 0}
              disabled={freeChecked}
              defaultValue={defaultValue?.studyInfo.expense}
            />
            <span>원</span>
          </div>
          <ButtonCheck>
            <ButtonCheck.Radio
              onClick={FreeCheckedHandler}
              checked={freeChecked}
              defaultChecked={freeChecked}
              id="free"
              label="참가비 무료"
            />
          </ButtonCheck>
        </div>
      </GridField>
      <GridField>
        <LabelText form required>
          스터디 방식
        </LabelText>
        <div className="flex flex-col gap-6 w-[510px]">
          <SelectCategory
            setData={setLocationCategory}
            defaultValue={defaultValue?.studyInfo.location}
            categorys={ONOFF}
            placeholder="스터디 방식"
          />
          {locationCategory?.value === "offline" && (
            <div className="flex items-center gap-3">
              <Input.Text
                name="place"
                className="min-w-[378px]"
                placeholder="주소를 입력해주세요."
                onChange={(e) => setPlace(e.target.value)}
                defaultValue={
                  defaultValue?.studyInfo.place
                    ? defaultValue?.studyInfo.place
                    : place
                }
                disabled={placeChecked}
                readOnly
              />
              <ButtonCheck>
                <ButtonCheck.Radio
                  id="place-whether"
                  onChange={PlaceCheckedHandler}
                  checked={placeChecked}
                  defaultChecked={placeChecked}
                  label="장소 미정"
                />
              </ButtonCheck>
            </div>
          )}
        </div>
      </GridField>
      <GridField>
        <LabelText form required>
          스터디 소개
        </LabelText>
        <TextEditor
          id="content"
          className="h-[450px]"
          placeholder="스터디 소개, 스터디 규칙 등을 상세히 작성해 주세요."
          defaultValue={defaultValue?.contents.content}
          onChange={(c: string) => setContent(c)}
        />
      </GridField>
      <GridField>
        <LabelText form>스터디 규칙</LabelText>
        <div className="flex flex-col flex-1 gap-4">
          {ruleList.map((rule, index) => (
            <div key={`r-${index}`} className="flex items-center gap-6">
              <div className="flex-1">
                <Input.Text
                  className="w-full"
                  placeholder="스터디 규칙을 정해주세요."
                  value={rule}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              {index === 0 ? (
                <button onClick={ruleAddtionHandler}>
                  <AdditionIcon color="#000" />
                </button>
              ) : (
                <button
                  className="w-5 h-5 "
                  onClick={(e) => onHandleInputRuleRemove(index, e)}
                >
                  ❌
                </button>
              )}
            </div>
          ))}
        </div>
      </GridField>
      <GridField>
        <LabelText form>세부 커리큘럼</LabelText>
        <div className="flex flex-col flex-1 gap-4">
          {curriculumList.map((curriculum, index) => (
            <div key={`c-${index}`} className="flex items-center gap-6">
              <div className="flex-1">
                <Input.Text
                  className="w-full"
                  placeholder="세부적인 커리큘럼을 정해주세요."
                  value={curriculum}
                  onChange={(event) =>
                    curriculumHandleInputChange(index, event)
                  }
                />
              </div>
              {index === 0 ? (
                <button onClick={curriculumAddtionHandler}>
                  <AdditionIcon color="#000" />
                </button>
              ) : (
                <button
                  className="w-5 h-5 "
                  onClick={(e) => onHandleInputCurriculumRemove(index, e)}
                >
                  ❌
                </button>
              )}
            </div>
          ))}
        </div>
      </GridField>

      <div className="flex gap-gutter-xl items-center justify-center mt-24">
        <LinkButton href="/study" variation="outline" size="form">
          작성 취소
        </LinkButton>
        <Button variation="solid" size="form" disabled={disabled}>
          작성 완료
        </Button>
      </div>
    </form>
  );
}
