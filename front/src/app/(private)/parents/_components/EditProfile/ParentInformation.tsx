"use client";
import { AManSvg } from "@/components/svg/AManSvg";
import { DayCareEmailEdit } from "./DayCareEmailEdit";
import { PhoneEdit } from "./PhoneEdit";
import { EditOwnEmail } from "./EditOwnEmail";

export const ParentInformation = () => {
  return (
    <div className="w-full gap-3 p-5 flex flex-col items-center">
      <div className="w-fit ">
        <div className="flex gap-1 items-center">
          <AManSvg /> Эцэг эхийн мэдээлэл:
        </div>
        <div className="flex gap-10 w-full">
          <EditOwnEmail />
          <PhoneEdit />
          <DayCareEmailEdit />
        </div>
      </div>
    </div>
  );
};
