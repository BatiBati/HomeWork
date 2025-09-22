"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/provider/AuthProvider";
import type { ChildrenType } from "@/provider/AuthProvider";
import { ChildrenDataCard } from "./ChildrenDataCard";
import { api } from "../../../../../../axios";
import { ChildrenAssignments } from "./ChildrenAssignments";

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
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {user?.children.map((child) => (
          <button key={child._id} onClick={() => setSelectedChildId(child._id)}>
            <div
              className={`px-2 py-1 rounded cursor-pointer ${
                selectedChildId === child._id
                  ? "bg-blue-500 text-white"
                  : "bg-white border-[1px]"
              }`}
            >
              {child.firstName}
            </div>
          </button>
        ))}
      </div>
      <div>
        <ChildrenDataCard child={selectedChild} />
      </div>
    </div>
  );
};
