"use client";

import Image from "next/image";
import Keyword from "@/common/Atoms/Text/Keyword";
import ThumbnailInfoList from "./ThumbnailInfoLabel";
import Link from "next/link";
import ShareIconButton from "@/app/(route)/_components/ShareIconButton";
import dayjs from "dayjs";
import SaveHeartButton from "@/common/Molecules/Form/SaveHeartButton";
import { DefaultThumbnailImg } from "@public/images";
import ApplyButton from "./ApplyButton";
import { useQuery } from "@tanstack/react-query";
import { getStudy } from "@/lib/actions/studyAction";
import { StudySchema } from "@/types/model/StudyCard";

export type TThumbnailInfo = {
  studyId: string;
  expense: number;
  jobCategory: { label: string; value: string };
  location: { label: string; value: string };
  place: string | null;
  recruitmentPeople: number;
  recruitmentPeriod: [string, string];
  studyPeriod: [string, string];
  targetCategory: { label: string; value: string };
  thumbnailUrl: string | null;
  writer: string;
  title: string;
};

export default function StudyDetailThumbnail({
  studyPostId,
}: {
  studyPostId: string;
}) {
  const { data } = useQuery({
    queryKey: ["study", studyPostId],
    queryFn: () => getStudy(studyPostId),
  });

  const studyData: StudySchema = data?.data;

  const nowDay = dayjs(new Date()).format("YYYY.MM.DD");
  const recruitmentDay = dayjs(studyData.studyInfo.recruitmentPeriod[1]);
  const resultDay = dayjs(nowDay).diff(recruitmentDay, "days");

  return (
    <div className="w-full flex justify-between max-lg:flex-col max-lg:gap-8">
      <div className="relative flex-1">
        <Image
          width={500}
          height={400}
          className="w-[31rem] h-[25rem] rounded-3xl object-cover"
          src={studyData.studyInfo.thumbnailUrl || DefaultThumbnailImg}
          alt="썸네일 이미지"
        />
        <div className="flex gap-1 absolute left-0 top-6">
          <Keyword
            bg={`${resultDay < 0 ? "bg-status-danger" : "bg-slate-700"}`}
            text="text-white"
            className="rounded-l-none "
          >
            {resultDay < 0 ? "모집중" : "모집마감"}
          </Keyword>
          <Keyword bg="bg-status-danger" text="text-white">
            {dayjs(recruitmentDay).format("MM/DD")} 마감
          </Keyword>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-5">
        <span className="block text-[#888] text-xl">
          {studyData.studyInfo.jobCategory.label}
        </span>
        <p className="text-H2">{studyData.studyInfo.title}</p>
        <div className="flex gap-8">
          <ThumbnailInfoList />
          <ul className="flex flex-col gap-4 text-xl">
            <li>{studyData.studyInfo.targetCategory.label}</li>
            <li>{studyData.studyInfo.recruitmentPeople}명</li>
            <li>{studyData.studyInfo.expense.toLocaleString("ko-KR")}원</li>
            <li>
              {studyData.studyInfo.studyPeriod[0]} ~{" "}
              {studyData.studyInfo.studyPeriod[1]}
            </li>
            <li>{studyData.studyInfo.location.label}</li>
          </ul>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href={"/studyroom/:studyroomId"}
            className="w-full max-w-[12.5rem] h-16 border rounded-ten border-main-700 text-main-700 text-center leading-[62px] font-semibold text-base"
          >
            스터디룸 살펴보기
          </Link>
          <ApplyButton resultDay={resultDay} />
          <div className="flex items-center gap-3">
            <ShareIconButton />
            <SaveHeartButton heart={studyData.heartCount} />
          </div>
        </div>
      </div>
    </div>
  );
}
