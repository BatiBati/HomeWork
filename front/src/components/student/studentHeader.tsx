"use client";
import { StudentType } from "@/provider/AuthProvider";
import { ArrowLeft, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const StudentHeader = ({ student }: { student: StudentType }) => {
  const router = useRouter();
  return (
    <div className="text-center bg-white/95 backdrop-blur rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <Button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 border-0"
        >
          <ArrowLeft className="w-4 h-4" />
          Буцах
        </Button>
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">
            {student.parentname.charAt(0)}.{student.childname}
          </span>
        </div>
        <div className="w-12"></div>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Миний даалгаврууд
      </h1>
      <p className="text-lg text-gray-600">Бүх даалгавруудын жагсаалт</p>
    </div>
  );
};
