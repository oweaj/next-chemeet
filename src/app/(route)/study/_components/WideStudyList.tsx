"use client";

import WideStudyItem from "./WideStudyItem";
import { StudyDataFull } from "@/types/model/StudyCard";
import { useQuery } from "@tanstack/react-query";
import { getStudy } from "@/lib/actions/studyAction";

export default function WideStudyList() {
  const { data } = useQuery({
    queryKey: ["study"],
    queryFn: () => getStudy(),
  });

  const studyList = (data?.data).slice(0, 2);

  return (
    <div className="grid grid-cols-2 gap-6">
      {studyList.map((card: StudyDataFull) => (
        <WideStudyItem key={card.studyId} card={card} />
      ))}
    </div>
  );
}
