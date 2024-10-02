"use client";

import SectionTitle from "@/common/Atoms/Text/SectionTitle";
import { getStudy } from "@/lib/actions/studyAction";
import { StudyDataFull } from "@/types/model/StudyCard";
import { includesSearchQuery } from "@/utils/includesSearchQuery";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import StudyCardList from "./CardList";
import { useMemo } from "react";

export default function StudyCardFilter() {
  const { data } = useQuery({
    queryKey: ["study"],
    queryFn: () => getStudy(),
  });

  const studyList = data?.data;
  const params = useSearchParams();
  const jobKey = params.get("job_c");
  const targetKey = params.get("c");
  const locationKey = params.get("l");
  const queryKey = params.get("q");

  const filteredStudyCards = useMemo(
    () =>
      (studyList ?? []).filter(
        (card: StudyDataFull) =>
          (!jobKey || card.studyInfo.jobCategory.value === jobKey) &&
          (!targetKey || card.studyInfo.targetCategory.value === targetKey) &&
          (!locationKey || card.studyInfo.location.value === locationKey) &&
          (!queryKey || includesSearchQuery(card.studyInfo.title, queryKey))
      ),
    [studyList, jobKey, targetKey, locationKey, queryKey]
  );

  return (
    <>
      <div className="flex justify-between items-end pb-6">
        <SectionTitle size="md">
          전체 검색 결과 {filteredStudyCards.length}개
        </SectionTitle>
      </div>
      <StudyCardList studyCards={filteredStudyCards} />
    </>
  );
}
