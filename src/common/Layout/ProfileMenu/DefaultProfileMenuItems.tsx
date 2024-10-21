import {
  LogoutIcon,
  PostIcon,
  SaveHeartIcon,
  SettingProfileIcon,
  StudyIcon,
} from "@public/icons";
import Image from "next/image";
import Link from "next/link";
import UnstyledLogoutButton from "../UnstyledLogoutButton";
import { ReactNode } from "react";

export default function DefaultProfileMenuItems() {
  return (
    <>
      <ProfileMenuItemLink
        icon={
          <Image
            src={SettingProfileIcon}
            alt="내 프로필"
            width={24}
            height={24}
          />
        }
        label="내 프로필"
        href="/my/profile"
      />
      <ProfileMenuItemLink
        icon={<Image src={StudyIcon} alt="내 스터디" loading="eager" />}
        label="개설한 스터디"
        href="/my/study"
      />
      <ProfileMenuItemLink
        icon={<Image src={PostIcon} alt="내가 쓴 글" loading="eager" />}
        label="작성한 글"
        href="/my/post"
      />
      <ProfileMenuItemLink
        icon={<Image src={SaveHeartIcon} alt="찜 스터디" loading="eager" />}
        label="찜 스터디"
        href="/my/like-study"
      />
      <div className="w-full h-0 border-t my-2 p-0"></div>
      <UnstyledLogoutButton className="w-full">
        <ProfileMenuItemLink
          icon={<Image src={LogoutIcon} alt="로그아웃" loading="eager" />}
          label="로그아웃"
        />
      </UnstyledLogoutButton>
    </>
  );
}

function ProfileMenuItemLink({
  icon,
  label,
  href,
}: {
  icon: ReactNode;
  label: string;
  href?: string;
}) {
  return href ? (
    <li className="hover:bg-backdrop/10 rounded-lg w-full">
      <Link href={href} className="flex gap-3 items-center">
        <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
        <span className="text-label-400 text-label-neutral">{label}</span>
      </Link>
    </li>
  ) : (
    <li className="hover:bg-backdrop/10 rounded-lg w-full flex gap-3 items-center">
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
      <span className="text-label-400 text-label-neutral">{label}</span>
    </li>
  );
}
