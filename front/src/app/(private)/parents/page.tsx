"use client";
import { useState } from "react";
import { Contents } from "./_components/Contents";
import { Sidebar } from "./_components/Sidebar";

export default function Parent() {
  const [selectedSidebar, setSelectedSidebar] = useState<number>(1);

  return (
    <div className="bg-[#f2f2f2] h-screen w-screen flex justify-center items-center">
      <div className="w-[50%] h-[70%] border-[1px] p-4 flex gap-3 rounded-xl bg-white">
        <Sidebar setSelectedSidebar={setSelectedSidebar} />
        <Contents selectedSidebar={selectedSidebar} />
      </div>
    </div>
  );
}
