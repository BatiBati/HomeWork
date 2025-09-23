"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// import { Textarea } from "@/components/ui/textarea";
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

      <div className="min-h-screen lg:w-[1024px] p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600">
              🍎 Teaching Hub
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome, {user.firstName}! 🌞
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="backdrop-blur supports-[backdrop-filter]:bg-white/50"
            >
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="backdrop-blur supports-[backdrop-filter]:bg-white/60 border border-border/60 shadow-sm transition will-change-transform hover:shadow-md hover:-translate-y-0.5">
            <CardContent className="p-5 text-center">
              <p className="text-muted-foreground font-medium">
                👥 Нийт сурагчид
              </p>
              <p className="text-4xl font-extrabold mt-1">{students.length}</p>
            </CardContent>
          </Card>
          <Card className="backdrop-blur supports-[backdrop-filter]:bg-white/60 border border-border/60 shadow-sm transition will-change-transform hover:shadow-md hover:-translate-y-0.5">
            <CardContent className="p-5 text-center">
              <p className="text-muted-foreground font-medium">
                📚 Идэвхитэй даалгаврууд
              </p>
              <p className="text-4xl font-extrabold mt-1">
                {assignments.length}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-blue-100">
            <CardContent className="p-4 text-center">
              <Dialog>
                <DialogTrigger>
                  <div>chat</div>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Messages</DialogTitle>
                  <TeacherChat />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        {/* Add Student / Add Task */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold">
            📝 гэрийн даалгаврууд ✨
          </h2>
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  className="shadow-sm hover:-translate-y-0.5 transition will-change-transform"
                >
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
                <Button className="shadow-sm hover:-translate-y-0.5 transition will-change-transform">
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
        <AssignmentsList
          assignments={assignments}
          onEdit={(a) => {
            setEditingAssignment(a);
            setIsEditDialogOpen(true);
          }}
        />

        {/* Edit Assignment Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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
