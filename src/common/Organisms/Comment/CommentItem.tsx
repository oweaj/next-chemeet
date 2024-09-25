"use client";

import Profile from "@/common/Molecules/Profile";
import { CommentSchema } from "@/types/model/Comment";
import { CommentBodyLayout } from "./CommentBodyLayout";

export default function CommentItem({
  comment,
  canEdit,
}: {
  comment: CommentSchema;
  canEdit: boolean;
}) {
  return (
    <div className="flex flex-col gap-5 border-t py-6 border-t-line-normal">
      <Profile
        size="default"
        user={{
          profile_img: comment.writer.profile_img,
          name: comment.writer.name,
          position_tag: comment.writer.position_tag,
          role: comment.writer.role,
        }}
      />
      <div className="flex flex-col gap-5 pl-14">
        <CommentBodyLayout
          comment={comment}
          canEdit={canEdit}
          commentId={comment.commentId}
        />
        {comment?.reply &&
          comment.reply.length > 0 &&
          comment.reply.map((reply) => (
            <div className="flex flex-col gap-5 pt-6" key={reply.replyId}>
              <Profile
                size="default"
                user={{
                  profile_img: reply.writer.profile_img,
                  name: reply.writer.name,
                  role: reply.writer.role,
                  position_tag: reply.writer.position_tag,
                }}
              />
              <div className="flex flex-col gap-5 pl-14">
                <CommentBodyLayout
                  comment={reply}
                  commentId={comment.commentId}
                  canReply={false}
                  canEdit={canEdit}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
