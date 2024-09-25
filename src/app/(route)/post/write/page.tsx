import { getSession } from "@/auth";
import PostForm from "./_components/PostForm";
import { redirect } from "next/navigation";

export default async function PostWrite() {
  const session = await getSession();

  if (!session) {
    return redirect("/login");
  }

  return (
    <>
      <PostForm />
    </>
  );
}
