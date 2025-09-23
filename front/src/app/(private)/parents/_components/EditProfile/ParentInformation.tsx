"use client";

import { AManSvg } from "@/components/svg/AManSvg";
import { DayCareEmailEdit } from "./DayCareEmailEdit";
import { PhoneEdit } from "./PhoneEdit";
import { EditOwnEmail } from "./EditOwnEmail";

export const ParentInformation = () => {
  return (
    <div className="w-full flex flex-col md:flex-row flex-wrap gap-5 justify-center md:justify-start items-center">
      <div className="flex flex-col gap-5 w-full md:w-auto">
        <div className="flex gap-1 items-center">
          <AManSvg /> Эцэг эхийн мэдээлэл:
        </div>
        <div className="flex flex-col md:flex-row flex-wrap gap-5">
          <EditOwnEmail />
          <PhoneEdit />
          <DayCareEmailEdit />
        </div>
      </div>
    </div>
  );
};
