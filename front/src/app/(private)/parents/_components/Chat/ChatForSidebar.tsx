"use client";

import { Dispatch, SetStateAction } from "react";
import { MessageSquare } from "lucide-react"; // 💬 мессеж icon

type Props = {
  setSelectedSidebar: Dispatch<SetStateAction<number>>;
};

export const ChatForSidebar = ({ setSelectedSidebar }: Props) => {
  return (
    <div
      onClick={() => setSelectedSidebar(3)}
      className="flex items-center gap-3 w-full px-4 py-2 rounded-xl cursor-pointer 
                 bg-white/10 hover:bg-white/20 transition"
    >
      <MessageSquare className="w-5 h-5 text-white" />
      <span className="text-white font-medium">Мессеж</span>
    </div>
  );
};
