"use client";

import likePostStore from "@/store/likePostStore";
import handleAlert from "@/common/Molecules/handleAlert";
import Button from "@/common/Atoms/Form/Button";
import { LikeThumbIcon } from "@/common/Atoms/Image/Icon";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { ONE_SEC_IN_MS } from "@/constants/times_unit";
import clsx from "clsx";
import { useSession } from "next-auth/react";

type LikeIconButtonProps = {
  count: number;
  postId: string;
};
export default function LikeIconButton(props: LikeIconButtonProps) {
  const { count, postId } = props;
  const { data: session } = useSession();
  const sessionId = session?.user.id;
  const likedCount = count < 0 ? 0 : count;

  const {
    liked: likedPost,
    fetchUsersLiked: fetchLiked,
    fetchLikeToggle,
    addLiked,
    delLiked,
  } = likePostStore();
  const liked = likedPost.includes(postId);
  const [init, setInit] = useState<boolean>(false);
  const checkLiked = async () => {
    await fetchLiked();
    setInit(likedPost.includes(postId));
  };

  useEffect(() => {
    checkLiked();
  }, []);

  useEffect(() => {
    console.log("liked??", liked);
  }, [liked]);

  async function toggleLike() {
    if (liked) {
      delLiked(postId);
    } else {
      addLiked(postId);
    }

    // 추후 throttle 처리 필요?
    const result = await fetchLikeToggle(postId);
    if (result?.state) {
      handleAlert("success", result.message);
    } else {
      handleAlert("error", result?.message || "Error: 좋아요에 실패했습니다.");
    }
  }

  const { x } = useSpring({
    from: { x: 0 },
    x: liked ? 1 : 0,
    config: { duration: ONE_SEC_IN_MS },
  });

  // init과 liked 데이터가 다를 때
  // 화면에 보이는 liked count 값에 차이가 발생하는 정도
  const diff: number =
    init === false && liked === true
      ? 1
      : init === true && liked === false
      ? -1
      : 0;
  return (
    <div className="flex gap-2 items-center">
      <Button.Icon
        className="[&:hover_path]:stroke-main-600"
        disabled={sessionId ? false : true}
        onClick={toggleLike}
      >
        <animated.div
          style={{
            opacity: x.to({ range: [0, 1], output: [0.3, 1] }),
            scale: x.to({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
            }),
          }}
        >
          <LikeThumbIcon active={liked} />
        </animated.div>
      </Button.Icon>
      <span
        className={clsx("text-H4", [liked ? "text-main-600" : "opacity-30"])}
      >
        {likedCount + diff}
      </span>
    </div>
  );
}
