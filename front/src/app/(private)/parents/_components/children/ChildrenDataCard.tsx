"use client";

import type { ChildrenType } from "@/provider/AuthProvider";
import { api } from "../../../../../../axios";
import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, X, ChevronLeft, ChevronRight, Copy } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

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
    createdAt: string;
    childrens: Array<string | { _id: string }>;
    lessons?: Lesson[];
  };

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getChildrenAssignment = useCallback(async () => {
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
  }, [child.teacher, child._id]);

  useEffect(() => {
    if (!child?.teacher || !child?._id) return;
    getChildrenAssignment();
  }, [child?._id, child?.teacher, getChildrenAssignment]);

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
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map((day) => ({
      label: getDayLabel(day),
      date: day,
      items: groupedByDay[day],
    }));

  // ✅ Fix: Auto-open only once (on first load)
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current && dayLabels.length > 0) {
      const today = dayLabels.find((d) => d.label === "Өнөөдөр");
      setOpenAccordion(today ? today.date : dayLabels[0].date);
      initializedRef.current = true;
    }
  }, [dayLabels]);

  const openImageModal = (images: string[], index: number) => {
    setCurrentImages(images);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? currentImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === currentImages.length - 1 ? 0 : prev + 1
    );
  };

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
            <AccordionItem key={date} value={date}>
              <AccordionTrigger className="flex items-center justify-between">
                <span className="font-semibold text-2xl">
                  {label}{" "}
                  <span className="text-[12px] opacity-50 ml-2">{date}</span>
                </span>
              </AccordionTrigger>

              <AccordionContent className="space-y-2">
                {items.map((a) => (
                  <div
                    key={a._id}
                    className="border p-3 rounded bg-gray-50 dark:bg-gray-800 relative"
                  >
                    {/* Copy button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `https://home-work-n1g4.vercel.app/assignment/${a._id}`
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>

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
                                  <Image
                                    key={idx}
                                    src={img}
                                    alt={`lesson-${idx}`}
                                    width={500}
                                    height={300}
                                    className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px] rounded-lg border object-cover cursor-pointer hover:scale-105 transition"
                                    onClick={() =>
                                      openImageModal(l.images!, idx)
                                    }
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button
            className="absolute top-6 right-6 text-white"
            onClick={closeModal}
          >
            <X className="w-8 h-8" />
          </button>

          {currentImages.length > 1 && (
            <>
              <button
                className="absolute left-6 text-white"
                onClick={prevImage}
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                className="absolute right-6 text-white"
                onClick={nextImage}
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}

          <Image
            src={currentImages[currentIndex]}
            alt={`modal-img-${currentIndex}`}
            width={800}
            height={600}
            className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain"
          />
        </div>
      )}
    </div>
  );
};
