"use client";

import GridField from "@/common/Atoms/Form/Field";
import { LabelText } from "@/common/Atoms/Form/Label";
import { AdditionIcon } from "@/common/Atoms/Image/Icon";
import handleAlert from "@/common/Molecules/handleAlert";
import {
  supabaseDeleteImage,
  supabaseUploadImage,
} from "@/lib/actions/profileAction";
import { resizeFile } from "@/utils/resizeFile";
import { DefaultThumbnailImg } from "@public/images";
import Image from "next/image";
import { ChangeEvent, useRef } from "react";

export default function ThumbnailInput({
  imageUrl,
  setImageUrl,
  defaultValue,
}: {
  imageUrl: string | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  defaultValue?: string | null;
}) {
  const fileInput = useRef<HTMLInputElement>(null);

  async function getImage(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);

      const resizeImage = await resizeFile(file);
      const formData = new FormData();
      formData.append("file", resizeImage);

      const upload = await supabaseUploadImage("study", formData);
      if (upload.state && upload.result) {
        setImageUrl(upload.result || "");
      } else {
        handleAlert("error", upload.message);
      }
    } else {
      setImageUrl(null);
    }
  }

  async function thumbnailDelete() {
    setImageUrl(null);
    supabaseDeleteImage("study", imageUrl);
  }

  function onClickImageButton() {
    fileInput.current?.click();
  }

  return (
    <GridField>
      <LabelText form>썸네일 이미지</LabelText>
      <div className="flex flex-col">
        <div className="flex items-start gap-8">
          <div>
            {defaultValue ? (
              <div className="relative">
                <Image
                  width={280}
                  height={180}
                  className="w-[280px] h-[180px] rounded-ten object-cover"
                  src={imageUrl || DefaultThumbnailImg}
                  alt="썸네일 이미지"
                />
                {!imageUrl && (
                  <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex items-center flex-col gap-2 text-white">
                    <AdditionIcon color="#fff" />
                    <span>이미지 불러오기</span>
                  </div>
                )}
                <input
                  type="file"
                  name="thumbnailUrl"
                  accept="image/*"
                  ref={fileInput}
                  onChange={(e) => getImage(e)}
                  hidden
                />
                <button
                  type="button"
                  onClick={onClickImageButton}
                  className="absolute top-0 left-0 flex items-center justify-center flex-col gap-2 w-[280px] h-[180px] border rounded-ten border-[#e2e2e4] cursor-pointer"
                ></button>
              </div>
            ) : (
              <div className="relative">
                <Image
                  width={280}
                  height={180}
                  className="w-[280px] h-[180px] rounded-ten object-cover"
                  src={imageUrl || DefaultThumbnailImg}
                  alt="썸네일 이미지"
                />
                <input
                  type="file"
                  name="thumbnailUrl"
                  accept="image/*"
                  ref={fileInput}
                  onChange={(e) => getImage(e)}
                  hidden
                />
                {!imageUrl && (
                  <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex items-center flex-col gap-2 text-white">
                    <AdditionIcon color="#fff" />
                    <span>이미지 불러오기</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={onClickImageButton}
                  className="absolute top-0 left-0 flex items-center justify-center flex-col gap-2 w-[280px] h-[180px] border rounded-ten border-[#e2e2e4] cursor-pointer"
                ></button>
              </div>
            )}
          </div>
        </div>
        {(defaultValue || imageUrl) && (
          <button
            type="button"
            className="w-full mt-2 text-sm font-medium border py-2 rounded-lg text-label-dimmed hover:bg-gray-100 hover:text-gray-600"
            onClick={() => thumbnailDelete()}
          >
            이미지 제거
          </button>
        )}
      </div>
    </GridField>
  );
}
