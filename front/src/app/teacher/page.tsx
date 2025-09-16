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
import { api } from "../../../axios";
import { useAuth } from "@/provider/AuthProvider";
import { AddStudentForm } from "./_components/add-student";

export default function TeacherDashboard() {
  const [selectedStudent, setSelectedStudent] = useState<{
    name: string;
    status: string;
    assignment: string;
  } | null>(null);
  const [parentname, setParentname] = useState("");
  const [childname, setChildname] = useState("");
  const [loading, setLoading] = useState(false);

  const { teacher, token } = useAuth();
  const [loadingTask, setLoadingTask] = useState(false);
  const [lessonName, setLessonName] = useState("");
  const [image, setImage] = useState("");
  const [homeWork, setHomeWork] = useState("");
  const [taskEndSchedule, setTaskEndSchedule] = useState("");
  console.log(teacher);
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacher?._id || !token) return;

    setLoadingTask(true);
    try {
      const res = await api.post(
        "/task/create",
        {
          lessonName,
          image,
          homeWork,
          taskEndSchedule,
          teacherId: teacher._id, // send teacher ID
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(res.data.message || "Task created successfully!");

      // Optional: reset form fields
      setLessonName("");
      setImage("");
      setHomeWork("");
      setTaskEndSchedule("");
    } catch (err) {
      console.error(err);
      alert("Error creating task");
    } finally {
      setLoadingTask(false);
    }
  };

  if (loading) return <div> loading</div>;
  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🍎 Teaching Hub
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-gray-600">Welcome, {teacher?.teacherName}! 🌞</p>
          <Button variant="outline">Sign Out</Button>
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
        <Card className="bg-green-100">
          <CardContent className="p-4 text-center">
            <p className="text-gray-700 font-semibold">
              📚 Идэвхитэй даалгаврууд
            </p>
            <p className="text-3xl font-bold">{teacher?.tasks.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-pink-100">
          <CardContent className="p-4 text-center">
            <p className="text-gray-700 font-semibold">📊 Даалгаварийн явц</p>
            <p className="text-3xl font-bold">76%</p>
          </CardContent>
        </Card>
      </div>

      {/* Assignments and Add Student */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📝 гэрийн даалгаврууд ✨</h2>
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600">
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
              <Button className="bg-green-500 hover:bg-green-600">
                + Даалгавар оруулах
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>➕ Даалгавар нэмэх</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleCreateTask}>
                <div>
                  <label>Lesson Name</label>
                  <input
                    type="text"
                    value={lessonName}
                    onChange={(e) => setLessonName(e.target.value)}
                    required
                    className="w-full border rounded p-1"
                  />
                </div>
                <div>
                  <label>Image URL</label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full border rounded p-1"
                  />
                </div>
                <div>
                  <label>Homework Description</label>
                  <textarea
                    value={homeWork}
                    onChange={(e) => setHomeWork(e.target.value)}
                    className="w-full border rounded p-1"
                    required
                  />
                </div>
                <div>
                  <label>Task End Date</label>
                  <input
                    type="datetime-local"
                    value={taskEndSchedule}
                    onChange={(e) => setTaskEndSchedule(e.target.value)}
                    required
                    className="w-full border rounded p-1"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={loadingTask}>
                    {loadingTask ? "Creating..." : "Create Task"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {teacher?.tasks.map((task, idx) => (
        <Card key={idx} className="w-full">
          <CardContent className="p-4 w-full">
            <div className="flex justify-between items-start">
              <div className="w-full">
                <h3 className="font-bold text-lg">{task.lessonName}</h3>
                <p className="text-gray-600">
                  📚 Subject: {/* if you have subject in task */} • 📅 Due:{" "}
                  {new Date(task.taskEndSchedule).toLocaleDateString()}
                </p>
                <Progress value={0} className="h-3 my-3" />

                <p className="text-gray-500">{/* show completion text */}</p>
              </div>
              {/* rest of your card content remains the same */}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Student Modal */}
      <Dialog
        open={!!selectedStudent}
        onOpenChange={() => setSelectedStudent(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedStudent?.name}'s Submission</DialogTitle>
          </DialogHeader>
          <p className="text-gray-700">
            Assignment: <strong>{selectedStudent?.assignment}</strong>
          </p>
          <p className="mt-2">
            Status:{" "}
            <span className="font-semibold">{selectedStudent?.status}</span>
          </p>
          <div className="mt-4">
            <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              🖼️ Assignment Preview Here
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
//    {/* Assignment Cards */}
//       <div className="space-y-4">
//         {assignments.map((a, idx) => (
//           <Card key={idx}>
//             <CardContent className="p-4">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="font-bold text-lg">{a.title}</h3>
//                   <p className="text-gray-600">
//                     📚 Subject: {a.subject} • 📅 Due: {a.due}
//                   </p>
//                   <Progress value={a.completion} className="h-3 my-3" />
//                   <p className="text-gray-500">
//                     {a.completion}% completion rate
//                   </p>
//                 </div>
//                 <div className="flex flex-col items-end gap-2">
//                   <span className="text-green-600 text-sm">
//                     {a.completed} completed
//                   </span>
//                   <div className="flex gap-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() =>
//                         setOpenIndex(openIndex === idx ? null : idx)
//                       }
//                     >
//                       {openIndex === idx ? "Hide Details" : "View Details"}
//                     </Button>
//                     <Button variant="secondary" size="sm">
//                       Edit
//                     </Button>
//                   </div>
//                 </div>
//               </div>

//               {/* Student List */}
//               {openIndex === idx && (
//                 <div className="mt-4 border-t pt-3 space-y-2 max-h-[300px] overflow-y-auto">
//                   {a.students.map((s, i) => (
//                     <div
//                       key={i}
//                       className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
//                       onClick={() =>
//                         setSelectedStudent({ ...s, assignment: a.title })
//                       }
//                     >
//                       <span className="font-medium">{s.name}</span>
//                       <span className="text-sm text-gray-600">{s.status}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         ))}
//       </div>
