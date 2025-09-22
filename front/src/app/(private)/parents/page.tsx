"use client";
import { useState } from "react";
import { Contents } from "./_components/Contents";
import { SidebarParent } from "./_components/SidebarParent";
import { useAuth } from "@/provider/AuthProvider";
import { ParentChat } from "./_components/Chat";

export default function Parent() {
  const [selectedChildId, setSelectedChildId] = useState<number>(1);
  const { user, loading } = useAuth();

  // useEffect(() => {
  //   if (!selectedChildId && user?.children?.length) {
  //     const firstChildId = user.children?.[0]?._id;
  //     if (firstChildId) setSelectedChildId(firstChildId);
  //   }
  // }, [user, selectedChildId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Та нэвтэрнэ үү</div>;
  }

  return (
    <div className="bg-[#f2f2f2] h-screen w-screen flex justify-center items-center">
      <div className="w-[50%] h-[70%] border-[1px] p-4 flex gap-3 rounded-xl bg-white">
        <SidebarParent
          onSelectChild={setSelectedChildId}
          selectedChildId={selectedChildId}
        />
        <Contents selectedChildId={selectedChildId} />
        <ParentChat />
      </div>
    </div>
  );
}
