import Image from "next/image";
import ResponsiveMenu from "./ProfileMenu/ResponsiveMenu";
import { DummyProfileImg } from "@public/images";
import { getUserData } from "@/lib/actions/userAction";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { prefetchData } from "@/utils/prefetchData";

export default async function SessionedHeader({ userId }: { userId: string }) {
  const queryClient = new QueryClient();
  let user;

  if (userId) {
    await prefetchData(queryClient, userId, "alert");
    const result = await getUserData(userId);
    user = result.data;
  } else {
    return;
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div data-name="header__right-side__profile">
        <ResponsiveMenu
          userId={userId}
          profileImage={
            <div className="flex items-center justify-center gap-2">
              <span className="my-3 w-10 h-10 overflow-hidden rounded-full">
                <Image
                  src={user?.profile_img || DummyProfileImg}
                  width="40"
                  height="40"
                  alt="profile img"
                  className="object-cover min-w-full h-full"
                />
              </span>
              <span className="lg:hidden">{user?.name}</span>
            </div>
          }
        />
      </div>
    </HydrationBoundary>
  );
}
