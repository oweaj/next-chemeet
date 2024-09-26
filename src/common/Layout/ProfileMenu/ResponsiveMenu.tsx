import { ReactNode } from "react";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

export type TProfileImage = { userId?: string; profileImage: ReactNode };

export default async function ResponsiveMenu({
  userId,
  profileImage,
}: TProfileImage) {
  if (!userId) return;
  return (
    <>
      <MobileMenu profileImage={profileImage} />
      <DesktopMenu userId={userId} profileImage={profileImage} />
    </>
  );
}
