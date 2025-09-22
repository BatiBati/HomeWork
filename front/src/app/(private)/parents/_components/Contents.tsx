"use client";
import { ChildrenType, useAuth } from "@/provider/AuthProvider";
import { useEffect, useState, useMemo } from "react";
import { api } from "../../../../../axios";
import { LoadingSvg } from "@/components/svg/LoadingSvg";

type AssignmentType = {
  _id: string;
  teacher: string;
  taskEndSchedule: string;
  childrens: ChildrenType[];
  lessons: Array<{
    lessonName: string;
    taskDescription: string;
    images: string[];
  }>;
};
type Props = {
  selectedChildId: number;
};
export const Contents = ({ selectedChildId }: Props) => {
  const { loading } = useAuth();
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getAssignments = async () => {
    try {
      const res = await api.get("/assignment");
      setAssignments(res.data.assignment);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    getAssignments();
  }, []);

  const childAssignments = useMemo(() => {
    if (!selectedChildId) return [];
    return assignments
      .filter((a) => a.childrens.some((c) => Number(c._id) === selectedChildId))
      .sort(
        (a, b) =>
          new Date(b.taskEndSchedule).getTime() -
          new Date(a.taskEndSchedule).getTime()
      );
  }, [assignments, selectedChildId]);

  useEffect(() => {
    if (childAssignments.length > 0 && !selectedDate) {
      setSelectedDate(childAssignments[0].taskEndSchedule);
    }
  }, [childAssignments, selectedDate]);

  // ✅ conditional rendering зөвхөн энд
  if (!selectedChildId) {
    return <div className="p-6 w-full text-gray-500">Хүүхдээ сонгоно уу</div>;
  }

  const selectedAssignments = selectedDate
    ? childAssignments.filter(
        (a) =>
          new Date(a.taskEndSchedule).toDateString() ===
          new Date(selectedDate).toDateString()
      )
    : [];

  return (
    <div className="p-6 border-[1px] w-fit rounded-xl">
      {loading ? (
        <LoadingSvg />
      ) : (
        <>
          <h4 className="font-semibold mb-2">Даалгавар</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {childAssignments.map((a) => (
              <button
                key={a._id}
                onClick={() => setSelectedDate(a.taskEndSchedule)}
                className={`px-3 py-1 rounded-lg border ${
                  selectedDate === a.taskEndSchedule
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {new Date(a.taskEndSchedule).toLocaleDateString()}
              </button>
            ))}
          </div>
          {selectedDate ? (
            <div className="space-y-3">
              {selectedAssignments.length > 0 ? (
                selectedAssignments.map((a) =>
                  Array.isArray(a.lessons) && a.lessons.length > 0
                    ? a.lessons.map((lesson, i) => (
                        <div key={i} className="p-2 bg-gray-50 rounded">
                          <div className="font-medium">{lesson.lessonName}</div>
                          <div className="text-sm text-gray-600">
                            {lesson.taskDescription}
                          </div>
                        </div>
                      ))
                    : null
                )
              ) : (
                <div className="text-gray-500">Энэ хүүхэдт даалгавар алга</div>
              )}
            </div>
          ) : (
            <div className="text-gray-500">Огноо сонгоно уу</div>
          )}
        </>
      )}
    </div>
  );
};
