"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChildrenType, useAuth } from "@/provider/AuthProvider";
import { AddStudentForm } from "./_components/add-student";
import { AddAssignmentForm } from "./_components/add-task";
import { EditAssignmentForm } from "./_components/edit-task";
import { AssignmentsList } from "./_components/assignments-list";
import { useRouter } from "next/navigation";
import { api } from "../../../../axios";
import { TeacherChat } from "./_components/chat";

export type LessonType = {
  lessonName: string;
  taskDescription: string;
  images: string[];
};

export type AssignmentType = {
  _id: string;
  teacher: string;
  childrens: ChildrenType[];
  lessons: LessonType[];
  taskEndSchedule: Date;
  images: string[];
  publicLinks: Array<{
    token: string;
    sharedBy: "Teacher" | "Parent";
    expireAt: Date;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
};

export default function TeacherDashboard() {
  const [parentname, setParentname] = useState("");
  const [childname, setChildname] = useState("");
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] =
    useState<AssignmentType | null>(null);
  const { user, token } = useAuth();
  const router = useRouter();
  console.log(user);
  useEffect(() => {
    if (!user?._id) return;

    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const res = await api.get<{
          message: string;
          assignments: [];
        }>(`/assignment/get/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssignments(res.data.assignments || []);
      } catch (err) {
        console.error("Failed to fetch assignments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [user?._id, token]);

  if (!user) return <div>Loading...</div>;

  const students = user.children ?? [];

  return (
    <div className="relative w-screen flex justify-center overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-blue-200/60 to-violet-200/50 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-200/60 to-cyan-200/50 blur-3xl animate-pulse [animation-delay:400ms]"></div>
      </div>

      <div className="min-h-screen w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600">
              🍎 Teaching Hub
            </h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Welcome, {user.firstName}! 🌞
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="backdrop-blur supports-[backdrop-filter]:bg-white/50 text-sm sm:text-base"
            >
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
          <Card className="backdrop-blur supports-[backdrop-filter]:bg-white/60 border   transition will-change-transform hover:shadow-md hover:-translate-y-0.5">
            <CardContent className="p-4 sm:p-5 text-center">
              <p className="text-muted-foreground font-medium text-sm sm:text-base">
                👥 Нийт сурагчид
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-1">
                {students.length}
              </p>
            </CardContent>
          </Card>
          <Card className="backdrop-blur supports-[backdrop-filter]:bg-white/60 border  transition will-change-transform hover:shadow-md hover:-translate-y-0.5">
            <CardContent className="p-4 sm:p-5 text-center">
              <p className="text-muted-foreground font-medium text-sm sm:text-base">
                📚 Идэвхитэй даалгаврууд
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-1">
                {assignments.length}
              </p>
            </CardContent>
          </Card>
          <Card className="backdrop-blur supports-[backdrop-filter]:bg-white/60 border   transition will-change-transform hover:shadow-md hover:-translate-y-0.5">
            <CardContent className="p-4 sm:p-5 text-center">
              <Dialog>
                <DialogTrigger>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-1">
                    💬 Chat
                  </div>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-4xl h-[80vh]">
                  <DialogTitle>Messages</DialogTitle>
                  <TeacherChat />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        {/* Add Student / Add Task */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
            📝 гэрийн даалгаврууд ✨
          </h2>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  className="shadow-sm hover:-translate-y-0.5 transition will-change-transform text-sm sm:text-base"
                >
                  + Сурагч нэмэх
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md">
                <DialogHeader>
                  <DialogTitle>➕ Сурагч нэмэх</DialogTitle>
                </DialogHeader>
                <AddStudentForm
                  parentname={parentname}
                  setParentname={setParentname}
                  childname={childname}
                  setChildname={setChildname}
                  teacherId={user._id}
                  loading={loading}
                  setLoading={setLoading}
                />
              </DialogContent>
            </Dialog>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="shadow-sm hover:-translate-y-0.5 transition will-change-transform text-sm sm:text-base">
                  + Даалгавар оруулах
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>➕ Даалгавар нэмэх</DialogTitle>
                </DialogHeader>
                <AddAssignmentForm
                  teacherId={user._id}
                  token={token || ""}
                  onCreated={() => {
                    setIsDialogOpen(false);
                    router.refresh();
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <AssignmentsList
          assignments={assignments}
          onEdit={(a) => {
            setEditingAssignment(a);
            setIsEditDialogOpen(true);
          }}
        />

        {/* Edit Assignment Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>✏️ Даалгавар засах</DialogTitle>
            </DialogHeader>
            {editingAssignment && (
              <EditAssignmentForm
                assignment={editingAssignment}
                token={token || ""}
                onSuccess={(updated) => {
                  setIsEditDialogOpen(false);
                  setEditingAssignment(null);
                  setAssignments((prev) =>
                    prev.map((a) => (a._id === updated._id ? updated : a))
                  );
                }}
                onCancel={() => {
                  setIsEditDialogOpen(false);
                  setEditingAssignment(null);
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
