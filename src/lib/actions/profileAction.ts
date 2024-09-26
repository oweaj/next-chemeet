"use server";

import { revalidatePath } from "next/cache";
import connectDB from "../db";
import { User } from "../schema";
import { getSession } from "@/auth";
import { UserSchema } from "@/types/model/User";
import { supabase } from "../supabase";
import { nanoid } from "nanoid";

/**
 * 사용자 프로필 정보 업데이트
 */
export async function updateProfile(id: string, formData: FormData) {
  const position_tag = formData.get("positionTag") as string;
  const introduce = formData.get("introduce") as string;
  const my_category = JSON.parse(formData.get("myCategory") as string);

  console.log("update", { position_tag, introduce, my_category });

  try {
    const update = await User.findOneAndUpdate(
      { _id: id },
      { position_tag, introduce, my_category },
      { new: true }
    );

    if (!update) {
      return { state: false, message: "해당 프로필을 찾을 수 없습니다." };
    }

    return {
      state: true,
      message: "프로필 정보가 업데이트 되었습니다.",
    };
  } catch (error) {
    console.log("update profile" + error);
    return {
      state: false,
      message: "프로필 정보 업데이트에 실패했습니다.",
    };
  }
}

/**
 * 사용: `<SetCategoryFavor />`
 *
 * 관심 카테고리 저장
 * SetCategoryFavor 모달에서 사용
 */
export async function saveMyCategory(formData: FormData) {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    return { state: false, message: "유효한 id가 필요합니다." };
  }

  await connectDB();

  const my_category = JSON.parse(formData.get("my_category") as string);

  try {
    await User.findOneAndUpdate({ userId }, { my_category }, { new: true });

    return {
      state: true,
      message: "관심 카테고리 저장하여 로그인 되었습니다.",
    };
  } catch (error) {
    console.log("profile error" + error);
    return {
      state: false,
      message: "관심 카테고리 저장에 실패했습니다",
    };
  }
}

/**
 * `updateDoc`으로 업데이트할 사용자 정보를 타입에 맞게 전달하여
 * 사용자 정보 업데이트
 */
type NonStaticUserData = Pick<UserSchema, "profile_img" | "phone" | "role">;
type UpdateDocument = Partial<NonStaticUserData>;
export async function updateUserData(id: string, updateDoc: UpdateDocument) {
  await connectDB();

  const check = await User.exists({ _id: id });

  try {
    const update = await User.findOneAndUpdate({ _id: id }, updateDoc, {
      new: true,
    });

    if (!update) {
      return { state: false, message: "해당 프로필을 찾을 수 없습니다." };
    }

    revalidatePath("/my/profile");

    return {
      state: true,
      message: "프로필 정보가 변경되었습니다.",
    };
  } catch (error: any) {
    return { state: false, message: "프로필 정보 로딩에 실패했습니다." };
  }
}

export async function supabaseUploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  const fileName = nanoid();

  try {
    const { error } = await supabase.storage
      .from("image")
      .upload(`profile_image/${fileName}`, file);

    if (error) {
      return { state: false, message: "이미지 파일이 업로드 되지않았습니다." };
    }

    const { data } = supabase.storage
      .from("image")
      .getPublicUrl(`profile_image/${fileName}`);

    return { state: true, result: data.publicUrl };
  } catch (error) {
    return { state: false, message: "이미지 업로드에 실패했습니다." };
  }
}
