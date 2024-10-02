"use client";

import { StudyDataFull } from "@/types/model/StudyCard";
import StudyCardItem from "@/common/Organisms/StudyCardItem";
import { useQuery } from "@tanstack/react-query";
import { getStudy } from "@/lib/actions/studyAction";

export default function StudyCardList({
  studyCards,
}: {
  studyCards?: StudyDataFull[];
}) {
  const { data } = useQuery({
    queryKey: ["study"],
    queryFn: () => getStudy(),
  });

  const studyList = studyCards || data?.data || [];

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {studyList.map((card: StudyDataFull) => (
        <StudyCardItem key={card.studyId} card={card} />
      ))}
    </ul>
  );
}
