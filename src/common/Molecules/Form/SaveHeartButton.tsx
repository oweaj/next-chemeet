"use client";

import { DetailFullHeartIcon, DetailHeartIcon } from "@public/icons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SaveHeartButton({ heart }: { heart: number }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [saveHeart, setSaveHeart] = useState<boolean>(false);

  function clickHeartHandler() {
    if (session?.user.id) {
      setSaveHeart(!saveHeart);
    } else {
      router.replace("/login");
    }
  }

  return (
    <>
      <button className="w-9 h-9">
        <Image
          width={36}
          height={36}
          src={saveHeart ? DetailFullHeartIcon : DetailHeartIcon}
          onClick={() => clickHeartHandler()}
          alt="좋아요 버튼"
        />
      </button>
      <span className="text-label-neutral font-semibold">{heart}</span>
    </>
  );
}
