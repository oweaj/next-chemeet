import SectionTitle from "@/common/Atoms/Text/SectionTitle";
import { getSession } from "@/auth";

export default async function MyStudyPage() {
  const session = await getSession();
  return (
    <div className="flex flex-col gap-100 gridContent">
      <section>
        <SectionTitle size="md" className="mb-6">
          참여 중인 스터디
        </SectionTitle>
        {/* <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-gutter-sm xl:gap-gutter-xl">
          <StudyCardItem card={[]} />
        </ul> */}
        <Empty text="참여 중인 스터디가 없어요. 흥미가 있는 스터디에 지원해보세요!" />
      </section>
      {/* <section>
        <SectionTitle size="md" className="mb-6">
          종료된 스터디
        </SectionTitle>
        <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-gutter-sm xl:gap-gutter-xl">
          <StudyCardItem card={[]} />
        </ul>
      </section> */}
      <section>
        <SectionTitle size="md" className="mb-6">
          내가 만든 스터디
        </SectionTitle>
        {/* <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-gutter-sm xl:gap-gutter-xl">
          <StudyCardItem card={[]} />
        </ul> */}
        <Empty text="내가 만든 스터디가 없어요. 원하는 스터디를 찾을 수 없다면 직접 만들어 보세요!" />
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
