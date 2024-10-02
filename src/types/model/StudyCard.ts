import { ProfileSchema, WriterSchema } from "./User";
import { CommentSchema } from "./Comment";

type CommentId = CommentSchema["commentId"];

export type StudySchema = {
  studyId: string;
  studyInfo: {
    expense: number;
    jobCategory: { label: string; value: string };
    location: { label: string; value: string };
    place: string | null;
    recruitmentPeople: number;
    recruitmentPeriod: [string, string];
    studyPeriod: [string, string];
    targetCategory: { label: string; value: string };
    thumbnailUrl: string | null;
    title: string;
  };
  contents: {
    content: string;
    curriculums: string[];
    rules: string[];
  };
  writer: ProfileSchema;
  heartCount: number;
  createAt: string;
  comments: CommentId[];
};

export type StudyDataListItem = Omit<StudySchema, "writer"> & {
  writer: WriterSchema;
};

export type StudyDataFull = Omit<StudySchema, "writer" | "comments"> & {
  writer: ProfileSchema;
  comments: CommentSchema[];
};

export type StudyValue = Omit<
  StudySchema,
  "writer" | "comments" | "createdAt" | "heartCount"
>;
