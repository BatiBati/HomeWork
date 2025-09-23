"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Contents } from "./_components/Contents";
import { Sidebar } from "./_components/Sidebar";
import { useAuth } from "@/provider/AuthProvider";
import { toast } from "sonner";
import { ParentSkeleton } from "./_components/skeleton";

export default function Parent() {
  const [selectedSidebar, setSelectedSidebar] = useState<number>(1);
  const { loading, setLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/");
      }
    } catch {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  }, [router]);

  return (
    <div className="bg-white w-screen min-h-screen flex flex-col lg:overflow-hidden overflow-auto">
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <ParentSkeleton />
        </div>
      ) : (
        <>
          <Sidebar setSelectedSidebar={setSelectedSidebar} />

          {/* Main content */}
          <div className="flex-1 overflow-auto p-4 md:p-6">
            <Contents selectedSidebar={selectedSidebar} />
          </div>
        </>
      )}
    </div>
  );
}
