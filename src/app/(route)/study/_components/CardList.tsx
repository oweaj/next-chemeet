import { StudyDataFull, StudySchema } from "@/types/model/StudyCard";
import StudyCardItem from "@/common/Organisms/StudyCardItem";

export default function StudyCardList({
  studyCards,
  count,
}: {
  studyCards: StudyDataFull[];
  count?: number;
}) {
  const studyList = count ? studyCards.slice(0, count) : studyCards;

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {studyList.map((card: StudyDataFull) => (
        <StudyCardItem key={card.studyId} card={card} />
      ))}
    </ul>
  );
}
