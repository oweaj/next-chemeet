"use server";

import { nanoid } from "nanoid";
import connectDB from "../db";
import { Alert, Study } from "../schema";
import { revalidatePath, revalidateTag } from "next/cache";
import { StudySchema } from "@/types/model/StudyCard";

// post
export async function createStudy(userId: string, formData: FormData) {
  const studyId = nanoid();
  const title = formData.get("title") as string;
  const thumbnailUrl = formData.get("thumbnailUrl") as string;
  const jobCategory = JSON.parse(formData.get("jobCategory") as string);
  const targetCategory = JSON.parse(formData.get("targetCategory") as string);
  const expense = Number(formData.get("expense"));
  const recruitmentPeople = Number(formData.get("recruitmentPeople"));
  const recruitmentPeriod = JSON.parse(
    formData.get("recruitmentPeriod") as string
  );
  const studyPeriod = JSON.parse(formData.get("studyPeriod") as string);
  const location = JSON.parse(formData.get("location") as string);
  const place = formData.get("place") as string;
  const content = formData.get("content") as string;
  const rules = JSON.parse(formData.get("rules") as string);
  const curriculums = JSON.parse(formData.get("curriculums") as string);

  console.log(
    title,
    thumbnailUrl,
    jobCategory,
    targetCategory,
    expense,
    recruitmentPeople,
    recruitmentPeriod,
    studyPeriod,
    location,
    place,
    content,
    rules,
    curriculums
  );

  if (
    !title ||
    !jobCategory ||
    !targetCategory ||
    !expense ||
    !recruitmentPeople ||
    !recruitmentPeriod ||
    !studyPeriod ||
    !location ||
    !content
  ) {
    return {
      state: false,
      message: "스터디 개설하려면 필수 정보를 입력해주세요.",
    };
  }

  await connectDB();

  try {
    const study = new Study({
      studyId,
      studyInfo: {
        thumbnailUrl,
        title,
        jobCategory,
        targetCategory,
        recruitmentPeople,
        recruitmentPeriod,
        studyPeriod,
        location,
        expense,
        place,
      },
      contents: {
        content,
        rules,
        curriculums,
      },
      writer: userId,
    });

    if (study) {
      await Alert.updateOne(
        { userId },
        {
          $push: {
            alertList: {
              type: "study",
              typeId: studyId,
              title,
            },
          },
        },
        { upsert: true }
      );
    }

    await study.save();
    revalidateTag("study");
    return { state: true, message: "스터디 개설이 완료되었습니다." };
  } catch (error) {
    console.log("post study error" + error);
    return { state: false, message: "스터디 개설에 실패했습니다." };
  }
}

// get
export async function getStudy(studyId: string | null = null) {
  await connectDB();

  try {
    if (studyId) {
      const study: StudySchema | null = await Study.findOne({ studyId })
        .populate("comments")
        .populate(
          "writer",
          "name email role profile_img position_tag introduce my_category"
        );

      if (!study) {
        return { state: false, message: "해당 스터디를 찾을 수 없습니다." };
      }

      return { state: true, data: JSON.parse(JSON.stringify(study)) };
    } else {
      const studyList = await Study.find()
        .populate("writer", "name email role profile_img position_tag")
        .sort({ createAt: "desc" });
      return { state: true, data: JSON.parse(JSON.stringify(studyList)) };
    }
  } catch (error) {
    console.log(error);
    return { state: false, message: "스터디 목록을 가져오는데 실패했습니다." };
  }
}

// update
export async function updateStudy(studyId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const thumbnailUrl = formData.get("thumbnailUrl") as string;
  const jobCategory = JSON.parse(formData.get("jobCategory") as string);
  const targetCategory = JSON.parse(formData.get("targetCategory") as string);
  const expense = Number(formData.get("expense"));
  const recruitmentPeople = Number(formData.get("recruitmentPeople"));
  const recruitmentPeriod = JSON.parse(
    formData.get("recruitmentPeriod") as string
  );
  const studyPeriod = JSON.parse(formData.get("studyPeriod") as string);
  const location = JSON.parse(formData.get("location") as string);
  const place = formData.get("place") as string;
  const content = formData.get("content") as string;
  const rules = JSON.parse(formData.get("rules") as string);
  const curriculums = JSON.parse(formData.get("curriculums") as string);

  if (
    !title ||
    !jobCategory ||
    !targetCategory ||
    !expense ||
    !recruitmentPeople ||
    !recruitmentPeriod ||
    !studyPeriod ||
    !location ||
    !content
  ) {
    return {
      state: false,
      message: "스터디 개설하려면 필수 정보를 입력해주세요.",
    };
  }

  try {
    const update = await Study.findOneAndUpdate(
      { studyId },
      {
        $set: {
          studyInfo: {
            thumbnailUrl,
            title,
            jobCategory,
            targetCategory,
            recruitmentPeople,
            recruitmentPeriod,
            studyPeriod,
            location,
            expense,
            place,
          },
          contents: {
            content,
            rules,
            curriculums,
          },
        },
      },
      { new: true }
    );

    if (!update) {
      return { state: false, message: "해당 스터디를 찾을 수 없습니다." };
    }
    revalidateTag("study");
    revalidatePath("/study/" + studyId);
    return { state: true, message: "스터디가 수정 되었습니다." };
  } catch (error) {
    console.log("update study error" + error);
    return { state: false, message: "스터디 수정에 실패했습니다." };
  }
}

// delete
export async function deleteStudy(studyId: string) {
  await connectDB();

  try {
    await Study.deleteOne({ studyId });
    await Alert.updateOne(
      { "alertList.typeId": studyId },
      { $pull: { alertList: { typeId: studyId } } }
    );

    revalidateTag("study");
    return { state: true, message: "스터디가 삭제 되었습니다." };
  } catch (error) {
    console.log("delete study error" + error);
    return { state: false, message: "스터디 삭제에 실패했습니다." };
  }
}
