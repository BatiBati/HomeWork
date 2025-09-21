"use client";
import React, { useEffect, useState } from "react";
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
import { ChildrenType, useAuth } from "@/provider/AuthProvider";
import { AddStudentForm } from "./_components/add-student";
import { AddAssignmentForm } from "./_components/add-task";
import { useRouter } from "next/navigation";
import { api } from "../../../../axios";

export type LessonType = {
  lessonName: string;
  taskDescription: string;
  images: string[];
};

export type AssignmentType = {
  _id: string;
  teacher: string; // teacherId
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

  // const tasks = user.tasks ?? [];
  const students = user.children ?? [];

  // const totalHomeworksApproved = tasks.reduce((acc, task) => {
  //   const completed =
  //     task.homeworks?.filter((hw: HomeworkType) => hw.status === true).length ||
  //     0;
  //   return acc + completed;
  // }, 0);

  // const totalStudents = students.length * (tasks.length || 1);
  // const progress =
  //   totalStudents > 0
  //     ? Math.round((totalHomeworksApproved / totalStudents) * 100)
  //     : 0;

  return (
    <div className="w-screen flex justify-center">
      <div className="min-h-screen lg:w-[1024px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🍎 Teaching Hub
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-gray-600">Welcome, {user.firstName}! 🌞</p>
            <Button variant="outline">Sign Out</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-blue-100">
            <CardContent className="p-4 text-center">
              <p className="text-gray-700 font-semibold">👥 Нийт сурагчид</p>
              <p className="text-3xl font-bold">{students.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-100">
            <CardContent className="p-4 text-center">
              <p className="text-gray-700 font-semibold">
                📚 Идэвхитэй даалгаврууд
              </p>
              <p className="text-3xl font-bold">{assignments.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-100">
            <CardContent className="p-4 text-center">
              <p className="text-gray-700 font-semibold">📊 Даалгаварийн явц</p>
              {/* <p className="text-3xl font-bold">{progress}%</p> */}
            </CardContent>
          </Card>
        </div>

        {/* Add Student / Add Task */}
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
                  teacherId={user._id}
                  loading={loading}
                  setLoading={setLoading}
                />
              </DialogContent>
            </Dialog>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white hover:bg-gray-300 border-3">
                  + Даалгавар оруулах
                </Button>
              </DialogTrigger>
              <DialogContent>
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
        {assignments.length === 0 ? (
          <p>No assignments yet.</p>
        ) : (
          assignments.map((a) => (
            <Card
              key={a._id}
              className="w-full cursor-pointer hover:shadow-md transition mt-3"
              onClick={() => router.push(`/assignment/${a._id}`)}
            >
              <CardContent className="p-6">
                {/* Assignment Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">
                      📚 Даалгавар
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      📅 Үүссэн:{" "}
                      {new Date(a.createdAt).toLocaleDateString("mn-MN")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      🕒 Дуусах:
                      {new Date(a.taskEndSchedule).toLocaleDateString("mn-MN")}
                    </p>
                    <p className="text-xs text-gray-400">
                      ⏰
                      {new Date(a.taskEndSchedule).toLocaleTimeString("mn-MN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {/* Lessons Summary */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    📖 Хичээлүүд ({a.lessons.length})
                  </h4>
                  <div className="space-y-2">
                    {a.lessons.slice(0, 2).map((lesson, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">
                              {index + 1}. {lesson.lessonName}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {lesson.taskDescription.length > 100
                                ? `${lesson.taskDescription.substring(
                                    0,
                                    100
                                  )}...`
                                : lesson.taskDescription}
                            </p>
                          </div>
                          {lesson.images.length > 0 && (
                            <div className="ml-3 flex gap-1">
                              {lesson.images
                                .slice(0, 2)
                                .map((imageUrl, imgIndex) => (
                                  <img
                                    key={imgIndex}
                                    src={imageUrl}
                                    alt={`${lesson.lessonName} image ${
                                      imgIndex + 1
                                    }`}
                                    className="w-12 h-12 object-cover rounded border"
                                  />
                                ))}
                              {lesson.images.length > 2 && (
                                <div className="w-12 h-12 bg-gray-200 rounded border flex items-center justify-center">
                                  <span className="text-xs text-gray-500">
                                    +{lesson.images.length - 2}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {a.lessons.length > 2 && (
                      <p className="text-sm text-gray-500 text-center">
                        ... болон дахиад {a.lessons.length - 2} хичээл
                      </p>
                    )}
                  </div>
                </div>

                {/* Assignment Stats */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex gap-4 text-sm">
                    <span className="text-gray-600">
                      👶 Сурагч: {a.childrens.length}
                    </span>
                    <span className="text-gray-600">
                      🖼️ Зураг:{" "}
                      {a.lessons.reduce(
                        (total, lesson) => total + lesson.images.length,
                        0
                      )}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Хичээлийн явц: 0/{students.length}
                    </p>
                    <Progress value={0} className="h-2 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
        {/* Tasks List */}
        {/* {tasks.map((task) => {
          const completedCount =
            task.homeworks?.filter((hw: HomeworkType) => hw.status === true)
              .length || 0;
          const taskProgress =
            students.length > 0 ? (completedCount / students.length) * 100 : 0;

          return (
            <Card
              key={task._id}
              className="w-full cursor-pointer hover:shadow-md transition mt-5"
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
                    <Progress value={taskProgress} className="h-3 my-3" />
                    <p className="text-gray-500">
                      Хичээлийн явц: {completedCount}/{students.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })} */}
      </div>
    </div>
  );
}
// "use client";
// import React, { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useAuth, ChildrenType } from "@/provider/AuthProvider";
// import { useRouter } from "next/navigation";
// import { api } from "../../../../axios";

// export type AssignmentType = {
//   _id: string;
//   title: string;
//   description: string;
//   teacher: string; // teacherId
//   childrens: ChildrenType[];
//   createdAt: Date;
//   updatedAt: Date;
// };

// export default function TeacherDashboard() {
//   const { user, token } = useAuth();
//   const [assignments, setAssignments] = useState<AssignmentType[]>([]);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     if (!user?._id) return;

//     const fetchAssignments = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get<{
//           message: string;
//           assignments: AssignmentType[];
//         }>(`/assignment/get/${user._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAssignments(res.data.assignments || []);
//       } catch (err) {
//         console.error("Failed to fetch assignments", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssignments();
//   }, [user?._id, token]);

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="w-screen flex justify-center">
//       <div className="min-h-screen lg:w-[1024px] p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">🍎 Teaching Hub</h1>
//           <div className="flex items-center gap-4">
//             <p className="text-gray-600">Welcome, {user.firstName}! 🌞</p>
//             <Button variant="outline">Sign Out</Button>
//           </div>
//         </div>

//         <h2 className="text-xl font-bold mb-4">📝 Assignments</h2>

//         {loading ? (
//           <p>Loading assignments...</p>
//         ) : assignments.length === 0 ? (
//           <p>No assignments yet.</p>
//         ) : (
//           assignments.map((a) => (
//             <Card
//               key={a._id}
//               className="w-full cursor-pointer hover:shadow-md transition mt-3"
//               onClick={() => router.push(`/assignment/${a._id}`)}
//             >
//               <CardContent className="p-4">
//                 <h3 className="font-bold text-lg">{a.title}</h3>
//                 <p className="text-gray-600">{a.description}</p>
//                 <p className="text-sm text-gray-500 mt-2">
//                   👶 Children assigned: {a.childrens.length}
//                 </p>
//               </CardContent>
//             </Card>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
