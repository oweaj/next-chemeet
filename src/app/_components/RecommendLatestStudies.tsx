import StudyCardList from "../(route)/study/_components/CardList";
import { StudyDataFull } from "@/types/model/StudyCard";
import { cfetch } from "@/utils/customFetch";

export default async function RecommendLatestStudies() {
  const response = await cfetch("/api/study-matching/latest", {
    next: { tags: ["study"] },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => err);

  const latest: StudyDataFull[] = response?.data ?? [];

  return <StudyCardList studyCards={latest} count={8} />;
}
