import SectionTitle from "@/common/Atoms/Text/SectionTitle";
import { getSession } from "@/auth";
import StudyCardItem from "@/common/Organisms/StudyCardItem";
import { getStudy } from "@/lib/actions/studyAction";
import { StudyDataFull } from "@/types/model/StudyCard";

export default async function MyStudyPage() {
  const session = await getSession();
  const userId = session?.user.id;
  if (!userId) {
    return;
  }
  const studyList: StudyDataFull[] = (await getStudy()).data;
  const myStudy = studyList.filter((list) => list.writer._id === userId);

  return (
    <div className="flex flex-col gap-100 gridContent">
      <section>
        <SectionTitle size="md" className="mb-6">
          개설한 스터디
        </SectionTitle>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-sm xl:gap-gutter-xl">
          {myStudy.map((card) => (
            <StudyCardItem key={card.studyId} card={card} />
          ))}
        </ul>
        {!myStudy.length && (
          <Empty text="내가 만든 스터디가 없어요. 원하는 스터디를 찾을 수 없다면 직접 만들어 보세요!" />
        )}
      </section>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-[19rem] border rounded-3xl text-label-dimmed text-center">
      {text}
    </div>
  );
}
