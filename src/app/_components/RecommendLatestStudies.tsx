"use client";

import { getStudy } from "@/lib/actions/studyAction";
import StudyCardList from "../(route)/study/_components/CardList";
import { StudyDataFull } from "@/types/model/StudyCard";
import { useQuery } from "@tanstack/react-query";

export default function RecommendLatestStudies() {
  const { data } = useQuery({
    queryKey: ["study"],
    queryFn: () => getStudy(),
  });

  const studyData: StudyDataFull[] = data?.data.sort(
    (a: { createdAt: string }, b: { createdAt: string }) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <StudyCardList studyCards={studyData} count={8} />;
}
