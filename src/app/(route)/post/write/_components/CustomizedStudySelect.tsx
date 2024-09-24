"use client";
import { StudyDataListItem } from "@/types/model/StudyCard";
import { cfetch } from "@/utils/customFetch";
import { useEffect, useId, useState } from "react";
import ReactSelect, { ActionMeta, MultiValue, SingleValue } from "react-select";
import { StylesConfig } from "react-select";

const DEFAULT_THUMBNAIL_URL = "/public/images/thumbnail/DefaultThumbnail.png";

const card = (thumbnailUrl = "", creator = "") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    content: '" "',
    backgroundImage: `url("${thumbnailUrl}")`,
    backgroundSize: "cover",
    backgroundColor: "#dbdbdd",
    display: "block",
    marginRight: 16,
    height: 40,
    width: 60,
  },

  ":after": {
    content: `"${creator}"`,
    display: "block",
    marginLeft: 16,
    color: "#aaa",
  },
});

const studyCardStyle: StylesConfig<StudyCardSelectOption> = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    minHeight: "56px",
    height: "fit-content",
    padding: "9px 4px 9px 8px",
    borderRadius: "10px",
    borderColor: state.isFocused ? "#2a7ffe" : "#dbdbdd",
    ":hover": {
      borderColor: "var(--color-label-alt)",
      color: baseStyles.color,
    },
  }),
  option: (styles, { data }) => ({
    ...styles,
    ...card(
      data.studyInfo.thumbnailUrl || DEFAULT_THUMBNAIL_URL,
      `${data.writer.position_tag} ${data.writer.name}`
    ),
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...card(
      data.studyInfo.thumbnailUrl || DEFAULT_THUMBNAIL_URL,
      `${data.writer.position_tag} ${data.writer.name}`
    ),
  }),
};

export type StudyCardSelectOption = StudyDataListItem & {
  value: string;
  label: string;
};

const loadOptions = (inputValue: string) =>
  cfetch("/api/study", { next: { tags: ["study"] } })
    .then((res) => res.json())
    .then(({ data }) => {
      return data.map((study: any) => ({
        ...study,
        value: study.studyId,
        label: study.title,
      }));
    })
    .catch((error) => {
      console.error(error.message);
      return [];
    });

type CustomizedStudySelectProps = {
  options: StudyCardSelectOption[];
  name: string;
  className?: string;
  defaultValue?: string;
};
export default function CustomizedStudySelect(
  props: CustomizedStudySelectProps
) {
  const { options, name, className = "", defaultValue } = props;
  const thisId = useId();
  const [selected, setSelected] = useState<
    | SingleValue<StudyCardSelectOption>
    | MultiValue<StudyCardSelectOption>
    | null
  >(null);

  useEffect(() => {
    // console.log("options", options);
    const defaultOption = defaultValue
      ? options.find((opt) => opt.value === defaultValue) || null
      : null;

    setSelected(defaultOption);
  }, [options, defaultValue]);

  const onChange = (
    select:
      | SingleValue<StudyCardSelectOption>
      | MultiValue<StudyCardSelectOption>,
    _: ActionMeta<StudyCardSelectOption>
  ) => {
    if (Array.isArray(select)) {
      setSelected(null);
    } else {
      setSelected(select);
    }
  };

  return (
    <ReactSelect
      id={thisId}
      instanceId={thisId}
      name={name}
      // cacheOptions
      // defaultOptions
      // loadOptions={loadOptions}
      options={options}
      styles={studyCardStyle}
      className={className}
      // defaultInputValue={defaultValue}
      value={selected}
      onChange={onChange}
      isMulti={false}
      isSearchable
      isClearable
      placeholder="스터디를 선택하세요"
    />
  );
}
