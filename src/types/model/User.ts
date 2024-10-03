import { TSelectOption } from "./Category";

export type UserSchema = {
  _id: string;
  email: string;
  name: string;
  profile_img: string;
  phone: string;
  role: string;
  provider?: string;
  providerAccountId?: string;
};

export type ProfileSchema = UserSchema & {
  position_tag: string;
  introduce: string;
  my_category: TSelectOption[];
};

export type WriterSchema = Pick<
  ProfileSchema,
  "_id" | "name" | "email" | "role" | "profile_img" | "position_tag"
>;
