"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useAuth } from "@/provider/AuthProvider";
import { api } from "../../../../../axios";
import { AssignmentType } from "../page";
interface Lesson {
  lessonName: string;
  taskDescription: string;
  images: File[];
  previewUrls: string[];
}

export function AddAssignmentForm({
  teacherId,
  token,
  assignments,
  onCreated,
}: {
  teacherId: string;
  token: string;
  assignments: AssignmentType[];
  onCreated?: () => void;
}) {
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      lessonName: "",
      taskDescription: "",
      images: [],
      previewUrls: [],
    },
  ]);
  const today = new Date();
  const todayStr = today.toLocaleDateString("mn-MN");

  // Өнөөдөр үүссэн даалгаварууд
  const todaysAssignments = assignments.filter(
    (a) => new Date(a.createdAt).toLocaleDateString("mn-MN") === todayStr
  );
  const lessonNameArray = [
    "Математик",
    "Англи хэл",
    "Монгол хэл",
    "Байгалийн ухаан",
    "Нийгмийн ухаан",
  ];
  console.log(todaysAssignments);
  const [loading, setLoading] = useState(false);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const { getMe } = useAuth();
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    lessonIndex: number
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setLessons((prev) => {
        const updatedLessons = [...prev];
        updatedLessons[lessonIndex] = {
          ...updatedLessons[lessonIndex],
          images: [...updatedLessons[lessonIndex].images, ...files],
          previewUrls: [
            ...updatedLessons[lessonIndex].previewUrls,
            ...files.map((file) => URL.createObjectURL(file)),
          ],
        };
        return updatedLessons;
      });
    }
  };

  const removeImage = (lessonIndex: number, imageIndex: number) => {
    setLessons((prev) => {
      const updatedLessons = [...prev];
      const lesson = updatedLessons[lessonIndex];

      // Remove the image and preview URL at the same index
      const newImages = lesson.images.filter((_, i) => i !== imageIndex);
      const newPreviewUrls = lesson.previewUrls.filter(
        (_, i) => i !== imageIndex
      );

      updatedLessons[lessonIndex] = {
        ...lesson,
        images: newImages,
        previewUrls: newPreviewUrls,
      };

      return updatedLessons;
    });
  };

  const uploadImagesToCloudinary = async (files: File[]) => {
    // Check if Cloudinary is configured
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      console.error(
        "❌ Cloudinary configuration missing. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in your .env.local file"
      );
      toast.error("Image upload not configured. Please contact administrator.");
      return [];
    }

    console.log("🔧 Cloudinary config:", { cloudName, uploadPreset });

    const uploadedUrls: string[] = [];
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: formData }
        );

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Cloudinary upload error response:", errorText);
          throw new Error(
            `Upload failed: ${res.status} ${res.statusText} - ${errorText}`
          );
        }

        const data = await res.json();
        console.log("Cloudinary upload success:", data);
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        } else {
          console.error("Upload response missing secure_url:", data);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error(
          `Failed to upload image: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }
    return uploadedUrls;
  };

  const addLesson = () => {
    setLessons((prev) => {
      const newLessons = [
        ...prev,
        {
          lessonName: "",
          taskDescription: "",
          images: [],
          previewUrls: [],
        },
      ];
      // Navigate to the new lesson (last index)
      setCurrentLessonIndex(newLessons.length - 1);
      return newLessons;
    });
  };

  const removeLesson = (index: number) => {
    if (lessons.length > 1) {
      setLessons((prev) => {
        const newLessons = prev.filter((_, i) => i !== index);
        // Adjust current index if necessary
        if (currentLessonIndex >= newLessons.length) {
          setCurrentLessonIndex(Math.max(0, newLessons.length - 1));
        } else if (currentLessonIndex > index) {
          setCurrentLessonIndex(currentLessonIndex - 1);
        }
        return newLessons;
      });
    }
  };

  const nextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const prevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const goToLesson = (index: number) => {
    setCurrentLessonIndex(index);
  };

  const updateLesson = (
    index: number,
    field: keyof Lesson,
    value: string | File[] | string[]
  ) => {
    setLessons((prev) => {
      const updatedLessons = [...prev];
      updatedLessons[index] = {
        ...updatedLessons[index],
        [field]: value,
      };
      return updatedLessons;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherId || !token) return;

    setLoading(true);
    try {
      // Upload images for each lesson (if any images selected)
      const lessonsWithImages = await Promise.all(
        lessons.map(async (lesson) => {
          let uploadedUrls: string[] = [];

          if (lesson.images.length > 0) {
            uploadedUrls = await uploadImagesToCloudinary(lesson.images);
          }

          return {
            lessonName: lesson.lessonName,
            taskDescription: lesson.taskDescription,
            images: uploadedUrls,
          };
        })
      );

      // Flatten all images from all lessons
      const allImages = lessonsWithImages.flatMap((lesson) => lesson.images);

      const res = await api.post(
        `assignment/`,
        {
          teacher: teacherId, // login-оос ирсэн _id
          lessons: lessonsWithImages,
          images: allImages, // Backend expects this field
          publicLinks: [], // Backend expects this field (can be empty for now)
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 🔑 энд JWT заавал дамжуулна
          },
        }
      );

      console.log("✅ API Response:", res.data);
      toast.success("Assignment created successfully!");

      // Reset form
      setLessons([
        {
          lessonName: "",
          taskDescription: "",
          images: [],
          previewUrls: [],
        },
      ]);

      setCurrentLessonIndex(0); // Reset carousel to first lesson

      // Close the form/dialog
      if (onCreated) {
        onCreated();
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error(
        "❌ Error creating assignment:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Error creating assignment");
    } finally {
      setLoading(false);
      getMe();
    }
  };

  return (
    <>
      <form className="space-y-2 sm:space-y-4 w-full" onSubmit={handleSubmit}>
        {/* Lesson Carousel */}
        <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
          {/* Carousel Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-3 sm:p-4 border-b bg-card">
            <h3 className="text-base sm:text-lg font-semibold">
              Хичээл {currentLessonIndex + 1} / {lessons.length}
            </h3>
            <div className="flex items-center gap-2">
              {lessons.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeLesson(currentLessonIndex)}
                  className="text-red-600 hover:text-red-800 text-xs sm:text-sm"
                >
                  ✕ Устгах
                </Button>
              )}
            </div>
          </div>

          {/* Carousel Content */}
          <div className="relative p-4 sm:p-6">
            <div className="transition-all duration-300 ease-in-out">
              {lessons.map((lesson, lessonIndex) => (
                <div
                  key={lessonIndex}
                  className={`${
                    lessonIndex === currentLessonIndex ? "block" : "hidden"
                  } space-y-4`}
                >
                  <div>
                    <label className="block mb-1 text-sm font-medium text-muted-foreground">
                      Хичээлийн нэр
                    </label>
                    <div className="w-full flex flex-wrap gap-2 text-[12px] font-bold">
                      {lessonNameArray.map((item, index) => {
                        const isSelected = lesson.lessonName === item;

                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() =>
                              updateLesson(
                                lessonIndex,
                                "lessonName",
                                isSelected ? "" : item // хэрэв сонгосон бол → хоосолно
                              )
                            }
                            className={`px-3 py-1 rounded-full border transition ${
                              isSelected
                                ? "bg-fuchsia-600 text-white border-fuchsia-600"
                                : "hover:bg-blue-100 border-gray-300"
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-muted-foreground">
                      Даалгаварийн дэлгэрэнгүй
                    </label>
                    <textarea
                      value={lesson.taskDescription}
                      onChange={(e) =>
                        updateLesson(
                          lessonIndex,
                          "taskDescription",
                          e.target.value
                        )
                      }
                      required
                      className="w-full border border-input rounded-lg p-2 sm:p-3 bg-background shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-sm sm:text-base"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Зураг оруулах
                    </label>
                    <div className="flex gap-1">
                      <label
                        htmlFor={`file-upload-${lessonIndex}`}
                        className="w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition"
                      >
                        {/* Icon */}
                        <div className="flex flex-col items-center  text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mb-0 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </div>
                      </label>

                      <input
                        id={`file-upload-${lessonIndex}`}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, lessonIndex)}
                        className="hidden"
                      />
                      {lesson.previewUrls.length > 0 && (
                        <div>
                          <div className="flex flex-wrap gap-2 border-l-1 pl-1">
                            {lesson.previewUrls.map((url, i) => (
                              <div key={i} className="relative">
                                <Image
                                  src={url}
                                  alt="preview"
                                  width={80}
                                  height={80}
                                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border cursor-zoom-in"
                                  onClick={() => setPreviewImageUrl(url)}
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 p-0 text-xs"
                                  onClick={() => removeImage(lessonIndex, i)}
                                >
                                  ✕
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      Олон зураг сонгож болно
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addLesson}
                      className="flex items-center gap-2 text-sm sm:text-base"
                    >
                      + Хичээл нэмэх
                    </Button>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="shadow-sm text-sm sm:text-base"
                    >
                      {loading ? "Үүсгэж байна..." : "Даалгавар үүсгэх"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {lessons.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevLesson}
                  disabled={currentLessonIndex === 0}
                  className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-background border rounded-full p-1.5 sm:p-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={nextLesson}
                  disabled={currentLessonIndex === lessons.length - 1}
                  className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-background border rounded-full p-1.5 sm:p-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  →
                </button>
              </>
            )}
          </div>

          {/* Pagination Dots */}
          {lessons.length > 1 && (
            <div className="flex justify-center gap-2 p-3 sm:p-4 border-t bg-card">
              {lessons.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToLesson(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                    index === currentLessonIndex
                      ? "bg-blue-600 scale-110"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </form>
      <Dialog
        open={!!previewImageUrl}
        onOpenChange={() => setPreviewImageUrl(null)}
      >
        <DialogContent className="w-[95vw] max-w-3xl">
          <DialogHeader>
            <DialogTitle className="sr-only">
              Зургийн урьдчилсан харагдац
            </DialogTitle>
          </DialogHeader>
          {previewImageUrl && (
            <Image
              src={previewImageUrl}
              alt="preview"
              width={800}
              height={600}
              className="w-full h-auto rounded"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

// Simple fullscreen image preview dialog
// Placed after the component return using a fragment isn't applicable here; we add it at end of file
