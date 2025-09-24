"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/provider/AuthProvider";
import type { ChildrenType } from "@/provider/AuthProvider";
import { ChildrenDataCard } from "./ChildrenDataCard";

export const ChildrenContent = () => {
  const { user } = useAuth();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [selectedChild, setSelectedChild] = useState<ChildrenType | null>(null);

  
  useEffect(() => {
    if (user?.children?.length && !selectedChildId) {
      setSelectedChildId(user.children[0]._id);
    }
  }, [user, selectedChildId]);

  useEffect(() => {
    if (selectedChildId && user?.children?.length) {
      const child =
        user.children.find((c) => c._id === selectedChildId) || null;
      setSelectedChild(child);
    }
  }, [selectedChildId, user]);

  if (!selectedChild) return <div>Хүүхдээ сонгоно уу</div>;

  return (
    <div className="flex flex-col gap-4 bg-white p-4 flex-1 overflow-y-auto">
      {/* Child selector */}
      <div className="flex gap-2 flex-wrap mb-4">
        {user?.children.map((child) => (
          <button key={child._id} onClick={() => setSelectedChildId(child._id)}>
            <div className=" w-fit flex flex-col items-center gap-2">
              <div className={` rounded cursor-pointer w-[100px] h-[100px]`}>
                <img
                  src={child.profilePicture || "/images/NoProfile.png"}
                  alt={`${child.firstName} ${child.lastName}`}
                  width={50}
                  height={50}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="p-3 w-full bg-[#a0d2ca] rounded-xl cursor-pointer text-white font-semibold">
                {child.lastName}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Assignments */}
      <ChildrenDataCard child={selectedChild} />
    </div>
  );
};
