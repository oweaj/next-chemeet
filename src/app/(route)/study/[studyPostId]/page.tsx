import BackButton from "../../_components/BackButton";
import StudyDetail from "./_components/StudyDetail";
import { StudyDataFull } from "@/types/model/StudyCard";
import { Study } from "@/lib/schema";
import { revalidateTag } from "next/cache";
import { cfetch } from "@/utils/customFetch";
import { notFound } from "next/navigation";
import ControlButton from "./_components/ControlButton";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getStudy } from "@/lib/actions/studyAction";

async function increaseViewCount(studyId: string) {
  try {
    const update = await Study.findOneAndUpdate(
      { studyId },
      { $inc: { view: 1 } },
      { new: true }
    );
    revalidateTag("study");
    return { state: true, data: update };
  } catch (error: any) {
    return { state: false, message: "Fail to update view count" };
  }
}

export default async function StudyDetailPage({
  params: { studyPostId },
}: {
  params: { studyPostId: string };
}) {
  // studyDetail api
  await increaseViewCount(studyPostId);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["study", studyPostId],
    queryFn: () => getStudy(studyPostId),
  });

  const studyDetail = await cfetch(`api/study/${studyPostId}`, {
    next: { tags: ["study", studyPostId] },
  })
    .then((res) => res.json())
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err.message);
      return { state: false };
    });

  if (studyDetail.state === false) return notFound();

  const study = studyDetail.data as StudyDataFull;

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex justify-between items-start">
        <BackButton />
        <ControlButton study={study} />
      </div>
      <StudyDetail studyPostId={studyPostId} />
    </HydrationBoundary>
  );
}
