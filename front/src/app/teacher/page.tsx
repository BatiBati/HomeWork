"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/provider/AuthProvider";
import { AddStudentForm } from "./_components/add-student";
import { useRouter } from "next/navigation";
import { AddTaskForm } from "./_components/add-task";

export default function TeacherDashboard() {
  const [parentname, setParentname] = useState("");
  const [childname, setChildname] = useState("");
  const [loading, setLoading] = useState(false);
  const { teacher, token, logout } = useAuth();
  const router = useRouter();
  console.log(teacher);

  if (loading) return <div> loading</div>;
  const totalHomeworksApproved =
    teacher?.tasks.reduce((acc, task) => {
      const completed =
        task.homeworks?.filter((hw) => hw.status === true).length || 0;
      return acc + completed;
    }, 0) || 0;

  const totalStudents =
    (teacher?.students?.length || 0) * (teacher?.tasks.length || 1);

  const progress =
    totalStudents > 0
      ? Math.round((totalHomeworksApproved / totalStudents) * 100)
      : 0;

  return (
    <div className="w-screen flex justify-center">
      <div className="min-h-screen lg:w-[1024px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🍎 Teaching Hub
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-gray-600">Welcome, {teacher?.teacherName}! 🌞</p>
            <Button onClick={logout} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-blue-100">
            <CardContent className="p-4 text-center">
              <p className="text-gray-700 font-semibold">👥 Нийт сурагчид</p>
              <p className="text-3xl font-bold">{teacher?.students.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-100">
            <CardContent className="p-4 text-center">
              <p className="text-gray-700 font-semibold">
                📚 Идэвхитэй даалгаврууд
              </p>
              <p className="text-3xl font-bold">{teacher?.tasks.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-100">
            <CardContent className="p-4 text-center">
              <p className="text-gray-700 font-semibold">📊 Даалгаварийн явц</p>
              <p className="text-3xl font-bold">{progress}%</p>
            </CardContent>
          </Card>
        </div>
        {/* Assignments and Add Student */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">📝 гэрийн даалгаврууд ✨</h2>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-white hover:bg-gray-300 border-3">
                  + Сурагч нэмэх
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>➕ Сурагч нэмэх</DialogTitle>
                </DialogHeader>
                <AddStudentForm
                  parentname={parentname}
                  setParentname={setParentname}
                  childname={childname}
                  setChildname={setChildname}
                  teacherId={teacher?._id || ""}
                  loading={loading}
                  setLoading={setLoading}
                />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-white hover:bg-gray-300 border-3">
                  + Даалгавар оруулах
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>➕ Даалгавар нэмэх</DialogTitle>
                </DialogHeader>
                <AddTaskForm
                  teacherId={teacher?._id || ""}
                  token={token || ""}
                  onCreated={() => router.refresh()}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {teacher?.tasks.map((task, idx) => {
          const totalStudents = teacher.students.length;
          const completedCount =
            task.homeworks?.filter((hw) => hw.status === true).length || 0;
          console.log("count", completedCount);

          const progress =
            totalStudents > 0 ? (completedCount / totalStudents) * 100 : 0;

          return (
            <Card
              key={idx}
              className="w-full cursor-pointer hover:shadow-md transition"
              onClick={() => router.push(`/task/${task._id}`)}
            >
              <CardContent className="p-4 w-full">
                <div className="flex justify-between items-start">
                  <div className="w-full">
                    <h3 className="font-bold text-lg">{task.lessonName}</h3>
                    <p className="text-gray-600">
                      📚 Subject: {task.lessonName || "-"} • 📅 Due:{" "}
                      {new Date(task.taskEndSchedule).toLocaleDateString()}
                    </p>
                    <Progress value={progress} className="h-3 my-3" />
                    <p className="text-gray-500">
                      Хичээлийн явц: {completedCount}/{totalStudents}
                    </p>
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
