"use client";

import SectionTitle from "@/common/Atoms/Text/SectionTitle";
import LeaderProfile from "./LeaderProfile";
import AccordionComponent from "../../_components/AccordionComponent";
import ContentArea from "@/common/Organisms/ContentArea";
import { ProfileSchema } from "@/types/model/User";
import { useQuery } from "@tanstack/react-query";
import { getStudy } from "@/lib/actions/studyAction";
import { StudySchema } from "@/types/model/StudyCard";

export type TContents = {
  content: string;
  rules: string[];
  curriculums: string[];
};

export default function StudyDetailContent({
  studyPostId,
}: {
  studyPostId: string;
}) {
  const { data } = useQuery({
    queryKey: ["study", studyPostId],
    queryFn: () => getStudy(studyPostId),
  });

  const studyData: StudySchema = data?.data;

  return (
    <div className="my-20 border-t border-b">
      <div className="pt-16">
        <div>
          <SectionTitle size="md" className="pb-6 text-2xl font-semibold">
            스터디장
          </SectionTitle>
          <LeaderProfile writer={studyData.writer} />
        </div>
        <div className="py-16 border-b">
          <SectionTitle size="md" className="text-2xl font-semibold">
            스터디 소개
          </SectionTitle>
          <div className="w-full px-2 mt-6 leading-6 font-normal text-base border rounded-lg">
            <ContentArea html={studyData.contents.content} />
          </div>
        </div>
      </div>
      <AccordionComponent title="규칙" lists={studyData.contents.rules} />
      <AccordionComponent
        title="세부 커리큘럼"
        lists={studyData.contents.curriculums}
      />
    </div>
  );
}
