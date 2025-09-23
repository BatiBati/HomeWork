"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
            <div className={` rounded cursor-pointer w-[50px] h-[50px]`}>
              <Image
                src={
                  child.profilePicture ||
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyMCIgcj0iOCIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTIgNDBDMTIgMzEuMTYzNCAxOC4xNjM0IDI1IDI3IDI1UzQyIDMxLjE2MzQgNDIgNDBWNDBIMTJaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo="
                }
                alt={`${child.firstName} ${child.lastName}`}
                width={50}
                height={50}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyMCIgcj0iOCIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTIgNDBDMTIgMzEuMTYzNCAxOC4xNjM0IDI1IDI3IDI1UzQyIDMxLjE2MzQgNDIgNDBWNDBIMTJaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=";
                }}
              />
            </div>
            {child.lastName}
          </button>
        ))}
      </div>

      {/* Assignments */}
      <ChildrenDataCard child={selectedChild} />
    </div>
  );
};
