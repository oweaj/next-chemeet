"use client";

import { useSession } from "next-auth/react";
import DeleteButton from "./DeleteButton";
import RetouchButton from "./RetouchButton";
import { StudyDataFull } from "@/types/model/StudyCard";
import { useQuery } from "@tanstack/react-query";
import { getStudy } from "@/lib/actions/studyAction";

export default function ControlButton({
  studyPostId,
}: {
  studyPostId: string;
}) {
  const { data: session } = useSession();

  const { data } = useQuery({
    queryKey: ["study", studyPostId],
    queryFn: () => getStudy(studyPostId),
  });

  const studyData: StudyDataFull = data?.data;

  if (session?.user.id === studyData.writer._id) {
    return (
      <div className="flex gap-5 text-slate-600">
        <RetouchButton studyId={studyData.studyId} />
        <DeleteButton studyId={studyData.studyId} />
      </div>
    );
  }
}
