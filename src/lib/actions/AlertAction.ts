"use server";

import { TAlert, TAlertItem } from "@/types/model/Alert";
import connectDB from "../db";
import { Alert } from "../schema";

export async function getAlert(userId: string) {
  if (!userId) {
    return { state: false, message: "유효한 id가 없습니다." };
  }

  await connectDB();

  try {
    const result: TAlert[] = await Alert.find({ userId })
      .select("alertList allRead")
      .lean();

    if (!result) {
      return { state: false };
    }

    const data = result.map((item) => ({
      ...item,
      _id: item._id.toString(),
      alertList: item.alertList.map((alertItem) => ({
        ...alertItem,
        _id: alertItem._id?.toString(),
        comments: alertItem.comments.map((comment) => ({
          ...comment,
          _id: comment._id.toString(),
        })),
      })),
    }));

    return { state: true, data };
  } catch (error) {
    return { state: false, message: "알림 조회에 실패했습니다." };
  }
}

export async function updateAlert(id: string) {
  await connectDB();

  try {
    const update = await Alert.findOneAndUpdate(
      { "alertList.comments._id": id },
      { $set: { "alertList.$[alert].comments.$[comment].read": true } },
      {
        arrayFilters: [{ "alert.comments._id": id }, { "comment._id": id }],
        new: true,
      }
    );

    if (update) {
      const { alertList, userId } = update;
      const allReadCheck = alertList.every(({ comments }: TAlertItem) =>
        comments.every(({ read }) => read)
      );

      if (allReadCheck) {
        await Alert.updateOne({ userId }, { $set: { allRead: true } });
      }
    }

    return { state: true, update };
  } catch (error) {
    return { state: false, message: "알림 업데이트에 실패했습니다." };
  }
}

export async function allReadAlert(userId: string) {
  await connectDB();

  try {
    const update = await Alert.findOneAndUpdate(
      { userId },
      { $set: { allRead: true, "alertList.$[].comments.$[].read": true } },
      { new: true }
    );

    return { state: true, update };
  } catch (error) {
    return { state: false, message: "알림 업데이트에 실패했습니다." };
  }
}
