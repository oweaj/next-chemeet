import { ReactNode } from "react";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { getSession } from "@/auth";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAlert } from "@/lib/actions/AlertAction";

export type TProfileImage = { profileImage: ReactNode };

export default async function ResponsiveMenu(props: TProfileImage) {
  const session = await getSession();
  const userId = session?.user.id;
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  if (!userId) {
    return;
  }

  await queryClient.prefetchQuery({
    queryKey: ["alert", userId],
    queryFn: ({ queryKey }) => getAlert(queryKey[1]),
  });

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <MobileMenu {...props} />
        <DesktopMenu {...props} />
      </HydrationBoundary>
    </>
  );
}
