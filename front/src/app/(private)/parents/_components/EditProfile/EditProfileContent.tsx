"use client";

import { SettingsSvg } from "@/components/svg/SettingsSvg";
import { EditProfileForChildren } from "./EditProfileForChildren";
import { ParentInformation } from "./ParentInformation";

export const EditProfileContent = () => {
  return (
    <div className="p-10">
      <div className="flex flex-col items-center">
        <div className="font-semibold text-4xl fit flex gap-2 items-center opacity-80">
          <SettingsSvg /> Тохиргоо
        </div>
        <div className="opacity-50 text-[14px]">
          Та өөрийн болон хүүхдийнхээ мэдээллийг шинэчлэх боломжтой
        </div>
      </div>
      <ParentInformation />
      <div>EditProfile</div>
    </div>
  );
};
