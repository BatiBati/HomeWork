"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { api } from "../../../../../axios";
import type { AssignmentType, LessonType } from "../page";

export function EditAssignmentForm({
  assignment,
  token,
  onSuccess,
  onCancel,
}: {
  assignment: AssignmentType;
  token: string;
  onSuccess: (updated: AssignmentType) => void;
  onCancel: () => void;
}) {
  const [lessons, setLessons] = useState<LessonType[]>(assignment.lessons);
  const [taskEndSchedule, setTaskEndSchedule] = useState(
    new Date(assignment.taskEndSchedule).toISOString().slice(0, 16)
  );
  const [loading, setLoading] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const addLesson = () => {
    setLessons([
      ...lessons,
      {
        lessonName: "",
        taskDescription: "",
        images: [],
      },
    ]);
  };

  const removeLesson = (index: number) => {
    if (lessons.length > 1) {
      setLessons(lessons.filter((_, i) => i !== index));
    }
  };

  const updateLesson = (
    index: number,
    field: keyof LessonType,
    value: string
  ) => {
    setLessons(
      lessons.map((lesson, i) =>
        i === index ? { ...lesson, [field]: value } : lesson
      )
    );
  };

  const removeImage = (lessonIndex: number, imageIndex: number) => {
    setLessons(
      lessons.map((lesson, i) =>
        i === lessonIndex
          ? {
              ...lesson,
              images: lesson.images.filter(
                (_, imgIdx) => imgIdx !== imageIndex
              ),
            }
          : lesson
      )
    );
  };

  const handleImageChange = (
    lessonIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setLessons(
      lessons.map((lesson, i) =>
        i === lessonIndex
          ? { ...lesson, images: [...lesson.images, ...newImages] }
          : lesson
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.patch<{ assignment: AssignmentType }>(
        `/assignment/${assignment._id}`,
        {
          lessons,
          taskEndSchedule,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updated = res.data?.assignment ?? assignment;
      onSuccess(updated as AssignmentType);
    } catch (error) {
      console.error("Error updating assignment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="taskEndSchedule">Даалгавар дуусах хугацаа</Label>
          <input
            id="taskEndSchedule"
            type="datetime-local"
            value={taskEndSchedule}
            onChange={(e) => setTaskEndSchedule(e.target.value)}
            className="w-full border rounded p-2 mt-1"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">
              Хичээлүүд ({lessons.length})
            </h3>
            <Button type="button" variant="outline" onClick={addLesson}>
              + Хичээл нэмэх
            </Button>
          </div>

          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium">Хичээл {index + 1}</h4>
                  {lessons.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeLesson(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ✕ Устгах
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor={`lessonName-${index}`}>Хичээлийн нэр</Label>
                    <select
                      id={`lessonName-${index}`}
                      value={lesson.lessonName}
                      onChange={(e) =>
                        updateLesson(index, "lessonName", e.target.value)
                      }
                      className="w-full border rounded p-2 mt-1"
                      required
                    >
                      <option value="">-Хичээл сонгох-</option>
                      <option value="Математик">Математик</option>
                      <option value="Англи хэл">Англи хэл</option>
                      <option value="Монгол хэл">Монгол хэл</option>
                      <option value="Байгалийн ухаан">Байгалийн ухаан</option>
                      <option value="Нийгмийн ухаан">Нийгмийн ухаан</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor={`taskDescription-${index}`}>
                      Даалгаварийн дэлгэрэнгүй
                    </Label>
                    <textarea
                      id={`taskDescription-${index}`}
                      value={lesson.taskDescription}
                      onChange={(e) =>
                        updateLesson(index, "taskDescription", e.target.value)
                      }
                      className="mt-1 w-full border rounded p-2"
                      rows={3}
                      required
                    />
                  </div>

                  {lesson.images && lesson.images.length > 0 && (
                    <div>
                      <Label>Одоогийн зурагууд ({lesson.images.length})</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {lesson.images.map((imageUrl, imgIndex) => (
                          <div key={imgIndex} className="relative">
                            <Image
                              width={500}
                              height={300}
                              src={imageUrl}
                              alt={`${lesson.lessonName} image ${imgIndex + 1}`}
                              className="w-20 h-20 object-cover rounded border cursor-zoom-in"
                              onClick={() => setPreviewImageUrl(imageUrl)}
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 w-6 h-6 p-0 text-xs"
                              onClick={() => removeImage(index, imgIndex)}
                            >
                              ✕
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor={`images-${index}`}>Шинэ зураг нэмэх</Label>
                    <input
                      id={`images-${index}`}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageChange(index, e)}
                      className="mt-1 w-full border rounded p-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Олон зураг сонгож болно
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Цуцлах
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Хадгалж байна..." : "Хадгалах"}
          </Button>
        </div>
      </form>

      {previewImageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setPreviewImageUrl(null)}
        >
          <Image
            width={1000}
            height={700}
            src={previewImageUrl}
            alt="preview"
            className="w-full max-w-3xl h-auto rounded"
          />
        </div>
      )}
    </>
  );
}
