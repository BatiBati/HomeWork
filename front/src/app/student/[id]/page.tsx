"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, ArrowLeft } from "lucide-react";
import { api } from "../../../../axios";
import { StudentType } from "@/provider/AuthProvider";

export default function StudentPage() {
  const router = useRouter();
  const params = useParams();
  const studentId = params.id;
  const [student, setStudent] = useState<StudentType>();

  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "submitted" | "not-submitted"
  >("all");

  // Backend-ээс мэдээлэл авах
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`/student/${studentId}`);

        setStudent(res.data);

        // setTasks();
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

  // Stats тооцоолох
  // const submittedCount = tasks.filter(
  //   (task) => task.homeworks?.[0]?.status
  // ).length;
  // const notSubmittedCount = tasks.length - submittedCount;

  // // Даалгавруудыг filter хийх
  // const filteredTasks = tasks.filter((task) => {
  //   if (activeFilter === "all") return true;
  //   const isSubmitted = task.homeworks?.[0]?.status;
  //   return activeFilter === "submitted" ? isSubmitted : !isSubmitted;
  // });
  console.log(student.homeworks, "student.homeworks");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center bg-white/95 backdrop-blur rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 border-0"
            >
              <ArrowLeft className="w-4 h-4" />
              Буцах
            </Button>
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">
                {student.parentname.charAt(0)}.{student.childname}
              </span>
            </div>
            <div className="w-12"></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Миний даалгаврууд
          </h1>
          <p className="text-lg text-gray-600">Бүх даалгавруудын жагсаалт</p>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-4 justify-center">
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
              <div className="text-xl font-bold">
                {student.homeworks.length}
              </div>
              <div className="text-sm text-gray-600">Илгээгдсэн</div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks List */}
        {student.homeworks.map((task) => {
          return (
            <Card
              key={task._id}
              className="w-full cursor-pointer hover:shadow-md transition"
            >
              <CardContent className="p-4 w-full">
                <div className="flex justify-between items-start">
                  <div className="w-full">
                    <h3 className="font-bold text-lg">{task.lessonName}</h3>
                    <div className="flex flex-wrap gap-2">
                      {task.image?.map((image, index) => {
                        return (
                          <img
                            key={index}
                            src={image}
                            alt={`${task.lessonName} зураг ${index + 1}`}
                            className="w-20 h-20 object-cover rounded"
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
