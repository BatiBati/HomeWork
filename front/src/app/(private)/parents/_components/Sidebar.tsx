"use client";
import { useAuth } from "@/provider/AuthProvider";

import { Dispatch, SetStateAction } from "react";
import { ChildrenForSidebar } from "./children/ChildrenForSidebar";
import { EditProfileForSidebar } from "./EditProfile/EditProfileForSidebar";
import { ChatForSidebar } from "./Chat/ChatForSidebar";
type Props = {
  setSelectedSidebar: Dispatch<SetStateAction<number>>;
};
export const Sidebar = ({ setSelectedSidebar }: Props) => {
  const { user: authUser } = useAuth();

  return (
    <div className="p-6 border-[1px] w-fit rounded-xl ">
      <div className="flex flex-col gap-3">
        <div className="bg-amber-500 rounded-2xl p-2">
          {authUser?.firstName} {authUser?.lastName}
        </div>
        <div>
          <ChildrenForSidebar setSelectedSidebar={setSelectedSidebar} />
          <EditProfileForSidebar setSelectedSidebar={setSelectedSidebar} />
          <ChatForSidebar setSelectedSidebar={setSelectedSidebar} />
        </div>
      </div>
    </div>
  );
};
