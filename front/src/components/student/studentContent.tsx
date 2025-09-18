import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

import { StudentType } from "@/provider/AuthProvider";
import { Dialog, DialogContent } from "@/components/ui/dialog";
export const StudentContent = ({
  student,
  activeFilter,
  setActiveFilter,
}: {
  student: StudentType;
  activeFilter: "all" | "submitted" | "not-submitted";
  setActiveFilter: (filter: "all" | "submitted" | "not-submitted") => void;
}) => {
  const submittedCount =
    student.homeworks?.filter((hw) => hw.status).length || 0;
  const totalCount = student.homeworks?.length || 0;
  const notSubmittedCount = totalCount - submittedCount;

  const filteredHomeworks =
    student.homeworks?.filter((homework) => {
      if (activeFilter === "all") return true;
      return activeFilter === "submitted" ? homework.status : !homework.status;
    }) || [];
  return (
    <div>
      <div className="flex gap-4 justify-center">
        <Card
          className={`flex-1 text-center cursor-pointer transition-all hover:scale-105 ${
            activeFilter === "all"
              ? "bg-blue-100 border-2 border-blue-300"
              : "bg-white/95"
          }`}
          onClick={() => setActiveFilter("all")}
        >
          <CardContent className="p-2">
            <div className="text-2xl mb-1">📚</div>
            <div className="text-xl font-bold">{totalCount}</div>
            <div className="text-sm text-gray-600">Нийт</div>
          </CardContent>
        </Card>

        <Card
          className={`flex-1 text-center cursor-pointer transition-all hover:scale-105 ${
            activeFilter === "submitted"
              ? "bg-blue-100 border-2 border-blue-300"
              : "bg-white/95"
          }`}
          onClick={() => setActiveFilter("submitted")}
        >
          <CardContent className="p-2">
            <div className="text-2xl mb-1">📤</div>
            <div className="text-xl font-bold">{submittedCount}</div>
            <div className="text-sm text-gray-600">Илгээгдсэн</div>
          </CardContent>
        </Card>

        <Card
          className={`flex-1 text-center cursor-pointer transition-all hover:scale-105 ${
            activeFilter === "not-submitted"
              ? "bg-orange-100 border-2 border-orange-300"
              : "bg-white/95"
          }`}
          onClick={() => setActiveFilter("not-submitted")}
        >
          <CardContent className="p-2">
            <div className="text-2xl mb-1">⏰</div>
            <div className="text-xl font-bold">{notSubmittedCount}</div>
            <div className="text-sm text-gray-600">Илгээгдээгүй</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
