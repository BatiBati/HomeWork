"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Contents } from "./_components/Contents";
import { Sidebar } from "./_components/Sidebar";
import { useAuth } from "@/provider/AuthProvider";
import { LoadingSvg } from "@/components/svg/LoadingSvg";
import { toast } from "sonner";

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
    <div className="bg-white h-screen w-screen flex justify-center items-center">
      {loading ? (
        <LoadingSvg />
      ) : (
        <div className="w-full h-full flex gap-3 rounded-xl">
          <Sidebar setSelectedSidebar={setSelectedSidebar} />
          <Contents selectedSidebar={selectedSidebar} />
        </div>
      )}
    </div>
  );
}
