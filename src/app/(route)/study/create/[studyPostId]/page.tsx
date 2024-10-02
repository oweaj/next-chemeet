import { getStudy } from "@/lib/actions/studyAction";
import StudyForm from "../_components/StudyForm";
import SectionTitle from "@/common/Atoms/Text/SectionTitle";
import { StudySchema } from "@/types/model/StudyCard";

export default async function Page({
  params: { studyPostId },
}: {
  params: { studyPostId: string };
}) {
  const result = await getStudy(studyPostId);

  const defaultValue: StudySchema = result.data;

  console.log(result);

  return (
    <>
      <SectionTitle size="lg" className="pb-6 border-b border-black">
        스터디 개설 수정하기
      </SectionTitle>
      <div className="pt-14 mb-8">
        <SectionTitle size="md">개설자의 역량을 펼쳐주세요</SectionTitle>
        <span className="text-sm text-label-dimmed">
          당신이 가진 직무 역량과 팁을 공유해주세요
        </span>
      </div>
      <StudyForm defaultValue={defaultValue} />
    </>
  );
}
