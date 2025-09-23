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
import { Skeleton } from "@/components/ui/skeleton";

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
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(
    undefined
  );

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
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const groupedByDay: Record<string, Assignment[]> = {};
  sortedAssignments.forEach((a) => {
    const dayKey = new Date(a.createdAt).toISOString().split("T")[0];
    if (!groupedByDay[dayKey]) groupedByDay[dayKey] = [];
    groupedByDay[dayKey].push(a);
  });

  const getDayLabel = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return "Өнөөдөр";
    }

    const daysMn = [
      "Ням",
      "Даваа",
      "Мягмар",
      "Лхагва",
      "Пүрэв",
      "Баасан",
      "Бямба",
    ];

    return daysMn[date.getDay()];
  };

  const dayLabels = Object.keys(groupedByDay)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime()) // newest first
    .map((day) => ({
      label: getDayLabel(day),
      date: day,
      items: groupedByDay[day],
    }));

  // Auto-open first accordion (latest date)
  useEffect(() => {
    if (dayLabels.length > 0) setOpenAccordion(dayLabels[0].label);
  }, [assignments]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {loading && (
        <div className="p-4 border rounded-xl space-y-3 bg-gray-200/30 dark:bg-gray-800/40">
          <Skeleton className="h-6 w-full rounded bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="h-6 w-full rounded bg-gray-300 dark:bg-gray-700" />
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}

      {!loading && dayLabels.length > 0 && (
        <Accordion
          type="single"
          collapsible
          className="w-full"
          value={openAccordion}
          onValueChange={setOpenAccordion}
        >
          {dayLabels.map(({ label, date, items }) => (
            <AccordionItem key={date} value={label}>
              <AccordionTrigger className="flex justify-between items-center">
                <span>{label}</span>
                <span className="ml-2 text-xs text-gray-500">{date}</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                {items.map((a) => (
                  <div
                    key={a._id}
                    className="border p-3 rounded bg-gray-50 dark:bg-gray-800"
                  >
                    {a.lessons?.length ? (
                      <ul className="list-disc pl-5 space-y-4">
                        {a.lessons.map((l, i) => (
                          <li key={i} className="space-y-2">
                            <div className="font-semibold text-blue-600 flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              {l.lessonName}
                            </div>
                            <div className="text-gray-700 dark:text-gray-300">
                              {l.taskDescription || "No description"}
                            </div>
                            {l.images && l.images.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-3">
                                {l.images.map((img, idx) => (
                                  <img
                                    key={idx}
                                    src={img}
                                    alt={`lesson-${idx}`}
                                    className="max-w-full w-full sm:w-60 rounded-lg border object-cover"
                                  />
                                ))}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-500 dark:text-gray-400">
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
    </div>
  );
};
