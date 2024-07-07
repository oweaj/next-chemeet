"use client";
import {
  BellRingIcon,
  BuildingIcon,
  BulbIcon,
  FileEditIcon,
  KeyboardIcon,
  MonitorPlayIcon,
  NotebookIcon,
  PuzzleIcon,
  TIconStylingProps,
} from "@/common/Atoms/Image/Icon";
import { GOALS } from "@/dummies/categories";
import { TStudyCard, getStudiesData } from "@/dummies/studies";

import { useEffect, useState } from "react";
import { TabButton } from "./TabButton";
import StudyCardList from "@/common/Templates/CardList";

const ICONS = [
  (props: TIconStylingProps) => <NotebookIcon {...props} />,
  (props: TIconStylingProps) => <KeyboardIcon {...props} />,
  (props: TIconStylingProps) => <BulbIcon {...props} />,
  (props: TIconStylingProps) => <FileEditIcon {...props} />,
  (props: TIconStylingProps) => <BuildingIcon {...props} />,
  (props: TIconStylingProps) => <BellRingIcon {...props} />,
  (props: TIconStylingProps) => <MonitorPlayIcon {...props} />,
  (props: TIconStylingProps) => <PuzzleIcon {...props} />,
];

const GOALS_TAB = GOALS.map((goal, index) => ({ ...goal, Icon: ICONS[index] }));

export default function TabButtonsOfGoalSection() {
  const [selected, setSelected] = useState(GOALS[0].value);
  const [proStudies, setStudies] = useState<TStudyCard[]>([]);

  useEffect(() => {
    setStudies(() => getStudiesData());
  }, [selected]);

  return (
    <>
      <div className="flex flex-row gap-4 w-fit mx-auto mb-11">
        {GOALS_TAB.map(({ label, value, Icon }) => {
          const active = selected === value;
          return (
            <TabButton
              key={value}
              label={label}
              active={active}
              onClick={() => setSelected(value)}
            >
              <Icon strokeColor={active ? "#FFFFFF" : undefined} />
            </TabButton>
          );
        })}
      </div>
      <StudyCardList studyCard={proStudies} count={8} />
    </>
  );
}
