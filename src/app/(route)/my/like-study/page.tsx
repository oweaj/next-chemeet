import Link from "next/link";
import NoneContentItemBase from "@/app/_components/NoneContentItemBase";
import SectionTitle from "@/common/Atoms/Text/SectionTitle";
import StudyCardItem from "@/common/Organisms/StudyCardItem";
import { StudyDataFull } from "@/types/model/StudyCard";
// import { getStudyCards } from "@/dummies/studies";
import connectDB from "@/lib/db";
import { StudyLike } from "@/lib/schema";
import { getSession } from "@/auth";

// type State =
//   | { state: false; message: string }
//   | { state: true; data: StudySchema[] };
//
// async function getLikeStudies(userId: string): Promise<State> {
//   await connectDB();
//
//   try {
//     const likedPosts = await StudyLike.find({ userId }).populate({
//       path: "postId",
//       populate: {
//         path: "writer",
//         select: "name role profile_img position_tag",
//       },
//     });
//     if (!likedPosts) {
//       return { state: false, message: "찜한 스터디를 찾을 수 없습니다." };
//     }
//     // console.log("likedPosts", likedPosts);
//     return { state: true, data: [] };
//   } catch (error) {
//     return {
//       state: false,
//       message: "찜한 스터디 정보를 가져오는데 실패했습니다.",
//     };
//   }
// }

export default async function MyStudyLiked() {
  // const session = await getSession();
  // const result = await getLikeStudies(session?.user.id as string);
  const likedStudies: StudyDataFull[] = [];

  return (
    <div className="gridContent">
      <SectionTitle size="md" className="mb-6">
        찜한 스터디
      </SectionTitle>
      <div>
        {likedStudies.length === 0 ? (
          <NoneContentItemBase>
            <p className="text-main-500 font-semibold">
              찜한 스터디가 없습니다.
              <br />첫 스터디를 찜해보세요!
            </p>
            <Link
              href={"/study"}
              className="block py-3 px-4 bg-main-500 text-white font-semibold rounded-2xl"
            >
              스터디 구경가기
            </Link>
          </NoneContentItemBase>
        ) : (
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-gutter-sm xl:gap-gutter-xl">
            {likedStudies.map((card) => (
              <StudyCardItem key={card.studyId} card={card} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
