"use client";

import type { ChildrenType } from "@/provider/AuthProvider";
import { api } from "../../../../../../axios";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookOpen } from "lucide-react";

type ChildrenDataCardProps = {
  child: ChildrenType;
};

export const ChildrenDataCard = ({ child }: ChildrenDataCardProps) => {
  type Lesson = {
    lessonName: string;
    taskDescription: string;
    images?: string[];
  };

  type Assignment = {
    _id: string;
    teacher: string;
    taskEndSchedule: string;
    createdAt: string;
    childrens: Array<string | { _id: string }>;
    lessons?: Lesson[];
  };

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const getChildrenAssignment = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get<{ assignments: Assignment[] }>(
        `/assignment/get/${child.teacher}`
      );

      const filtered = data.assignments.filter((a) =>
        a.childrens?.some(
          (c) => (typeof c === "string" ? c : c._id) === child._id
        )
      );
      setAssignments(filtered);
    } catch {
      setError("Fetch teacher data failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!child?.teacher || !child?._id) return;
    getChildrenAssignment();
  }, [child?._id, child?.teacher]);

  const sortedAssignments = [...assignments].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const groupedByDay: Record<string, Assignment[]> = {};
  sortedAssignments.forEach((a) => {
    const dayKey = new Date(a.createdAt).toISOString().split("T")[0];
    if (!groupedByDay[dayKey]) groupedByDay[dayKey] = [];
    groupedByDay[dayKey].push(a);
  });

  const dayLabels = Object.keys(groupedByDay).map((day, idx) => ({
    label: `${idx + 1} дэх өдөр`,
    date: day,
    items: groupedByDay[day],
  }));

  return (
    <div>
      {loading && <div>Уншиж байна...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {!loading && dayLabels.length > 0 && (
        <Accordion type="single" collapsible className="w-full">
          {dayLabels.map(({ label, date, items }) => (
            <AccordionItem key={date} value={label}>
              <AccordionTrigger>
                {label}{" "}
                <span className="ml-2 text-xs text-gray-500">({date})</span>
              </AccordionTrigger>
              <AccordionContent>
                {items.map((a) => (
                  <div
                    key={a._id}
                    className="border p-3 rounded mb-2 bg-gray-50"
                  >
                    <div className="text-sm text-gray-600 mb-2">
                      Дуусах хугацаа:{" "}
                      {new Date(a.taskEndSchedule).toLocaleString()}
                    </div>
                    {a.lessons?.length ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {a.lessons.map((l) => (
                          <button
                            type="button"
                            onClick={() => setSelectedLesson(l)}
                            className="font-semibold text-blue-600 hover:underline flex justify-center items-center gap-2"
                          >
                            <BookOpen className="w-4 h-4" />
                            {l.lessonName}
                          </button>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-500">
                        Даалгавар байхгүй байна.
                      </div>
                    )}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {!loading && dayLabels.length === 0 && (
        <div>Хүүхэд дээр даалгавар байхгүй байна.</div>
      )}
      <Dialog
        open={!!selectedLesson}
        onOpenChange={() => setSelectedLesson(null)}
      >
        <DialogContent>
          {selectedLesson && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedLesson.lessonName}</DialogTitle>
              </DialogHeader>
              <div className="mt-2 text-gray-700">
                {selectedLesson.taskDescription || "No description"}
              </div>
              {(selectedLesson.images?.length ?? 0) > 0 && (
                <div className="mt-4">
                  {selectedLesson.images?.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`lesson-${idx}`}
                      className="w-full rounded-lg mb-2"
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
