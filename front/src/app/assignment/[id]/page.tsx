"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  User,
  School,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { api } from "../../../../axios";
import { useParams } from "next/navigation";
import { AssignmentTypeee } from "@/provider/AuthProvider";
const formatDate = (dateStringOrDate: string | Date | undefined) => {
  if (!dateStringOrDate) return "-";
  const date =
    typeof dateStringOrDate === "string"
      ? new Date(dateStringOrDate)
      : dateStringOrDate;

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0-с эхэлдэг тул +1
  const day = date.getDate();

  return `${year} оны ${month} сарын ${day}`;
};

export default function AssignmentTask() {
  const { id } = useParams();
  const [data, setData] = useState<AssignmentTypeee>();
  const [activeLesson, setActiveLesson] = useState<number>(0); // default хамгийн эхний lesson
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // modal дотор ямар зураг идэвхтэй байгааг хадгалах

  const fetchTask = async () => {
    const response = await api.get(`/assignment/byId/${id}`);
    setData(response.data.assignment);
  };

  useEffect(() => {
    fetchTask();
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-xl">
        Loading assignment...
      </div>
    );
  }

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? data.lessons[activeLesson].images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === data.lessons[activeLesson].images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-2 text-gray-900 ">
          {data.teacher.school} сургуулийн {data.teacher.grade} ангийн гэрийн
          даалгавар
        </h1>
      </div>

      {/* Teacher Info */}
      <h2 className="text-3xl font-bold mb-6">
        Ангийн багш {data.teacher.firstName.charAt(0)}. {data.teacher.lastName}
      </h2>
      <h2 className="text-3xl font-bold mb-6">
        {formatDate(data.createdAt)} - {formatDate(data.taskEndSchedule)}
      </h2>

      <div className="flex flex-wrap gap-3 mb-8">
        {data.lessons.map((lesson, index) => (
          <span
            key={index}
            className={`px-4 py-2 rounded-full cursor-pointer text-white font-medium ${
              activeLesson === index
                ? "bg-blue-600"
                : "bg-gray-500 hover:bg-gray-700"
            } transition`}
            onClick={() => setActiveLesson(index)}
          >
            {lesson.lessonName}
          </span>
        ))}
      </div>

      {/* Active Lesson Info */}
      {activeLesson !== null && (
        <Card className="shadow-lg transition mb-8">
          <CardHeader className="bg-gray-100 p-6">
            <CardTitle className="text-2xl font-bold">
              {data.lessons[activeLesson].lessonName}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Images */}
            {data.lessons[activeLesson].images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.lessons[activeLesson].images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`homework-${idx}`}
                    className="rounded-xl border object-cover w-full h-60 cursor-pointer hover:scale-105 transition"
                    onClick={() => openModal(idx)}
                  />
                ))}
              </div>
            )}

            {/* Description */}
            <p className="text-lg text-gray-700">
              {data.lessons[activeLesson].taskDescription ||
                "No description provided."}
            </p>

            {/* Info */}
            <div className="flex flex-wrap gap-6 text-gray-600 text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Due: {formatDate(data.taskEndSchedule)}
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
      )}

      {/* Modal for images */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button
            className="absolute top-6 right-6 text-white"
            onClick={closeModal}
          >
            <X className="w-8 h-8" />
          </button>

          {data.lessons[activeLesson].images.length > 1 && (
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

          <img
            src={data.lessons[activeLesson].images[currentIndex]}
            alt={`modal-img-${currentIndex}`}
            className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain"
          />
        </div>
      )}
    </div>
  );
}
