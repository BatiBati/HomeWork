"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { AssignmentType } from "../page";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AddAssignmentForm } from "./add-task";

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
        className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
        onClick={() => {
          if (hasImages) setOpen(true);
        }}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div className="flex-1">
            <p className="font-medium text-slate-900 text-base sm:text-lg">
              {index + 1}. {lesson.lessonName}
            </p>
            <p className="text-sm text-slate-600 mt-1">
              {lesson.taskDescription.length > 80
                ? `${lesson.taskDescription.substring(0, 80)}...`
                : lesson.taskDescription}
            </p>
          </div>

          {hasImages && (
            <div className="flex gap-2 sm:ml-3">
              {lesson.images.slice(0, 2).map((imageUrl, imgIndex) => (
                <Image
                  key={imgIndex}
                  src={imageUrl}
                  alt={`${lesson.lessonName} image ${imgIndex + 1}`}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-cover rounded-md border border-slate-200 shadow-sm"
                />
              ))}
              {lesson.images.length > 2 && (
                <div className="w-12 h-12 bg-slate-100 rounded-md border border-slate-200 flex items-center justify-center">
                  <span className="text-xs font-medium text-cyan-700">
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
            <DialogTitle className="text-slate-900 mb-3 text-lg font-semibold">
              {lesson.lessonName}
            </DialogTitle>

            <div className="flex flex-col gap-3">
              <div className="relative w-full h-[70vh] bg-slate-100 rounded-lg overflow-hidden">
                <Image
                  src={lesson.images[activeIndex]}
                  alt={lesson.lessonName}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {lesson.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto py-2">
                  {lesson.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`relative w-16 h-16 rounded-md border transition-all ${
                        i === activeIndex
                          ? "border-cyan-600 ring-2 ring-cyan-300"
                          : "border-slate-200 hover:border-cyan-400"
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
  teacherId,
  token,
  onCreated,
}: {
  assignments: AssignmentType[];
  onEdit: (a: AssignmentType) => void;
  teacherId?: string;
  token?: string;
  onCreated?: () => void;
}) {
  const todayStr = new Date().toLocaleDateString("mn-MN");
  const todaysAssignments = assignments.filter(
    (a) => new Date(a.createdAt).toLocaleDateString("mn-MN") === todayStr
  );
  const previousAssignments = assignments.filter(
    (a) => new Date(a.createdAt).toLocaleDateString("mn-MN") !== todayStr
  );

  if (assignments.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="font-semibold text-slate-800 text-lg mb-2">
          📚 Даалгавар
        </h3>
        <p className="text-sm text-slate-600 mb-3">Одоогоор даалгавар алга.</p>
        {teacherId && token && (
          <AddAssignmentForm
            teacherId={teacherId}
            token={token}
            assignments={assignments}
            onCreated={onCreated}
          />
        )}
      </div>
    );
  }

  const renderCard = (a: AssignmentType) => (
    <Card
      key={a._id}
      className="relative w-full cursor-pointer mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-[#61b3ae]" />
      <CardContent className="relative px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              📚
              <h4 className="font-bold text-[20px] bg-[#61b3ae] bg-clip-text text-transparent">
                Даалгавар
              </h4>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(a);
            }}
            className="text-xs sm:text-sm border-cyan-500/40 hover:border-cyan-500/70 bg-white hover:bg-cyan-50 text-cyan-700 hover:text-cyan-800"
          >
            Засах
          </Button>
        </div>

        <div>
          <h4 className="font-semibold text-slate-800 mb-2 text-base">
            Хичээлүүд ({a.lessons.length})
          </h4>
          <div className="space-y-2">
            {a.lessons.slice(0, 2).map((lesson, index) => (
              <LessonItem key={index} lesson={lesson as Lesson} index={index} />
            ))}
            {a.lessons.length > 2 && (
              <p className="text-sm text-slate-600 text-center">
                ... болон дахиад {a.lessons.length - 2} хичээл
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 border-t pt-2">
          <p className="text-xs text-slate-400">
            Үүссэн: {new Date(a.createdAt).toLocaleDateString("mn-MN")}
          </p>
        </div>
      </CardContent>
    </Card>
  );

  if (todaysAssignments.length > 0) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-emerald-700 font-medium">
          Өнөөдөр даалгавар үүссэн байна.
        </p>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="space-y-6">
            <div>
              <div className="font-semibold text-slate-800 mb-2">
                Өнөөдрийн даалгавар
              </div>
              {todaysAssignments
                .slice()
                .reverse()
                .map((a) => renderCard(a))}
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 text-lg mb-3">
                ⏳ Өмнөх даалгаврууд
              </h3>
              {previousAssignments.length === 0 ? (
                <p className="text-sm text-slate-600">Өмнөх даалгавар алга.</p>
              ) : (
                <div className="space-y-6">
                  {Object.entries(
                    previousAssignments.reduce(
                      (acc: Record<string, AssignmentType[]>, a) => {
                        const d = new Date(a.createdAt);
                        const key = `${d.getFullYear()}-${String(
                          d.getMonth() + 1
                        ).padStart(2, "0")}`;
                        if (!acc[key]) acc[key] = [];
                        acc[key].push(a);
                        return acc;
                      },
                      {}
                    )
                  )
                    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
                    .map(([ym, list]) => (
                      <div key={ym} className="space-y-2">
                        {(list as AssignmentType[])
                          .slice()
                          .reverse()
                          .map((a) => renderCard(a))}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <h3 className="font-semibold text-slate-800 text-lg">
            📅 Өнөөдрийн даалгавар — {todayStr}
          </h3>
        </div>
        <p className="text-sm text-slate-600 mb-3">
          Өнөөдөр хараахан даалгавар алга. Шинээр оруулна уу.
        </p>
        {teacherId && token && (
          <AddAssignmentForm
            teacherId={teacherId}
            token={token}
            assignments={assignments}
            onCreated={onCreated}
          />
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="font-semibold text-slate-800 text-lg mb-3">
          ⏳ Өмнөх даалгаврууд
        </h3>
        {previousAssignments.length === 0 ? (
          <p className="text-sm text-slate-600">Өмнөх даалгавар алга.</p>
        ) : (
          <div className="space-y-6">
            {Object.entries(
              previousAssignments.reduce(
                (acc: Record<string, AssignmentType[]>, a) => {
                  const d = new Date(a.createdAt);
                  const key = `${d.getFullYear()}-${String(
                    d.getMonth() + 1
                  ).padStart(2, "0")}`;
                  if (!acc[key]) acc[key] = [];
                  acc[key].push(a);
                  return acc;
                },
                {}
              )
            )
              .sort((a, b) => (a[0] < b[0] ? 1 : -1))
              .map(([ym, list]) => (
                <div key={ym} className="space-y-2">
                  {(list as AssignmentType[])
                    .slice()
                    .reverse()
                    .map((a) => renderCard(a))}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
