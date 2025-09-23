"use client";

import { SettingsSvg } from "@/components/svg/SettingsSvg";
import { ParentInformation } from "./ParentInformation";

export const EditProfileContent = () => {
  return (
    <div className="p-5 md:p-10 flex flex-col gap-8 w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center gap-2">
        <div className="font-semibold text-3xl md:text-4xl flex gap-2 items-center opacity-80">
          <SettingsSvg /> Тохиргоо
        </div>
        <div className="opacity-50 text-sm md:text-[14px] text-center">
          Та өөрийн болон хүүхдийнхээ мэдээллийг шинэчлэх боломжтой
        </div>
      </div>

      {/* Parent info cards */}
      <ParentInformation />
    </div>
  );
};
