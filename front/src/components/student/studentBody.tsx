"use client";

import { HomeworkType, TaskType } from "@/provider/AuthProvider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { api } from "../../../axios";
import { AddHomework } from "./addHomework";

export const StudentBody = ({
  teacherId,
  studentId,
  fetchStudent,
}: {
  teacherId: string;
  studentId: string;
  fetchStudent: () => void;
}) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [homeworks, setHomeworks] = useState<HomeworkType[]>([]);

  const getTasks = async () => {
    const response = await api.get(`/task/teacher/${teacherId}`);
    setTasks(response.data);
  };

  const getHomeworks = async () => {
    const response = await api.get(`/homework/${studentId}`);
    setHomeworks(response.data);
  };

  useEffect(() => {
    getTasks();
    getHomeworks();
  }, []);

  const checkHomework = (taskId: string) => {
    return homeworks.find((hw) => hw.taskId === taskId);
  };
  console.log(homeworks, "homeworks");
  console.log(tasks, "tasks");

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => {
        const myHomework = checkHomework(task._id);
        return (
          <Card key={task._id}>
            <CardHeader>{task.lessonName}</CardHeader>
            <CardContent>
              <p>
                Дуусах хугацаа:
                {new Date(task.taskEndSchedule).toLocaleDateString()}
              </p>

              {!myHomework ? (
                <AddHomework
                  studentId={studentId}
                  taskId={task._id}
                  fetchStudent={fetchStudent}
                />
              ) : (
                <div className="mt-2">
                  <p className="font-medium">Оруулсан даалгавар:</p>
                  <p className="text-sm text-muted-foreground">
                    {myHomework.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
