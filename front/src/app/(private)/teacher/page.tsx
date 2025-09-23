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
import { TeacherDashboardSkeleton } from "./_components/skeleton";

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
  const [parentEmail, setParentEmail] = useState("");
  const [childname, setChildname] = useState("");
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] =
    useState<AssignmentType | null>(null);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "assignments" | "chat" | "students"
  >("assignments");
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
  if (!user || loading) {
    return <TeacherDashboardSkeleton />;
  }

  console.log(user);

  const students = user.children ?? [];

  return (
    <div className="relative w-screen flex justify-center  bg-gradient-to-br from-white to-slate-50">
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-blue-200/60 to-violet-200/50 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-200/60 to-cyan-200/50 blur-3xl animate-pulse [animation-delay:400ms]"></div>
      </div>

      <div className="min-h-screen w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-3 sm:mt-6">
        {/* Header moved into main content to align with sidebar layout */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-fuchsia-500 to-fuchsia-600">
              🎓 Teaching Hub
            </h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              Welcome, {user.firstName}! 🌞
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="text-sm sm:text-base border-cyan-500/40 hover:border-cyan-500/70 bg-white hover:bg-cyan-50 text-cyan-700 hover:text-cyan-800"
            >
              Sign Out
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-4 sm:gap-6 mb-6 sm:mb-8 items-start">
          <aside className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
            <div className="space-y-2">
              <button
                className={`w-full text-left rounded-lg p-3 border transition hover:bg-cyan-50 ${
                  activeTab === "assignments"
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-slate-200 bg-white"
                }`}
                onClick={() => setActiveTab("assignments")}
              >
                <div className="text-slate-600 text-sm">📚 Даалгаврууд</div>
                <div className="text-2xl font-extrabold text-slate-900">
                  {assignments.length}
                </div>
              </button>
              <button
                className={`w-full text-left rounded-lg p-3 border transition hover:bg-cyan-50 ${
                  activeTab === "students"
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-slate-200 bg-white"
                }`}
                onClick={() => setActiveTab("students")}
              >
                <div className="text-slate-600 text-sm">👥 Нийт сурагчид</div>
                <div className="text-2xl font-extrabold text-slate-900">
                  {students.length}
                </div>
              </button>
              <button
                className={`w-full text-left rounded-lg p-3 border transition hover:bg-cyan-50 ${
                  activeTab === "chat"
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-slate-200 bg-white"
                }`}
                onClick={() => setActiveTab("chat")}
              >
                <div className="text-xl font-extrabold text-slate-900">
                  💬 Чат
                </div>
              </button>
            </div>
          </aside>

          <div>
            {activeTab === "assignments" && (
              <>
                {/* Add Student / Add Task */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-sky-500 to-fuchsia-600">
                    📝 Гэрийн даалгаврууд ✨
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Dialog
                      open={isAddStudentOpen}
                      onOpenChange={(open) => {
                        setIsAddStudentOpen(open);
                        if (!open) {
                          setParentEmail("");
                          setChildname("");
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="secondary"
                          className="shadow-sm hover:-translate-y-0.5 transition will-change-transform text-sm sm:text-base border border-cyan-500/40 hover:border-cyan-500/70 bg-white hover:bg-cyan-50 text-cyan-700 hover:text-cyan-800"
                        >
                          + Сурагч нэмэх
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-[95vw] max-w-md bg-white border border-slate-200 rounded-xl">
                        <DialogHeader>
                          <DialogTitle>➕ Сурагч нэмэх</DialogTitle>
                        </DialogHeader>
                        <AddStudentForm
                          parentEmail={parentEmail}
                          setParentEmail={setParentEmail}
                          childname={childname}
                          setChildname={setChildname}
                          teacherId={user._id}
                          loading={loading}
                          setLoading={setLoading}
                          onCreated={() => {
                            setIsAddStudentOpen(false);
                            setParentEmail("");
                            setChildname("");
                          }}
                        />
                      </DialogContent>
                    </Dialog>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="shadow-sm hover:-translate-y-0.5 transition will-change-transform text-sm sm:text-base border border-cyan-500/40 hover:border-cyan-500/70 bg-white hover:bg-cyan-50 text-cyan-700 hover:text-cyan-800">
                          + Даалгавар оруулах
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-xl">
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
              </>
            )}

            {activeTab === "chat" && (
              <Card className="rounded-2xl border border-slate-200 bg-white">
                <CardContent className="p-0 sm:p-4">
                  <div className="p-4 border-b">
                    <h2 className="text-lg sm:text-xl font-bold text-cyan-600">
                      💬 Chat
                    </h2>
                  </div>
                  <div className="p-2 sm:p-4">
                    <TeacherChat />
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "students" && (
              <Card className="rounded-2xl border border-slate-200 bg-white">
                <CardContent className="p-0 sm:p-4">
                  <div className="p-4 border-b">
                    <h2 className="text-lg sm:text-xl font-bold text-cyan-600">
                      👥 Нийт сурагчид
                    </h2>
                  </div>
                  <div className="p-2 sm:p-4">
                    <ul className="divide-y divide-slate-200">
                      {students.map((s) => (
                        <li
                          key={s._id}
                          className="py-3 flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium text-slate-900">
                              {s.firstName} {s.lastName}
                            </p>
                            <p className="text-xs text-slate-500">
                              {s.school} • {s.grade}
                            </p>
                          </div>
                        </li>
                      ))}
                      {students.length === 0 && (
                        <li className="py-6 text-slate-500 text-sm">
                          Сурагч байхгүй байна.
                        </li>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* moved above into main-content section */}

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
