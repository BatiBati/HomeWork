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
import { ChildrenType, HomeworkType, useAuth } from "@/provider/AuthProvider";
import { AddStudentForm } from "./_components/add-student";
import { AddTaskForm } from "./_components/add-task";
import { useRouter } from "next/navigation";
import { api } from "../../../../axios";

export type AssignmentType = {
  _id: string;
  title: string;
  lessons: string[];
  description: string;
  teacher: string; // teacherId
  childrens: ChildrenType[];
  createdAt: Date;
  updatedAt: Date;
};

export default function TeacherDashboard() {
  const [parentname, setParentname] = useState("");
  const [childname, setChildname] = useState("");
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  const [loading, setLoading] = useState(false);
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
                {/* <AddStudentForm
                  parentname={parentname}
                  setParentname={setParentname}
                  childname={childname}
                  setChildname={setChildname}
                  teacherId={teacher._id}
                  loading={loading}
                  setLoading={setLoading}
                /> */}
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
                {/* <AddTaskForm
                  teacherId={teacher._id}
                  token={token || ""}
                  onCreated={() => router.refresh()}
                /> */}
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
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">{a.title}</h3>
                <p className="text-gray-600">{a.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  📅 :{" "}
                  {new Date(a.createdAt).toLocaleDateString("GB-en", {
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
                <Progress value={0} className="h-3 my-3" />
                <p className="text-gray-500">
                  Хичээлийн явц: {}/{students.length}
                </p>
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
