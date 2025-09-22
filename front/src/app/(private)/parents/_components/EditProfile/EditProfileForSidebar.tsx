"use client";

import { Dispatch, SetStateAction } from "react";

type Props = {
  setSelectedSidebar: Dispatch<SetStateAction<number>>;
};
export const EditProfileForSidebar = ({ setSelectedSidebar }: Props) => {
  return (
    <div
      className="w-full  bg-amber-200 cursor-pointer"
      onClick={() => {
        setSelectedSidebar(2);
      }}
    >
      Тохиргоо
    </div>
  );
};
