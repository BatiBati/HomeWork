"use client";

import { ChildrenContent } from "./children/ChildrenContent";
import { EditProfileContent } from "./EditProfile/EditProfileContent";

type Props = {
  selectedSidebar: number;
};
export const Contents = ({ selectedSidebar }: Props) => {
  return (
    <div className="p-6 border-[1px] w-full rounded-xl ">
      {selectedSidebar === 1 && <ChildrenContent />}
      {selectedSidebar === 2 && <EditProfileContent />}
    </div>
  );
};
