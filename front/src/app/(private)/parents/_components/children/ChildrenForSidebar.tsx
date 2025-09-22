"use client";

import { Dispatch, SetStateAction } from "react";

type Props = {
  setSelectedSidebar: Dispatch<SetStateAction<number>>;
};
export const ChildrenForSidebar = ({ setSelectedSidebar }: Props) => {
  return (
    <div
      onClick={() => {
        setSelectedSidebar(1);
      }}
      className="w-full  bg-red-200 cursor-pointer"
    >
      Хүүхэд
    </div>
  );
};
