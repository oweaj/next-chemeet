export type CategoryGroup = {
  value: string;
  label: string;
  options: TSelectOption[];
};

export type TSelectOption = {
  _id?: string;
  value: string;
  label: string;
};
