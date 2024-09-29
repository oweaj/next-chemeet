import SetCategoryFavor from "@/app/_components/SetCategoryFavor";
import { getSession } from "@/auth";
import NotFound from "../not-found";

export default async function SetMyCategory() {
  const session = await getSession();

  if (!session) {
    return <NotFound />;
  }

  return (
    <div className="rounded-[1.25rem] p-[3.5rem] h-screen w-screen flex items-center justify-center overflow-hidden">
      <SetCategoryFavor userId={session.user.id} />
    </div>
  );
}
