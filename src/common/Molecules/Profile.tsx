import Image from "next/image";
import ProfileImg from "../Atoms/Image/ProfileImg";
import { BadgeIcon } from "@public/icons";
import clsx from "clsx";

// Profile에 user 데이터 전달 시 형식에 맞게 필요한 값만 plain object로 전달
export type TProfileUser = {
  profile_img: string;
  name: string;
  position_tag: string;
  role: string;
};

export default function Profile({
  user,
  size,
}: {
  user: TProfileUser;
  size: "default" | "large" | "small";
}) {
  const gap = {
    default: "gap-4",
    large: "gap-6",
    small: "gap-2",
  };
  const style = {
    default: "text-H4 text-label-normal",
    large: "text-H4 text-label-normal",
    small: "text-label-600 text-label-dimmed",
  };

  const src = user.profile_img || "/images/profile/DummyProfileImg.jpg";

  return (
    <div className={clsx("flex flex-row flex-nowrap items-center", gap[size])}>
      <ProfileImg size={size} src={src} alt={`${user.name} 프로필 이미지`} />
      <span className={style[size]}>
        {user.position_tag ? `${user.position_tag} ` : null}
        {user.name}
      </span>
      {user.role === "pro" && <Image src={BadgeIcon} alt="pro" />}
    </div>
  );
}
