"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  User,
  School,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { api } from "../../../../axios";
import { useParams } from "next/navigation";
import { AssignmentTypeee } from "@/provider/AuthProvider";

export default function AssignmentTask() {
  const { id } = useParams();
  const [data, setData] = useState<AssignmentTypeee>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchTask = async () => {
    const response = await api.get(`/assignment/get/${id}`);
    setData(response.data.assignments);
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const openModal = (images: string[], index: number) => {
    setCurrentImages(images);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-xl">
        Loading assignment...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-2 text-gray-900">
          📚 My Homework
        </h1>
        <p className="text-lg text-gray-500">Click images to enlarge</p>
      </div>

      {/* Teacher Info */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card className="shadow-lg hover:shadow-xl transition p-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-600">
              👩‍🏫 Teacher Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-gray-500" />
              <span className="text-xl font-medium text-gray-800">
                {data.teacher.firstName} {data.teacher.lastName}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <School className="w-6 h-6 text-gray-500" />
              <span className="text-xl font-medium text-gray-800">
                {data.teacher.school} - {data.teacher.grade}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Homework List */}
      <div className="grid lg:grid-cols-2 gap-8">
        {data.lessons.map((lesson, index) => (
          <Card
            key={index}
            className="shadow-lg hover:shadow-2xl transition overflow-hidden"
          >
            <CardHeader className="bg-gray-100 p-6">
              <CardTitle className="text-2xl font-bold">
                {lesson.lessonName}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Images */}
              {lesson.images.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {lesson.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`homework-${idx}`}
                      className="rounded-xl border object-cover w-full h-60 cursor-pointer hover:scale-105 transition"
                      onClick={() => openModal(lesson.images, idx)}
                    />
                  ))}
                </div>
              )}

              {/* Description */}
              <p className="text-lg text-gray-700">
                {lesson.taskDescription || "No description provided."}
              </p>

              {/* Info */}
              <div className="flex flex-wrap gap-6 text-gray-600 text-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Due:{" "}
                  {typeof data.taskEndSchedule === "string"
                    ? new Date(data.taskEndSchedule).toLocaleDateString()
                    : data.taskEndSchedule?.toLocaleDateString?.() || "-"}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {data.teacher.firstName}
                </div>
                <div className="flex items-center gap-2">
                  <School className="w-5 h-5" />
                  {data.teacher.school}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {data.lessons.length === 0 && (
          <div className="flex items-center justify-center h-64 col-span-2 text-gray-400 text-xl">
            No homework found.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button
            className="absolute top-6 right-6 text-white"
            onClick={closeModal}
          >
            <X className="w-8 h-8" />
          </button>

          <button className="absolute left-6 text-white" onClick={prevImage}>
            <ChevronLeft className="w-10 h-10" />
          </button>

          <img
            src={currentImages[currentIndex]}
            alt={`modal-img-${currentIndex}`}
            className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain"
          />

          <button className="absolute right-6 text-white" onClick={nextImage}>
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </div>
  );
}
