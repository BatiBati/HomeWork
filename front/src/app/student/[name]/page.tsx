"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Calendar, Clock, ArrowLeft } from "lucide-react";

interface Student {
  id: string;
  childName: string;
  parentName: string;
  homework: { taskId: string; completed: boolean }[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  createdAt: Date;
}

interface Submission {
  id: string;
  taskId: string;
  studentId: string;
  studentName: string;
  imageUrl: string;
  submittedAt: Date;
  isCompleted?: boolean;
}

export default function StudentPage() {
  const params = useParams();
  const studentName = decodeURIComponent(params.name as string);
  console.log("Decoded student name:", studentName);
  const [student, setStudent] = useState<Student | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "submitted" | "not-submitted"
  >("all");

  const formatStudentName = (student: Student) => {
    const parentInitial = student.parentName.charAt(0);
    return `${parentInitial}.${student.childName}`;
  };

  const formatMongolianDate = (date: Date) => {
    const weekdays = [
      "Ням",
      "Даваа",
      "Мягмар",
      "Лхагва",
      "Пүрэв",
      "Баасан",
      "Бямба",
    ];

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const weekday = weekdays[date.getDay()];

    return `${year}-${month}-${day} ${weekday}`;
  };

  useEffect(() => {
    const mockStudents: Student[] = [
      {
        id: "student-1",
        childName: "Батбаяр",
        parentName: "Батбаатар",
        homework: [
          { taskId: "task-1", completed: true },
          { taskId: "task-2", completed: true },
          { taskId: "task-3", completed: false },
        ],
      },
      {
        id: "student-2",
        childName: "Сара",
        parentName: "Сараа",
        homework: [
          { taskId: "task-1", completed: false },
          { taskId: "task-2", completed: false },
        ],
      },
      {
        id: "student-3",
        childName: "Төмөр",
        parentName: "Төмөрбаатар",
        homework: [
          { taskId: "task-1", completed: false },
          { taskId: "task-4", completed: true },
        ],
      },
      {
        id: "student-4",
        childName: "Цагаан",
        parentName: "Цагаанбат",
        homework: [
          { taskId: "task-2", completed: false },
          { taskId: "task-3", completed: false },
        ],
      },
      {
        id: "student-5",
        childName: "Оюун",
        parentName: "Оюунцэцэг",
        homework: [
          { taskId: "task-1", completed: true },
          { taskId: "task-5", completed: false },
        ],
      },
      {
        id: "student-6",
        childName: "Батцэцэг",
        parentName: "Батбаатар",
        homework: [],
      },
      {
        id: "student-7",
        childName: "Энхбаяр",
        parentName: "Энхбаатар",
        homework: [],
      },
      {
        id: "student-8",
        childName: "Мөнхбаяр",
        parentName: "Мөнхбаатар",
        homework: [],
      },
      {
        id: "student-9",
        childName: "Цэцэг",
        parentName: "Цэцэгмаа",
        homework: [],
      },
      {
        id: "student-10",
        childName: "Батбат",
        parentName: "Батбаатар",
        homework: [],
      },
      {
        id: "student-11",
        childName: "Сайхан",
        parentName: "Сайханбаатар",
        homework: [],
      },
      {
        id: "student-12",
        childName: "Алтанцэцэг",
        parentName: "Алтанбаатар",
        homework: [],
      },
      {
        id: "student-13",
        childName: "Мөнхбат",
        parentName: "Мөнхбаатар",
        homework: [],
      },
      {
        id: "student-14",
        childName: "Цагаанбат",
        parentName: "Цагаанбаатар",
        homework: [],
      },
      {
        id: "student-15",
        childName: "Баттулга",
        parentName: "Батбаатар",
        homework: [],
      },
      {
        id: "student-16",
        childName: "Энхтуяа",
        parentName: "Энхбаатар",
        homework: [],
      },
      {
        id: "student-17",
        childName: "Мөнхцэцэг",
        parentName: "Мөнхбаатар",
        homework: [],
      },
      {
        id: "student-18",
        childName: "Батмөнх",
        parentName: "Батбаатар",
        homework: [],
      },
      {
        id: "student-19",
        childName: "Цэцэгмаа",
        parentName: "Цэцэгбаатар",
        homework: [],
      },
      {
        id: "student-20",
        childName: "Батбаатар",
        parentName: "Батбаатар",
        homework: [],
      },
      {
        id: "student-21",
        childName: "Энхжаргал",
        parentName: "Энхбаатар",
        homework: [],
      },
      {
        id: "student-22",
        childName: "Мөнхцэцэг",
        parentName: "Мөнхбаатар",
        homework: [],
      },
      {
        id: "student-23",
        childName: "Батбаяр",
        parentName: "Батбаатар",
        homework: [],
      },
      {
        id: "student-24",
        childName: "Сараа",
        parentName: "Сараабаатар",
        homework: [],
      },
      {
        id: "student-25",
        childName: "Төмөрбаатар",
        parentName: "Төмөрбаатар",
        homework: [],
      },
    ];

    const mockTasks: Task[] = [
      {
        id: "task-1",
        title: "Математикийн даалгавар",
        description:
          "Дараах жишээнүүдийг шийдэж, зурагаар харуулна уу: 1) 25 + 37 = ? 2) 48 - 19 = ? 3) 6 × 7 = ?",
        imageUrl:
          "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&h=300&fit=crop",
        createdAt: new Date("2024-01-15"),
      },
      {
        id: "task-2",
        title: "Монгол хэлний даалгавар",
        description:
          "Өгүүлбэр зохиож, зурагаар дүрслэн харуулна уу. Сэдэв: 'Миний гэр бүл'",
        imageUrl:
          "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=300&fit=crop",
        createdAt: new Date("2024-01-16"),
      },
      {
        id: "task-3",
        title: "Англи хэлний даалгавар",
        description: "Animals тухай 10 үг бичиж, зурагаар харуулна уу",
        imageUrl:
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop",
        createdAt: new Date("2024-01-17"),
      },
      {
        id: "task-4",
        title: "Байгалийн ухааны даалгавар",
        description: "Усны мөчлөгийг зурагаар тайлбарлана уу",
        imageUrl:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop",
        createdAt: new Date("2024-01-18"),
      },
      {
        id: "task-5",
        title: "Түүхийн даалгавар",
        description: "Чингис хааны тухай 5 баримт бичиж харуулна уу",
        imageUrl:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
        createdAt: new Date("2024-01-19"),
      },
    ];

    const mockSubmissions: Submission[] = [
      // Батбаяр (student-1) submissions
      {
        id: "sub-1",
        taskId: "task-1",
        studentId: "student-1",
        studentName: "Б.Батбаяр",
        imageUrl:
          "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&h=300&fit=crop",
        submittedAt: new Date("2024-01-15T10:30:00"),
        isCompleted: true,
      },
      {
        id: "sub-2",
        taskId: "task-2",
        studentId: "student-1",
        studentName: "Б.Батбаяр",
        imageUrl:
          "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=300&fit=crop",
        submittedAt: new Date("2024-01-16T09:15:00"),
        isCompleted: true,
      },
      // task-3 is assigned but NOT submitted yet (will show as "Илгээгдээгүй")

      // Сара (student-2) submissions
      {
        id: "sub-3",
        taskId: "task-1",
        studentId: "student-2",
        studentName: "С.Сара",
        imageUrl:
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop",
        submittedAt: new Date("2024-01-15T14:20:00"),
        isCompleted: false,
      },
      // task-2 is assigned but NOT submitted yet (will show as "Илгээгдээгүй")

      // Төмөр (student-3) submissions
      {
        id: "sub-4",
        taskId: "task-4",
        studentId: "student-3",
        studentName: "Т.Төмөр",
        imageUrl:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop",
        submittedAt: new Date("2024-01-18T11:45:00"),
        isCompleted: true,
      },
      // task-1 is assigned but NOT submitted yet (will show as "Илгээгдээгүй")

      // Цагаан (student-4) - no submissions yet (all tasks will show as "Илгээгдээгүй")

      // Оюун (student-5) submissions
      {
        id: "sub-5",
        taskId: "task-1",
        studentId: "student-5",
        studentName: "О.Оюун",
        imageUrl:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
        submittedAt: new Date("2024-01-19T08:30:00"),
        isCompleted: true,
      },
      // task-5 is assigned but NOT submitted yet (will show as "Илгээгдээгүй")
    ];

    // Find the current student
    console.log("Looking for student:", studentName);
    console.log(
      "Available students:",
      mockStudents.map((s) => formatStudentName(s))
    );
    const currentStudent =
      mockStudents.find((s) => formatStudentName(s) === studentName) || null;
    console.log("Found student:", currentStudent);
    setStudent(currentStudent);
    setTasks(mockTasks);
    setSubmissions(mockSubmissions);
    setLoading(false);
  }, [studentName]);

  const getTaskStatus = (taskId: string) => {
    if (!student) {
      return {
        status: "not-submitted",
        text: "Илгээгдээгүй",
        color: "bg-orange-100 text-orange-800",
      };
    }

    // Check if there's a submission for this task
    const submission = submissions.find(
      (sub) => sub.taskId === taskId && sub.studentId === student.id
    );

    if (!submission) {
      return {
        status: "not-submitted",
        text: "Илгээгдээгүй",
        color: "bg-orange-100 text-orange-800",
      };
    }

    return {
      status: "submitted",
      text: "Илгээгдсэн",
      color: "bg-blue-100 text-blue-800",
    };
  };

  const getFilteredTasks = () => {
    if (activeFilter === "all") {
      return tasks;
    }

    return tasks.filter((task) => {
      const status = getTaskStatus(task.id);
      return status.status === activeFilter;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Ачааллаж байна...</div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-purple-600 flex items-center justify-center p-4">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-1 sm:p-4">
      <div className="max-w-6xl mx-auto space-y-2 sm:space-y-6">
        {/* Header */}
        <div className="text-center bg-white/95 backdrop-blur rounded-xl p-3 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <Button
              onClick={() => window.history.back()}
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-base px-1 sm:px-4 py-0.5 sm:py-2 border-0"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Буцах</span>
            </Button>
            <div className="flex items-center gap-1 sm:gap-3">
              <User className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
              <span className="text-xs sm:text-xl font-bold text-gray-800">
                {formatStudentName(student)}
              </span>
            </div>
            <div className="w-6 sm:w-12"></div>
          </div>
          <h1 className="text-base sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
            Миний даалгаврууд
          </h1>
          <p className="text-xs sm:text-lg text-gray-600">
            Бүх даалгавруудын жагсаалт
          </p>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-2 sm:gap-4 justify-center">
          <Card
            className={`shadow-xl border-0 backdrop-blur cursor-pointer transition-all flex-1  hover:scale-105 ${
              activeFilter === "all"
                ? "bg-blue-100/95 border-2 border-blue-300"
                : "bg-white/95 hover:bg-blue-50/95"
            }`}
            onClick={() => setActiveFilter("all")}
          >
            <CardContent className="p-1 sm:p-2 text-center">
              <div className="text-lg sm:text-2xl mb-1">📚</div>
              <div
                className={`text-sm sm:text-xl font-bold ${
                  activeFilter === "all" ? "text-blue-700" : "text-blue-600"
                }`}
              >
                {tasks.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Нийт</div>
            </CardContent>
          </Card>
          <Card
            className={`shadow-xl border-0 backdrop-blur cursor-pointer transition-all flex-1  hover:scale-105 ${
              activeFilter === "submitted"
                ? "bg-blue-100/95 border-2 border-blue-300"
                : "bg-white/95 hover:bg-blue-50/95"
            }`}
            onClick={() => setActiveFilter("submitted")}
          >
            <CardContent className="p-1 sm:p-2 text-center">
              <div className="text-lg sm:text-2xl mb-1">📤</div>
              <div
                className={`text-sm sm:text-xl font-bold ${
                  activeFilter === "submitted"
                    ? "text-blue-700"
                    : "text-blue-600"
                }`}
              >
                {
                  submissions.filter((sub) => sub.studentId === student?.id)
                    .length
                }
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Илгээгдсэн</div>
            </CardContent>
          </Card>
          <Card
            className={`shadow-xl border-0 backdrop-blur cursor-pointer transition-all flex-1 hover:scale-105 ${
              activeFilter === "not-submitted"
                ? "bg-orange-100/95 border-2 border-orange-300"
                : "bg-white/95 hover:bg-orange-50/95"
            }`}
            onClick={() => setActiveFilter("not-submitted")}
          >
            <CardContent className="p-1 sm:p-2 text-center">
              <div className="text-lg sm:text-2xl mb-1">⏰</div>
              <div
                className={`text-sm sm:text-xl font-bold ${
                  activeFilter === "not-submitted"
                    ? "text-orange-700"
                    : "text-orange-600"
                }`}
              >
                {tasks.length -
                  submissions.filter((sub) => sub.studentId === student?.id)
                    .length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Илгээгдээгүй
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks List */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calendar className="w-6 h-6 text-blue-500 sm:text-sm" />
              <span className="text-[14px] sm:text-xl">
                Даалгаврууд ({getFilteredTasks().length})
              </span>
              {activeFilter !== "all" && (
                <span
                  className={`px-3 py-1 rounded-full text-[10px] text-center sm:text-sm font-medium ${
                    activeFilter === "submitted"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {activeFilter === "submitted" ? "Илгээгдсэн" : "Хийх ёстой"}
                </span>
              )}
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4">
              {getFilteredTasks()
                .sort((a, b) => {
                  const statusA = getTaskStatus(a.id);
                  const statusB = getTaskStatus(b.id);

                  // Priority order: Not Submitted > Submitted
                  const priority: Record<string, number> = {
                    "not-submitted": 0,
                    submitted: 1,
                  };

                  // First sort by status priority
                  const statusDiff =
                    priority[statusA.status] - priority[statusB.status];
                  if (statusDiff !== 0) {
                    return statusDiff;
                  }

                  // Within same status, sort by date (newest first)
                  return b.createdAt.getTime() - a.createdAt.getTime();
                })
                .map((task) => (
                  <div
                    key={task.id}
                    className="border border-gray-200 rounded-2xl hover:border-blue-300 transition-colors bg-white/80 backdrop-blur"
                  >
                    <div className="flex flex-col h-full">
                      {/* Image on top */}
                      {task.imageUrl && (
                        <img
                          src={task.imageUrl}
                          alt="Даалгаврын зураг"
                          className="w-full h-30 sm:h-50 object-cover rounded-t-2xl shadow-sm"
                        />
                      )}

                      {/* Content below */}
                      <div className="flex-1 p-2 sm:p-3 flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-xs sm:text-sm text-blue-600 line-clamp-1 flex-1">
                            {task.title}
                          </h3>
                          <div
                            className={`px-1 py-0.5 rounded text-xs font-medium ml-1 ${
                              getTaskStatus(task.id).color
                            }`}
                          >
                            {getTaskStatus(task.id).text}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mb-1">
                          {formatMongolianDate(task.createdAt)}
                        </div>
                        <p className="text-gray-700 text-xs mb-2 line-clamp-2 flex-1">
                          {task.description}
                        </p>
                        <Button
                          onClick={() => {
                            window.location.href = `/student/${formatStudentName(
                              student
                            )}/task/${task.id}`;
                          }}
                          size="sm"
                          className="w-full bg-green-500 hover:bg-green-600 text-white text-xs py-1 mt-auto"
                        >
                          Дэлгэрэнгүй
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
