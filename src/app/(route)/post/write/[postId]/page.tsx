import { getSession } from "@/auth";
import { getCommunity } from "@/lib/actions/communityAction";
import { notFound, redirect } from "next/navigation";
import PostForm from "../_components/PostForm";

export default async function page({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const session = await getSession();
  const result = await getCommunity(postId);

  if (!session) {
    redirect("/login");
  }

  if (
    result.state === false ||
    String(session.user.id) !== String(result.data.writer._id)
  ) {
    return notFound();
  }

  return (
    <>
      <PostForm
        defaultValue={JSON.parse(JSON.stringify(result.data, null, 2))}
      />
    </>
  );
}
