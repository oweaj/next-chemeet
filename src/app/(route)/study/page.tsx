import SectionTitle from "@/common/Atoms/Text/SectionTitle";
import StudyCardList from "./_components/CardList";
import LargeStudyList from "./_components/LargeStudyList";
import WideStudyList from "./_components/WideStudyList";
import { GOALS } from "@/constants/categories/study_goal";
import { ONOFF } from "@/constants/categories/study_type";
import StudyCategoryTabButtonList from "./_components/StudyCategoryTabButtonList";
import SearchInput from "../_components/SearchInput";
import StudyCategorySelectBox from "./_components/StudyCategorySelectBox";
import {
  categoryIconsName,
  onOffIconsName,
} from "@/app/_components/CategoryTab/TabIcons";
import { getSession } from "@/auth";
import { getStudy } from "@/lib/actions/studyAction";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export type TQuery = {
  job_c?: string;
  category?: string;
  page?: string;
  sort?: string;
};

export default async function StudyComponent({
  searchParams,
}: {
  searchParams: TQuery;
}) {
  const session = await getSession();
  const queryClient = new QueryClient();
  const result = await getStudy();
  let studyCard;

  if (result.state) {
    studyCard = result.data;
  } else {
    studyCard = [];
  }

  await queryClient.prefetchQuery({
    queryKey: ["study"],
    queryFn: () => getStudy(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex items-center justify-between pb-9">
        <SectionTitle size="lg">스터디</SectionTitle>
        <SearchInput />
      </div>
      <div>
        <StudyCategorySelectBox searchParams={searchParams} />
        <div className="flex justify-between text-[#C2C3C4]">
          <StudyCategoryTabButtonList
            queryKey="c"
            categoryName={GOALS}
            categoryIcons={categoryIconsName}
          />
          <StudyCategoryTabButtonList
            queryKey="l"
            categoryName={ONOFF}
            categoryIcons={onOffIconsName}
          />
        </div>
      </div>
      <div className="flex gap-[6.25rem] flex-col">
        <div>
          {session?.user.name && (
            <SectionTitle size="md" className="pb-6">
              {session?.user.name}님이 찾던 케미 좋은 프로 스터디
            </SectionTitle>
          )}
          <div className="flex flex-col gap-6">
            <WideStudyList />
          </div>
        </div>
        <div>
          <SectionTitle size="md" className="pb-6">
            오늘의 프로 스터디를 통해 빠른 성장을 경험해 보세요!
          </SectionTitle>
          <StudyCardList studyCards={studyCard} count={4} />
        </div>
        <div>
          <SectionTitle size="md" className="pb-6">
            프로없이, 우리끼리도 스터디해요
          </SectionTitle>
          <StudyCardList studyCards={studyCard} count={4} />
        </div>
        <div>
          <SectionTitle size="md" className="pb-6">
            케밋에서 인기있는 프로의 스터디
          </SectionTitle>
          <LargeStudyList />
        </div>
      </div>
    </HydrationBoundary>
  );
}
