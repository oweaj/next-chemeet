"use client";

import usePopover from "@/hooks/usePopover";
import { MenuIcon } from "../../Atoms/Image/Icon";
import { TProfileImage } from "./ResponsiveMenu";
import Link from "next/link";
import Image from "next/image";
import { AlarmIcon, CreateStudyIcon } from "@public/icons";
import DefaultProfileMenuItems from "./DefaultProfileMenuItems";
import { useEffect } from "react";

export default function MobileMenu({ profileImage }: TProfileImage) {
  const { Popup, open, close } = usePopover({
    key: "mobile-menu",
    children: (
      <div className="flex items-center justify-center">
        <div>
          {profileImage}
          <Link
            href={"/study/create"}
            className="flex items-center justify-center gap-2 w-36 py-2 leading-8 text-main-600 border border-solid border-main-600 rounded-[1.3rem]"
          >
            <Image src={CreateStudyIcon} alt="create study" />
            <span className="text-label-400">스터디 만들기</span>
          </Link>
          <ul className="w-full p-1 pt-2 [&_li]:py-[6px] [&_li]:px-3">
            <DefaultProfileMenuItems />
          </ul>
        </div>
      </div>
    ),
  });

  useEffect(() => {
    return () => {
      close();
    };
  }, []);

  return (
    <div className="lg:hidden lg:[&>*]:invisible">
      <button onClick={open}>
        <MenuIcon />
      </button>
      {Popup}
    </div>
  );
}
