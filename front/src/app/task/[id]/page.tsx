"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { api } from "../../../../axios";
import { StudentType, useAuth } from "@/provider/AuthProvider";
import { toast } from "sonner";

interface HomeworkType {
  _id: string;
  taskId: string;
  studentId: StudentType;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  image?: string[];
}

interface Task {
  _id: string;
  lessonName: string;
  subject?: string;
  homeworks: HomeworkType[];
  taskEndSchedule: string;
  image?: string[];
}

const TaskPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const { teacher } = useAuth();

  const [selectedHomework, setSelectedHomework] = useState<HomeworkType | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/task/${id}`);
        setTask(res.data.task);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching task");
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const markAsDone = async (homeworkId: string) => {
    try {
      await api.put(`/homework/update/${homeworkId}`, { status: true });
      if (task) {
        setTask({
          ...task,
          homeworks: task.homeworks.map((hw) =>
            hw._id === homeworkId ? { ...hw, status: true } : hw
          ),
        });
      }
      setSelectedHomework(null);
    } catch (err) {
      console.error(err);
      toast.error("Error updating homework status");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!task) return <div>Task not found</div>;
  console.log(selectedHomework);

  return (
    <div className="p-6 min-h-screen flex justify-center">
      <div className="w-full max-w-4xl">
        <Button
          variant="outline"
          className="bg-white hover:bg-gray-300 border-3 mb-4"
          onClick={() => router.back()}
        >
          ← Back
        </Button>

        <Card className="mb-6">
          <CardContent>
            <h1 className="text-2xl font-bold mb-2">{task.lessonName}</h1>
            <p className="text-gray-600 mb-2">
              📚 Хичээлийн сэдэв: {task.lessonName || "-"} • 📅 Due:{" "}
              {new Date(task.taskEndSchedule).toLocaleDateString()}
            </p>

            {task.image && task.image.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-2">
                {task.image.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Task Image ${idx + 1}`}
                    className="w-full h-32 object-cover rounded cursor-pointer hover:scale-105 transition"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <h2 className="text-xl font-bold mb-2">
          Сурагчид {task.homeworks.length}/{teacher?.students.length}
        </h2>
        <Progress
          value={
            (task.homeworks.length / (teacher?.students?.length || 1)) * 100
          }
          className="h-3 mb-4"
        />

        {task.homeworks.map((hw) => (
          <Card
            key={hw._id}
            className="mb-2 cursor-pointer hover:shadow-md transition"
            onClick={() => setSelectedHomework(hw)}
          >
            <CardContent className="flex justify-between">
              <span>{hw.studentId?.childname || "Unknown Student"}</span>
              <span>{hw.status ? "✅ Шалгасан" : "❌ Шалгаагүй"}</span>
            </CardContent>
          </Card>
        ))}

        {/* Homework Dialog */}

        <Dialog
          open={!!selectedHomework}
          onOpenChange={() => setSelectedHomework(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedHomework?.studentId?.childname}'s Homework
              </DialogTitle>
            </DialogHeader>

            {/* Homework images */}
            {selectedHomework?.image && selectedHomework.image.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {selectedHomework.image.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Homework ${idx + 1}`}
                    className="w-full h-40 object-cover rounded cursor-pointer hover:scale-105 transition"
                    onClick={() => setSelectedImage(img)} // this triggers the lightbox
                  />
                ))}
              </div>
            )}

            <p className="mb-4">{selectedHomework?.description}</p>

            <DialogFooter className="flex gap-2">
              {!selectedHomework?.status && (
                <Button
                  variant="default"
                  onClick={() => markAsDone(selectedHomework!._id)}
                >
                  Mark as Done
                </Button>
              )}
              <Button
                className="bg-white hover:bg-gray-300 border-3"
                onClick={() => setSelectedHomework(null)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Image Lightbox Dialog */}

        <Dialog
          open={!!selectedImage}
          onOpenChange={() => setSelectedImage(null)}
        >
          <DialogContent className="p-0 max-w-[1280px] w-full mx-auto bg-transparent border-0 shadow-none flex justify-center items-center h-fit">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Enlarged"
                className="max-w-[95%] max-h-[90vh] object-contain rounded shadow-lg cursor-pointer"
                onClick={() => setSelectedImage(null)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TaskPage;
