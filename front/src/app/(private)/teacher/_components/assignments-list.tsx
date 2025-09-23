"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { AssignmentType } from "../page";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type Lesson = {
  lessonName: string;
  taskDescription: string;
  images: string[];
};

function LessonItem({ lesson, index }: { lesson: Lesson; index: number }) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const hasImages = lesson.images && lesson.images.length > 0;

  return (
    <>
      <div
        className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-zoom-in"
        onClick={() => {
          if (hasImages) setOpen(true);
        }}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div className="flex-1">
            <p className="font-medium text-slate-900 text-sm sm:text-2xl">
              {index + 1}. {lesson.lessonName}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {lesson.taskDescription.length > 80
                ? `${lesson.taskDescription.substring(0, 80)}...`
                : lesson.taskDescription}
            </p>
          </div>
          {hasImages && (
            <div className="flex gap-1 sm:ml-3">
              {lesson.images.slice(0, 2).map((imageUrl, imgIndex) => (
                <Image
                  width={500}
                  height={300}
                  key={imgIndex}
                  src={imageUrl}
                  alt={`${lesson.lessonName} image ${imgIndex + 1}`}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded border border-slate-200 shadow-sm"
                />
              ))}
              {lesson.images.length > 2 && (
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded border border-slate-200 flex items-center justify-center">
                  <span className="text-xs text-cyan-700">
                    +{lesson.images.length - 2}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {hasImages && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-3xl bg-white p-4">
            <DialogTitle className="text-slate-900 mb-2">
              {lesson.lessonName}
            </DialogTitle>
            <div className="flex flex-col gap-3">
              <div className="relative w-full h-[60vh] bg-slate-100 rounded-md overflow-hidden">
                <Image
                  src={lesson.images[activeIndex]}
                  alt={lesson.lessonName}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              {lesson.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto py-1">
                  {lesson.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`relative w-16 h-16 rounded border ${
                        i === activeIndex
                          ? "border-cyan-600"
                          : "border-slate-200"
                      } overflow-hidden`}
                      aria-label={`preview image ${i + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`${lesson.lessonName} thumb ${i + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export function AssignmentsList({
  assignments,
  onEdit,
}: {
  assignments: AssignmentType[];
  onEdit: (a: AssignmentType) => void;
}) {
  if (assignments.length === 0) return <p>No assignments yet</p>;

  return (
    <>
      {assignments.reverse().map((a) => (
        <Card
          key={a._id}
          className="relative w-full cursor-pointer mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_-10px_rgba(14,165,233,0.35)]"
        >
          {/* top glow line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500" />
          <CardContent className="relative px-4 sm:px-6 py-0 sm:py-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
                  <h3 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-cyan-600 via-sky-500 to-fuchsia-600 bg-clip-text text-transparent">
                    📚 Даалгавар
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(a);
                    }}
                    className="text-xs sm:text-sm self-start sm:self-auto border-cyan-500/40 hover:border-cyan-500/70 bg-white hover:bg-cyan-50 text-cyan-700 hover:text-cyan-800"
                  >
                    ✏️ Засах
                  </Button>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  📅 Үүссэн: {new Date(a.createdAt).toLocaleDateString("mn-MN")}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs sm:text-sm text-slate-600">
                  🕒 Дуусах:{" "}
                  {new Date(a.taskEndSchedule).toLocaleDateString("mn-MN")}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">
                📖 Хичээлүүд ({a.lessons.length})
              </h4>
              <div className="space-y-2">
                {a.lessons.slice(0, 2).map((lesson, index) => (
                  <LessonItem
                    key={index}
                    lesson={lesson as Lesson}
                    index={index}
                  />
                ))}
                {a.lessons.length > 2 && (
                  <p className="text-xs sm:text-sm text-slate-600 text-center">
                    ... болон дахиад {a.lessons.length - 2} хичээл
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
