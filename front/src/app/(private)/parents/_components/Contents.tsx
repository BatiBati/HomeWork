"use client";
import { ChildrenType } from "@/provider/AuthProvider";
import { useEffect, useState } from "react";
import { api } from "../../../../../axios";

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

export const Contents = ({
  selectedChildId,
}: {
  selectedChildId: string | null;
}) => {
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

  if (!selectedChildId) {
    return <div className="p-6 w-full text-gray-500 ">Хүүхдээ сонгоно уу</div>;
  }

  const childAssignments = assignments.filter((a) =>
    a.childrens.some((c) => c._id === selectedChildId)
  );

  const selectedAssignments = selectedDate
    ? childAssignments.filter(
        (a) =>
          new Date(a.taskEndSchedule).toDateString() ===
          new Date(selectedDate).toDateString()
      )
    : [];

  return (
    <div className="p-6 border-[1px] w-full rounded-xl">
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
          {selectedAssignments.map((a) =>
            a.lessons.map((lesson, i) => (
              <div key={i} className="p-2 bg-gray-50 rounded">
                <div className="font-medium">{lesson.lessonName}</div>
                <div className="text-sm text-gray-600">
                  {lesson.taskDescription}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="text-gray-500">Огноо сонгоно уу</div>
      )}
    </div>
  );
};
