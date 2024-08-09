import StudyCardList from "@/common/Templates/CardList";
import { filterStudies, getAllStudies } from "@/lib/actions/studyAction";
import { getUserData } from "@/lib/actions/userAction";

async function getFavorStudies(userId: string) {
  // 1. profile에서 관심 카테고리 가져오기
  // 2. 관심카테고리로 필터링하여 스터디 리스트 가져오기

  const profile = await getUserData(userId);

  if (profile.state === false) {
    const result = await getAllStudies();
    return result;
  }

  const result = await filterStudies(profile.data.my_category);

  return result;
}

export default async function RecommendProStudies({
  userId,
}: {
  userId: string;
}) {
  const result = await getFavorStudies(userId);

  if (result.state === false) {
    throw new Error("관심 카테고리의 스터디 정보 가져오기 실패");
  }

  const recommend = result.data;

  return <StudyCardList studyCards={recommend} count={8} />;
}
