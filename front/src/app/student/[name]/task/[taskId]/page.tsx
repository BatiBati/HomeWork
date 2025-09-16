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
import { ArrowLeft, Upload, CheckCircle, Edit, Trash2 } from "lucide-react";

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

export default function TaskDetailPage() {
  const params = useParams();
  const studentName = decodeURIComponent(params.name as string);
  const taskId = params.taskId as string;

  const [student, setStudent] = useState<Student | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [submissionImage, setSubmissionImage] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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
        homework: [],
      },
      {
        id: "student-4",
        childName: "Цагаан",
        parentName: "Цагаанбат",
        homework: [],
      },
      {
        id: "student-5",
        childName: "Оюун",
        parentName: "Оюунцэцэг",
        homework: [],
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
    ];

    // Find the current student and task
    const currentStudent = mockStudents.find(
      (s) => formatStudentName(s) === studentName
    );
    const currentTask = mockTasks.find((t) => t.id === taskId);

    // Check if student has already submitted this task
    const existingSubmission = mockSubmissions.find(
      (sub) => sub.taskId === taskId && sub.studentId === currentStudent?.id
    );

    setStudent(currentStudent || null);
    setTask(currentTask || null);
    setSubmission(existingSubmission || null);
    setIsSubmitted(!!existingSubmission);
    setLoading(false);
  }, [studentName, taskId]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSubmissionImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (submissionImage && task && student) {
      const newSubmission: Submission = {
        id: `sub-${Date.now()}`,
        taskId: task.id,
        studentId: student.id,
        studentName: formatStudentName(student),
        imageUrl: submissionImage,
        submittedAt: new Date(),
        isCompleted: false, // Initially not completed, teacher will mark as completed
      };

      // Mark the task as completed in the student's homework
      const updatedStudent = {
        ...student,
        homework: student.homework.map((hw) =>
          hw.taskId === task.id ? { ...hw, completed: true } : hw
        ),
      };

      setStudent(updatedStudent);
      setSubmission(newSubmission);
      setIsSubmitted(true);
      setIsEditing(false);
      alert("Даалгавар амжилттай илгээгдлээ!");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSubmissionImage(submission?.imageUrl || "");
  };

  const handleDelete = () => {
    if (confirm("Та энэ даалгаврыг устгахдаа итгэлтэй байна уу?")) {
      setSubmission(null);
      setIsSubmitted(false);
      setIsEditing(false);
      setSubmissionImage("");
      alert("Даалгавар амжилттай устгагдлаа!");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSubmissionImage("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Ачааллаж байна...</div>
      </div>
    );
  }

  if (!student || !task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-purple-600 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur text-center">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Даалгавар олдсонгүй
            </h1>
            <p className="text-gray-600">
              Энэ холбоос буруу эсвэл даалгавар устгагдсан байна.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-2 sm:p-4">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-2">
        {/* Header */}
        <div className="text-center bg-white/95 backdrop-blur rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-base px-2 sm:px-4 py-1 sm:py-2"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Буцах</span>
            </Button>
            <div className="text-center">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
                {formatStudentName(student)}
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Даалгаврын дэлгэрэнгүй
              </p>
            </div>
            <div className="w-8 sm:w-12"></div>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur p-6 sm:p-6 gap-[0px]">
          <CardHeader className="p-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-0 sm:gap-4">
              <div className="flex-1">
                <CardTitle className="text-lg sm:text-2xl text-blue-600 mb-1 sm:mb-2">
                  {task.title}
                </CardTitle>
                <CardDescription className="text-sm sm:text-lg">
                  {formatMongolianDate(task.createdAt)}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 p-0">
            {/* Task Description */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-0 text-gray-800">
                Даалгаврын тайлбар:
              </h3>
              <p className="text-gray-700 text-sm sm:text-lg leading-relaxed">
                {task.description}
              </p>
            </div>

            {task.imageUrl && (
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-base sm:text-lg mb-0 text-gray-800">
                  Даалгаврын зураг:
                </h3>
                <img
                  src={task.imageUrl}
                  alt="Даалгаврын зураг"
                  className="w-full  mx-auto rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Submission Section */}
            <div className="border-t pt-0">
              <h3 className="font-semibold text-base sm:text-lg mb-0 text-gray-800">
                Хийсэн даалгаврыг илгээх:
              </h3>

              {isSubmitted ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="text-center p-4 sm:p-6 bg-green-50 rounded-lg border-2 border-green-200">
                    <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-green-500 mx-auto mb-2 sm:mb-3" />
                    <h4 className="text-base sm:text-lg font-semibold text-green-700 mb-1 sm:mb-2">
                      Даалгавар амжилттай илгээгдлээ!
                    </h4>
                    <p className="text-sm sm:text-base text-green-600 mb-2 sm:mb-3">
                      Таны даалгаврыг багш шалгаж үзэх болно.
                    </p>
                    {submission?.submittedAt && (
                      <p className="text-xs sm:text-sm text-gray-600">
                        Илгээсэн огноо:{" "}
                        {formatMongolianDate(submission.submittedAt)}{" "}
                        {submission.submittedAt.toLocaleTimeString("mn-MN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>

                  {submission?.imageUrl && (
                    <div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2 sm:gap-0">
                        <h4 className="font-semibold text-base sm:text-lg text-gray-800">
                          Илгээсэн зураг:
                        </h4>
                        <div className="flex gap-1 sm:gap-2">
                          <Button
                            onClick={handleEdit}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3"
                          >
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                            Засах
                          </Button>
                          <Button
                            onClick={handleDelete}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm px-2 sm:px-3"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                            Устгах
                          </Button>
                        </div>
                      </div>
                      <img
                        src={submission.imageUrl}
                        alt="Илгээсэн даалгавар"
                        className="w-full max-w-md mx-auto rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4 ">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 sm:p-4 text-center">
                    {submissionImage ? (
                      <div className="space-y-2">
                        <img
                          src={submissionImage}
                          alt="Илгээх зураг"
                          className="w-full max-w-xs mx-auto rounded-lg shadow-md"
                        />
                        <Button
                          onClick={() => setSubmissionImage("")}
                          variant="outline"
                          size="sm"
                          className="text-xs px-2 py-1"
                        >
                          Зураг солих
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2 w-full">
                        <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1">
                            {isEditing
                              ? "Шинэ зураг сонгоно уу"
                              : "Хийсэн даалгаврын зурагаа оруулна уу"}
                          </p>
                          <p className="text-xs text-gray-500">
                            JPG, PNG, GIF форматын зураг зөвшөөрнө
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="inline-block bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm cursor-pointer hover:bg-blue-600 transition-colors"
                        >
                          Зураг сонгох
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex gap-2 sm:gap-3 w-50">
                      {isEditing && (
                        <Button
                          onClick={handleCancelEdit}
                          variant="outline"
                          className="flex-1 text-sm sm:text-base py-2 sm:py-3"
                        >
                          Цуцлах
                        </Button>
                      )}
                      <Button
                        onClick={handleSubmit}
                        disabled={!submissionImage}
                        className={`w-full bg-green-500 hover:bg-green-600 text-white text-sm sm:text-lg py-2 sm:py-3 disabled:bg-gray-300 disabled:text-gray-500 ${
                          isEditing ? "flex-1" : "w-full"
                        }`}
                      >
                        {isEditing ? "Шинэчлэх" : "Даалгавар илгээх"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
