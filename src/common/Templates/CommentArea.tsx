import ProfileImg from "../Atoms/Image/ProfileImg";
import CommentItem from "../Organisms/Comment/CommentItem";
import CommentInputForm from "../Organisms/Comment/CommentInput";
import { CommentSchema } from "@/types/model/Comment";
import { getUserData } from "@/lib/actions/userAction";
import { TalkBubbleIcon } from "../Atoms/Image/Icon";
import { cfetch } from "@/utils/customFetch";
import { flattenCommentLength } from "@/utils/flattenCommentArray";

type TCommentArea = {
  sessionId: string;
  postId: string;
  titleText?: string;
};
export default async function CommentArea(props: TCommentArea) {
  const { sessionId, postId, titleText = "댓글" } = props;
  const commentResult = await cfetch("api/comments/" + postId, {
    method: "GET",
    next: { tags: ["comments", postId] },
  })
    .then((res) => res.json())
    .then(({ data }) => data)
    .catch(({ error }) => error);
  const userResult = sessionId
    ? await getUserData(sessionId)
    : { state: true, data: undefined };
  let user;
  let comments: CommentSchema[] = [];

  if (userResult.state === true && commentResult.state === true) {
    user = userResult.data;
    comments = commentResult.data ?? [];
  }

  return (
    <section className="flex flex-col gap-8 mt-5 px-10 py-8 rounded-twenty border border-line-normal">
      <p className="flex flex-row items-center gap-1 text-H4">
        <TalkBubbleIcon />
        <span>{titleText}</span>
        <span className="text-main-600">
          {flattenCommentLength(comments) || 0}
        </span>
      </p>
      <div>
        {comments.length === 0 ? (
          <span className="flex items-center justify-center text-H4 text-label-assist bg-alt rounded-twenty h-20">
            {sessionId
              ? "첫번째로 댓글을 남겨보세요!"
              : "로그인한 사용자만 댓글을 남길 수 있어요! 로그인 후 첫번째로 댓글을 남겨보세요!"}
          </span>
        ) : (
          comments.map((c: any) => (
            <CommentItem
              key={c.commentId}
              comment={JSON.parse(JSON.stringify(c))}
              canEdit={String(sessionId) === String(c.writer?._id || null)}
            />
          ))
        )}
      </div>
      {sessionId && (
        <div className="flex flex-row gap-8 items-start w-full">
          <ProfileImg
            size="large"
            src={
              (sessionId && user?.profile_img) ||
              "/images/profile/DummyProfileImg.jpg"
            }
            alt="프로필 이미지"
            className="my-[6px]"
          />
          <CommentInputForm init={false} to="/api/comment" method="POST" />
        </div>
      )}
    </section>
  );
}
