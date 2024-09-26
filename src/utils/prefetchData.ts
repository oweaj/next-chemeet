import { getAlert } from "@/lib/actions/AlertAction";
import { getUserData } from "@/lib/actions/userAction";
import { TAlert } from "@/types/model/Alert";
import { ProfileSchema } from "@/types/model/User";
import { QueryClient } from "@tanstack/react-query";

type TQueryFn = {
  alert: (
    userId: string
  ) => Promise<{ state: boolean; message?: string; data?: TAlert[] }>;
  profile: (
    userId: string
  ) => Promise<{ state: boolean; message?: string; data?: ProfileSchema }>;
};

const queryFunctions: TQueryFn = {
  alert: getAlert,
  profile: getUserData,
};

export const prefetchData = async (
  queryClient: QueryClient,
  userId: string,
  key: "alert" | "profile"
) => {
  const queryFn = queryFunctions[key];
  if (queryFn) {
    await queryClient.prefetchQuery({
      queryKey: [key, userId],
      queryFn: () =>
        queryFn(userId) as Promise<{
          state: boolean;
          message?: string;
          data?: TAlert[] | ProfileSchema;
        }>,
    });
  }
};
