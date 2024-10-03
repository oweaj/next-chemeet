export type TAlertItem = {
  type: "post" | "study";
  typeId: string;
  title: string;
  comments: {
    comment: string;
    read: boolean;
  }[];
};

export type TAlert = {
  _id: string;
  alertList: TAlertItem[];
  allRead: boolean;
};
