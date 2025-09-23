"use client";

import { Dispatch, SetStateAction } from "react";
import { Users } from "lucide-react"; // хүүхдийн icon оруулж байна

type Props = {
  setSelectedSidebar: Dispatch<SetStateAction<number>>;
};

export const ChildrenForSidebar = ({ setSelectedSidebar }: Props) => {
  return (
    <div
      onClick={() => {
        setSelectedSidebar(1);
      }}
      className="flex items-center gap-3 w-full px-4 py-2 rounded-xl cursor-pointer 
                 bg-white/10 hover:bg-white/20 transition"
    >
      <Users className="w-5 h-5 text-white" />
      <span className="text-white font-medium">Гэрийн даалгавар</span>
    </div>
  );
};
