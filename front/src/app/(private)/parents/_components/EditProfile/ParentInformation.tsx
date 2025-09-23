"use client";
import { DayCareEmailEdit } from "./DayCareEmailEdit";

export const ParentInformation = () => {
  return (
    <div className="w-full gap-3 bg-red-200 p-5">
      <div className="w-fit">
        <div>Эцэг эхийн мэдээлэл:</div>
        <div className="flex gap-10">
          <DayCareEmailEdit />
          <DayCareEmailEdit />
          <DayCareEmailEdit />
        </div>
      </div>
    </div>
  );
};
