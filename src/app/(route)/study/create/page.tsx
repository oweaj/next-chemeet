import SectionTitle from "@/common/Atoms/Text/SectionTitle";
import StudyForm from "./_components/StudyForm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSession } from "@/auth";
import { getStudy } from "@/lib/actions/studyAction";

export default async function page() {
  const queryClient = new QueryClient();
  const session = await getSession();
  const userId = session?.user.id;

  if (userId) {
    await queryClient.prefetchQuery({
      queryKey: ["study", userId],
      queryFn: () => getStudy(userId),
    });
  } else {
    return;
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SectionTitle size="lg" className="pb-6 border-b border-black">
        스터디 개설하기
      </SectionTitle>
      <div className="pt-14 mb-8">
        <SectionTitle size="md">개설자의 역량을 펼쳐주세요</SectionTitle>
        <span className="text-sm text-label-dimmed">
          당신이 가진 직무 역량과 팁을 공유해주세요
        </span>
      </div>
      <StudyForm />
    </HydrationBoundary>
  );
}
