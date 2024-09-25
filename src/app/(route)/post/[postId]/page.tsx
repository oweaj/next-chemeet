import Profile from "@/common/Molecules/Profile";
import ContentArea from "@/common/Organisms/ContentArea";
import { getSession } from "@/auth";
import ReturnToListButton from "../_components/ReturnToListButton";
import LinkedStudyCard from "../_components/LinkedStudyCard";
import CommentArea from "@/common/Templates/CommentArea";
import ShareIconButton from "../../_components/ShareIconButton";
import LikeIconButton from "../../_components/LikeIconButton";
import { PostDataFull, PostDataListItem } from "@/types/model/PostItem";
import { getCreatedBefore } from "@/utils/getCreatedBefore";
import { Post } from "@/lib/schema";
import { notFound } from "next/navigation";
import DeletePostButton from "../../_components/DeletePostButton";
import Link from "next/link";
import { revalidateTag } from "next/cache";
import { NULL_USER_FOR_PROFILE } from "@/constants/null_user";
import { cfetch } from "@/utils/customFetch";

async function increaseViewCount(postId: string) {
  try {
    const update = await Post.findOneAndUpdate(
      { postId },
      { $inc: { view: 1 } },
      { new: true }
    );
    revalidateTag("community");
    return { state: true, data: update };
  } catch (error: any) {
    return { state: false, message: "Fail to update view count" };
  }
}

export default async function PostDetail({
  params: { postId },
}: {
  params: { postId: string };
}) {
  await increaseViewCount(postId);

  // TODO: 로그인한 사용자 정보 상태값으로 대체 필요
  const session = await getSession();

  const postDetail = await cfetch("/api/community/" + postId, {
    next: { tags: ["community", postId] },
  })
    .then((res) => res.json())
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err.message);
      return { state: false };
    });

  if (postDetail.state === false) {
    return notFound();
  }
  const post = postDetail.data as PostDataListItem;

  return (
    <div>
      <ReturnToListButton />
      <article>
        <div className="post-header border-y border-y-line-normal">
          <div>
            <p className="text-label-assist text-body-400 pt-6 pb-2">
              {post.category.label}
            </p>
            <h2 className="text-H2">{post.contents.title}</h2>
          </div>
          <div className="flex gap-6 items-center py-6">
            <Profile user={post.writer ?? NULL_USER_FOR_PROFILE} size="large" />
            <p className="text-label-400 text-label-dimmed flex flex-row gap-8 items-center">
              <span>{getCreatedBefore(post.createdAt)}</span>
              {session?.user.id !== undefined &&
                String(session?.user.id) === String(post.writer?._id) && (
                  <>
                    <Link
                      href={`/post/write/${post.postId}`}
                      className="hover:underline hover:text-main-600"
                    >
                      수정하기
                    </Link>
                    <DeletePostButton postId={postId}>
                      삭제하기
                    </DeletePostButton>
                  </>
                )}
            </p>
            <div className="flex gap-4 items-center ml-auto">
              <ShareIconButton width="32" height="32" />
              <LikeIconButton count={post.like} postId={postId} />
            </div>
          </div>
        </div>
        <div className="px-6">
          <ContentArea html={post.contents.body} />
        </div>
        <LinkedStudyCard studyId={post.contents.linkedStudyId || ""} />
      </article>
      <CommentArea sessionId={session?.user.id || ""} postId={postId} />
    </div>
  );
}
