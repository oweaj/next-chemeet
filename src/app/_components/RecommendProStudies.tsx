import StudyCardList from "../(route)/study/_components/CardList";
import { StudyDataFull } from "@/types/model/StudyCard";
import { cfetch } from "@/utils/customFetch";

export default async function RecommendProStudies() {
  const response = await cfetch("/api/study-matching/favor", {
    next: { tags: ["study"] },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => err);

  const recommend: StudyDataFull[] = response?.data ?? [];

  return <StudyCardList studyCards={recommend} count={8} />;
}
