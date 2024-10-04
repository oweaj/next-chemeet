import SectionTitle from "@/common/Atoms/Text/SectionTitle";
import Dropdown from "@/common/Molecules/Dropdown";
import LinkButton from "@/common/Atoms/LinkButton";
import PostListWithPagination from "@/common/Templates/PostListWithPagination";
import { WriteIcon } from "@/common/Atoms/Image/Icon";
import { PostDataFull, PostDataListItem } from "@/types/model/PostItem";
import NonePostItem from "../../post/_components/NonePostItem";
import { getSession } from "@/auth";
import connectDB from "@/lib/db";
import { Post } from "@/lib/schema";
import PostList from "@/common/Templates/PostList";
import { notFound } from "next/navigation";
type State =
  | { state: false; message: string }
  | { state: true; data: PostDataListItem[] };
async function getPostsData(userId: string): Promise<State> {
  await connectDB();
  try {
    const posts = await Post.find({ writer: userId })
      .populate("writer", "name email role profile_img position_tag")
      .populate("comments")
      .sort({ createdAt: "desc" });
    if (!posts) {
      return { state: false, message: "해당 게시글을 찾을 수 없습니다." };
    }
    return { state: true, data: posts };
  } catch (error) {
    return { state: false, message: "게시글 정보를 가져오는데 실패했습니다." };
  }
}
export default async function MyPost() {
  const session = await getSession();
  const result = await getPostsData(session?.user.id as string);
  if (!result.state) return notFound();
  const posts: PostDataListItem[] = result.data;
  // console.log("posts", posts);
  return (
    <div className="w-full lg:w-[calc(100vw-240px-30px-2rem)] xl:w-[calc(1200px-280px-30px-2rem)]">
      <SectionTitle size="md" className="mb-6">
        작성한 글
      </SectionTitle>
      <div className="flex flex-row items-start justify-between pb-6">
        <LinkButton href="/post/write" className="self-end ml-auto">
          <WriteIcon />
          <span className="text-body-600">커뮤니티 글 작성하기</span>
        </LinkButton>
      </div>
      {posts.length > 0 ? (
        <div className="flex flex-col gap-0 border-t border-t-line-neutral">
          <PostList posts={posts} />
        </div>
      ) : (
        <NonePostItem />
      )}
    </div>
  );
}
