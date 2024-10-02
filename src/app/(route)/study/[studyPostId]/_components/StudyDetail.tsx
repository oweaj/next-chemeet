import StudyDetailThumbnail from "./StudyDetailThumbnail";
import StudyDetailContent from "./StudyDetailContent";
import CommentArea from "@/common/Templates/CommentArea";
import { getSession } from "@/auth";

export default async function StudyDetail({
  studyPostId,
}: {
  studyPostId: string;
}) {
  const session = await getSession();

  return (
    <div>
      <StudyDetailThumbnail studyPostId={studyPostId} />
      <StudyDetailContent studyPostId={studyPostId} />
      <CommentArea postId={studyPostId} sessionId={session?.user.id || ""} />
    </div>
  );
}
