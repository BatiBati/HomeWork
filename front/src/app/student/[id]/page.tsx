"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "../../../../axios";
import { StudentType } from "@/provider/AuthProvider";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { StudentHeader } from "@/components/student/studentHeader";

export default function StudentPage() {
  const params = useParams();
  const studentId = params.id;
  const [student, setStudent] = useState<StudentType>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "submitted" | "not-submitted"
  >("all");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`/student/${studentId}`);

        setStudent(res.data);
      } catch (error) {
        console.error(error);
        setStudent(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
        <div className="text-white text-2xl font-bold">Ачааллаж байна...</div>
      </div>
    );
  }
  console.log(student, "student");

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 via-pink-500 to-purple-600">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur text-center">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Сурагч олдсонгүй
            </h1>
            <p className="text-gray-600">
              Энэ холбоос буруу эсвэл сурагч устгагдсан байна.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const submittedCount =
    student.homeworks?.filter((hw) => hw.status).length || 0;
  const totalCount = student.homeworks?.length || 0;
  const notSubmittedCount = totalCount - submittedCount;

  const filteredHomeworks =
    student.homeworks?.filter((homework) => {
      if (activeFilter === "all") return true;
      return activeFilter === "submitted" ? homework.status : !homework.status;
    }) || [];

  console.log(student.homeworks, "student.homeworks");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <StudentHeader student={student} />
        <div className="flex gap-4 justify-center">
          <Card
            className={`flex-1 text-center cursor-pointer transition-all hover:scale-105 ${
              activeFilter === "all"
                ? "bg-blue-100 border-2 border-blue-300"
                : "bg-white/95"
            }`}
            onClick={() => setActiveFilter("all")}
          >
            <CardContent className="p-2">
              <div className="text-2xl mb-1">📚</div>
              <div className="text-xl font-bold">{totalCount}</div>
              <div className="text-sm text-gray-600">Нийт</div>
            </CardContent>
          </Card>

          <Card
            className={`flex-1 text-center cursor-pointer transition-all hover:scale-105 ${
              activeFilter === "submitted"
                ? "bg-blue-100 border-2 border-blue-300"
                : "bg-white/95"
            }`}
            onClick={() => setActiveFilter("submitted")}
          >
            <CardContent className="p-2">
              <div className="text-2xl mb-1">📤</div>
              <div className="text-xl font-bold">{submittedCount}</div>
              <div className="text-sm text-gray-600">Илгээгдсэн</div>
            </CardContent>
          </Card>

          <Card
            className={`flex-1 text-center cursor-pointer transition-all hover:scale-105 ${
              activeFilter === "not-submitted"
                ? "bg-orange-100 border-2 border-orange-300"
                : "bg-white/95"
            }`}
            onClick={() => setActiveFilter("not-submitted")}
          >
            <CardContent className="p-2">
              <div className="text-2xl mb-1">⏰</div>
              <div className="text-xl font-bold">{notSubmittedCount}</div>
              <div className="text-sm text-gray-600">Илгээгдээгүй</div>
            </CardContent>
          </Card>
        </div>

        {filteredHomeworks.map((homework) => {
          return (
            <Card
              key={homework._id}
              className="w-full cursor-pointer hover:shadow-md transition"
            >
              <CardContent className="p-4 w-full">
                <div className="flex justify-between items-start">
                  <div className="w-full">
                    <h3 className="font-bold text-lg">{homework.lessonName}</h3>
                    <p className="text-gray-600 mb-2">{homework.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {homework.image?.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${homework.lessonName} зураг ${index + 1}`}
                          className="w-20 h-20 object-cover rounded cursor-pointer"
                          onClick={() => setSelectedImage(image)}
                        />
                      ))}
                    </div>
                    <div className="mt-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          homework.status
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {homework.status ? "Илгээгдсэн" : "Илгээгдээгүй"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-[1280px] w-full mx-auto p-0 bg-transparent flex justify-center border-0 shadow-none items-center h-fit">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Enlarged"
              className="max-w-[95%] max-h-[90vh] object-contain rounded shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
