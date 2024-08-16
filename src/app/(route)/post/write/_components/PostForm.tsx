"use client";

import TextEditor from "@/common/Atoms/Form/TextEditor";
import LinkButton from "@/common/Atoms/LinkButton";
import Button from "@/common/Atoms/Form/Button";
import GridField from "@/common/Atoms/Form/Field";
import { LabelText } from "@/common/Atoms/Form/Label";
import Input from "@/common/Molecules/Form/Input";
import SelectCategory from "./SelectCategory";
import { FormEvent, useRef, useState } from "react";
import { Session } from "next-auth";
import {
  createCommunity,
  updateCommunity,
} from "@/lib/actions/communityAction";
import { redirect, useRouter } from "next/navigation";
import handleAlert from "@/common/Molecules/handleAlert";
import SelectLinkedStudy from "./SelectLinkedStudy";
import ReactQuill from "react-quill";
import { PostSchema } from "@/types/model/PostItem";
import { cfetch } from "@/utils/customFetch";

type Option = {
  readonly label: string;
  readonly value: string;
};

export type PostValue = Omit<
  PostSchema,
  "writer" | "comments" | "createdAt" | "view" | "like"
>;

export default function PostForm({
  sessionId,
  defaultValue,
}: {
  sessionId: string;
  defaultValue?: PostValue;
}) {
  const [category, setCategory] = useState<Option>({ value: "", label: "" });
  const [content, setContent] = useState<string>("");
  const router = useRouter();
  async function submitPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // const id = sessionId;

    // console.log("category", formData.get("category"));
    if (content) {
      formData.append("body", content);
    }

    if (category.value) {
      formData.append("categoryValue", category.value);
      formData.append("categoryLabel", category.label);
    }

    const result = defaultValue?.postId
      ? await cfetch("/api/community/" + defaultValue.postId, {
          method: "PATCH",
          body: formData,
        })
          .then((res) => res.json())
          .then(({ data }) => data)
          .catch((err) => {
            console.error(err);
            return err;
          })
      : await cfetch("/api/community", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then(({ data }) => data)
          .catch((err) => {
            console.error(err);
            return err;
          });

    if (result?.state) {
      handleAlert("success", result.message);
      router.replace("/post");
    } else {
      handleAlert(
        "error",
        defaultValue?.postId ? "업데이트에 실패했어요" : "작성에 실패했어요"
      );
    }
  }

  return (
    <>
      <form onSubmit={submitPost} className="mb-100 flex flex-col gap-[30px]">
        <SelectCategory
          setData={setCategory}
          defaultValue={defaultValue?.category}
        />
        <GridField>
          <LabelText form required>
            글 제목
          </LabelText>
          <Input.Text
            placeholder="제목을 입력하세요"
            name="title"
            required
            className="gridContent"
            defaultValue={defaultValue?.contents.title}
          />
        </GridField>
        <GridField>
          <LabelText form required>
            글 내용
          </LabelText>
          <div className="gridContent">
            <TextEditor
              id="post-body"
              className="h-[580px]"
              placeholder="글작성에 유의해주세요. 욕설 비방글은 서비스 정지와 같은 불이익을 받으실 수 있습니다"
              defaultValue={defaultValue?.contents.body}
              onChange={(c: string) => setContent(c)}
            />
          </div>
        </GridField>
        {(category?.value === "study" || category?.value === "project") && (
          <GridField>
            <LabelText form>관련 스터디 링크</LabelText>
            <div className="gridContent">
              <SelectLinkedStudy />
            </div>
          </GridField>
        )}
        <div className="flex gap-gutter-xl items-center justify-center mt-24">
          <LinkButton href="/post" variation="outline" size="form">
            작성 취소
          </LinkButton>
          <Button variation="solid" size="form">
            작성 완료
          </Button>
        </div>
      </form>
    </>
  );
}
