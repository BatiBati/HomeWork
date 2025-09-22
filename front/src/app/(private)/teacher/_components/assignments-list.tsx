"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { AssignmentType } from "../page";

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
          className="w-full cursor-pointer hover:shadow-md transition mt-4"
        >
          <CardContent className="px-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-bold text-xl text-gray-800">
                    📚 Даалгавар
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(a);
                    }}
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  >
                    ✏️ Засах
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  📅 Үүссэн: {new Date(a.createdAt).toLocaleDateString("mn-MN")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  🕒 Дуусах:{" "}
                  {new Date(a.taskEndSchedule).toLocaleDateString("mn-MN")}
                </p>
                <p className="text-xs text-gray-400">
                  ⏰
                  {new Date(a.taskEndSchedule).toLocaleTimeString("mn-MN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">
                📖 Хичээлүүд ({a.lessons.length})
              </h4>
              <div className="space-y-2">
                {a.lessons.slice(0, 2).map((lesson, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {index + 1}. {lesson.lessonName}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {lesson.taskDescription.length > 100
                            ? `${lesson.taskDescription.substring(0, 100)}...`
                            : lesson.taskDescription}
                        </p>
                      </div>
                      {lesson.images.length > 0 && (
                        <div className="ml-3 flex gap-1">
                          {lesson.images
                            .slice(0, 2)
                            .map((imageUrl, imgIndex) => (
                              <Image
                                width={500}
                                height={300}
                                key={imgIndex}
                                src={imageUrl}
                                alt={`${lesson.lessonName} image ${
                                  imgIndex + 1
                                }`}
                                className="w-12 h-12 object-cover rounded border"
                              />
                            ))}
                          {lesson.images.length > 2 && (
                            <div className="w-12 h-12 bg-gray-200 rounded border flex items-center justify-center">
                              <span className="text-xs text-gray-500">
                                +{lesson.images.length - 2}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {a.lessons.length > 2 && (
                  <p className="text-sm text-gray-500 text-center">
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
