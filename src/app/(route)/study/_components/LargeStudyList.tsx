"use client";

import { StudyDataFull } from "@/types/model/StudyCard";
import LargeStudyItem from "./LargeStudyItem";
import { useQuery } from "@tanstack/react-query";
import { getStudy } from "@/lib/actions/studyAction";

export default function LargeStudyList() {
  const { data } = useQuery({
    queryKey: ["study"],
    queryFn: () => getStudy(),
  });

  const studyList = (data?.data).slice(0, 3);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {studyList.map((card: StudyDataFull) => (
        <LargeStudyItem key={card.studyId} card={card} />
      ))}
    </div>
  );
}
