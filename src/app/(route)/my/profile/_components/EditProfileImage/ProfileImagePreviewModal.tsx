import Button from "@/common/Atoms/Form/Button";
import SectionTitle from "@/common/Atoms/Text/SectionTitle";
import ImageInputWithButton from "@/common/Molecules/Form/ImageInputWithButton";
import { ChangeEventHandler, useEffect, useState } from "react";

type PropsToPreviewModal = {
  imageUrl: string;
  getImage: ChangeEventHandler;
  onSave: () => void;
};
export default function ProfileImagePreviewModal(props: PropsToPreviewModal) {
  const { imageUrl, getImage, onSave } = props;
  const [disabled, setDisadled] = useState(true);

  useEffect(() => {
    const handleTime = setTimeout(() => {
      setDisadled(false);
    }, 1500);

    return () => clearTimeout(handleTime);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <SectionTitle size="md">프로필 미리보기</SectionTitle>
      <input
        type="image"
        alt="preview"
        src={imageUrl}
        className="w-20 h-20 rounded-full my-4 object-cover"
      />
      <p className="text-label-400 text-label-alt">
        *권장 이미지 - 확장자: png, jpg, jpeg / 용량: 1MB 이하 권장
      </p>
      <div className="flex items-center justify-start gap-4">
        <ImageInputWithButton
          buttonProps={{
            variation: "outline",
            color: "main",
          }}
          onChange={getImage}
        >
          다시 선택
        </ImageInputWithButton>
        <Button variation="solid" disabled={disabled} onClick={onSave}>
          저장
        </Button>
      </div>
    </div>
  );
}
