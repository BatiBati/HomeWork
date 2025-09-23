"use client";

import { ParentChat } from "./Chat";
import { ChildrenContent } from "./children/ChildrenContent";
import { EditProfileContent } from "./EditProfile/EditProfileContent";

type Props = {
  selectedSidebar: number;
};
export const Contents = ({ selectedSidebar }: Props) => {
  return (
    <div className="p-6 w-full rounded-xl ">
      {selectedSidebar === 1 && <ChildrenContent />}
      {selectedSidebar === 2 && <EditProfileContent />}
      {selectedSidebar === 3 && <ParentChat />}
    </div>
  );
};
