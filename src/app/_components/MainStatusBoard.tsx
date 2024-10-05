import SectionTitle from "@/common/Atoms/Text/SectionTitle";
import UserCurrentStudySection from "./UserCurrentStudySection";
import { getSession } from "@/auth";

export default async function MainStatusBoard() {
  const session = await getSession();
  const userId = session?.user.id;
  if (!userId) {
    return null;
  }

  const NOW_DATE = new Intl.DateTimeFormat("ko-KR", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(Date.now());

  return (
    <section>
      <SectionTitle size="md" className="mb-6">
        {session?.user.name}님의{" "}
        <span className="text-main-600">{NOW_DATE}</span> 스터디 현황
      </SectionTitle>
      <UserCurrentStudySection userId={session?.user.id} />
    </section>
  );
}
