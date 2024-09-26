export type TAlertItem = {
  _id?: string;
  type: "post" | "study";
  typeId: string;
  title: string;
  comments: {
    _id: string;
    comment: string;
    read: boolean;
  }[];
};

export type TAlert = {
  _id: string;
  alertList: TAlertItem[];
  allRead: boolean;
};
