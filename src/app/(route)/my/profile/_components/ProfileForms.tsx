import { getSession } from "@/auth";
import FormEditProfileImageWithPreview from "./EditProfileImage/FormEditProfileImageWithPreview";
import FormEditProfile from "./EditProfile/FormEditProfile";
import SectionTitle from "@/common/Atoms/Text/SectionTitle";
import FormUpdatePassword from "./UpdatePassword/FormUpdatePassword";
import FormUpdatePhoneNumber from "./UpdatePhoneNumber/FormUpdatePhoneNumber";
import DeleteAccountConfirm from "./DeleteAccountConfirm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { prefetchData } from "@/utils/prefetchData";

export default async function ProfileForms() {
  const session = await getSession();
  const userId = session?.user.id as string;
  const sessionProvider = session?.account.provider;
  const queryClient = new QueryClient();

  if (userId) {
    await prefetchData(queryClient, userId, "profile");
  } else {
    return;
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="gridContent grid xl:grid-cols-[5fr_4fr] xl:items-start gap-gutter-xl">
        <div className="flex flex-col gap-8">
          <p className="text-H2 text-label-dimmed">{session?.user.name}</p>
          <FormEditProfileImageWithPreview userId={userId} />
          <div className="w-full h-[1px] border-t border-t-line-normal"></div>
          <FormEditProfile userId={userId} />
          {sessionProvider === "credentials" && (
            <>
              <div className="w-full h-[1px] border-t border-t-line-normal"></div>
              <SectionTitle size="md">비밀번호 변경</SectionTitle>
              <FormUpdatePassword />
              <div className="w-full h-[1px] border-t border-t-line-normal"></div>
              <SectionTitle size="md" className="mb-2">
                연락처 수정
              </SectionTitle>
              <FormUpdatePhoneNumber userId={userId} />
              <div className="w-full h-[1px] border-t border-t-line-normal"></div>
              <DeleteAccountConfirm />
            </>
          )}
        </div>
      </div>
    </HydrationBoundary>
  );
}
