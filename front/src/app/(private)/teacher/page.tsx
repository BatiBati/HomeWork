"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
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
import { useRouter } from "next/navigation";
import { api } from "../../../../axios";

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
          [...assignments].reverse().map((a) => (
            <Card
              key={a._id}
              className="w-full cursor-pointer hover:shadow-md transition mt-4"
            >
              <CardContent className="px-6">
                {/* Assignment Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-xl text-gray-800">
                        📚 Даалгавар
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingAssignment(a);
                          setIsEditDialogOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        ✏️ Засах
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      📅 Үүссэн:
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
                                  <Image
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
              </CardContent>
            </Card>
          ))
        )}

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
                  // Optimistically update local list without full refresh
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

function EditAssignmentForm({
  assignment,
  token,
  onSuccess,
  onCancel,
}: {
  assignment: AssignmentType;
  token: string;
  onSuccess: (updated: AssignmentType) => void;
  onCancel: () => void;
}) {
  const [lessons, setLessons] = useState<LessonType[]>(assignment.lessons);
  const [taskEndSchedule, setTaskEndSchedule] = useState(
    new Date(assignment.taskEndSchedule).toISOString().slice(0, 16)
  );
  const [loading, setLoading] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const addLesson = () => {
    setLessons([
      ...lessons,
      {
        lessonName: "",
        taskDescription: "",
        images: [],
      },
    ]);
  };

  const removeLesson = (index: number) => {
    if (lessons.length > 1) {
      setLessons(lessons.filter((_, i) => i !== index));
    }
  };

  const updateLesson = (
    index: number,
    field: keyof LessonType,
    value: string
  ) => {
    setLessons(
      lessons.map((lesson, i) =>
        i === index ? { ...lesson, [field]: value } : lesson
      )
    );
  };

  const removeImage = (lessonIndex: number, imageIndex: number) => {
    setLessons(
      lessons.map((lesson, i) =>
        i === lessonIndex
          ? {
              ...lesson,
              images: lesson.images.filter(
                (_, imgIdx) => imgIdx !== imageIndex
              ),
            }
          : lesson
      )
    );
  };

  const handleImageChange = (
    lessonIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setLessons(
      lessons.map((lesson, i) =>
        i === lessonIndex
          ? {
              ...lesson,
              images: [...lesson.images, ...newImages],
            }
          : lesson
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.patch<{ assignment: AssignmentType }>(
        `/assignment/${assignment._id}`,
        {
          lessons,
          taskEndSchedule,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updated = res.data?.assignment ?? assignment;
      onSuccess(updated as AssignmentType);
    } catch (error) {
      console.error("Error updating assignment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="taskEndSchedule">Даалгавар дуусах хугацаа</Label>
          <input
            id="taskEndSchedule"
            type="datetime-local"
            value={taskEndSchedule}
            onChange={(e) => setTaskEndSchedule(e.target.value)}
            className="w-full border rounded p-2 mt-1"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">
              Хичээлүүд ({lessons.length})
            </h3>
            <Button type="button" variant="outline" onClick={addLesson}>
              + Хичээл нэмэх
            </Button>
          </div>

          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium">Хичээл {index + 1}</h4>
                  {lessons.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeLesson(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ✕ Устгах
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor={`lessonName-${index}`}>Хичээлийн нэр</Label>
                    <select
                      id={`lessonName-${index}`}
                      value={lesson.lessonName}
                      onChange={(e) =>
                        updateLesson(index, "lessonName", e.target.value)
                      }
                      className="w-full border rounded p-2 mt-1"
                      required
                    >
                      <option value="">-Хичээл сонгох-</option>
                      <option value="Математик">Математик</option>
                      <option value="Англи хэл">Англи хэл</option>
                      <option value="Монгол хэл">Монгол хэл</option>
                      <option value="Байгалийн ухаан">Байгалийн ухаан</option>
                      <option value="Нийгмийн ухаан">Нийгмийн ухаан</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor={`taskDescription-${index}`}>
                      Даалгаварийн дэлгэрэнгүй
                    </Label>
                    <textarea
                      id={`taskDescription-${index}`}
                      value={lesson.taskDescription}
                      onChange={(e) =>
                        updateLesson(index, "taskDescription", e.target.value)
                      }
                      className="mt-1 w-full border rounded p-2"
                      rows={3}
                      required
                    />
                  </div>

                  {/* Existing Images */}
                  {lesson.images && lesson.images.length > 0 && (
                    <div>
                      <Label>Одоогийн зурагууд ({lesson.images.length})</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {lesson.images.map((imageUrl, imgIndex) => (
                          <div key={imgIndex} className="relative">
                            <Image
                              src={imageUrl}
                              alt={`${lesson.lessonName} image ${imgIndex + 1}`}
                              className="w-20 h-20 object-cover rounded border cursor-zoom-in"
                              onClick={() => setPreviewImageUrl(imageUrl)}
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 w-6 h-6 p-0 text-xs"
                              onClick={() => removeImage(index, imgIndex)}
                            >
                              ✕
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add New Images */}
                  <div>
                    <Label htmlFor={`images-${index}`}>Шинэ зураг нэмэх</Label>
                    <input
                      id={`images-${index}`}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageChange(index, e)}
                      className="mt-1 w-full border rounded p-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Олон зураг сонгож болно
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Цуцлах
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Хадгалж байна..." : "Хадгалах"}
          </Button>
        </div>
      </form>
      {/* Image preview dialog */}
      <Dialog
        open={!!previewImageUrl}
        onOpenChange={() => setPreviewImageUrl(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="sr-only">
              Зургийн урьдчилсан харагдац
            </DialogTitle>
          </DialogHeader>
          {previewImageUrl && (
            <Image
              src={previewImageUrl}
              alt="preview"
              className="w-full h-auto rounded"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
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
