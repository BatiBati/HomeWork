"use client";
import { useState } from "react";
import { Contents } from "./_components/Contents";
import { SidebarParent } from "./_components/SidebarParent";

export default function Parent() {
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  return (
    <div className="bg-[#f2f2f2] h-screen w-screen flex justify-center items-center">
      <div className="w-[50%] h-[70%] border-[1px] p-4 flex gap-3 rounded-xl bg-white">
        <SidebarParent onSelectChild={setSelectedChildId} />
        <Contents selectedChildId={selectedChildId} />
      </div>
    </div>
  );
}
