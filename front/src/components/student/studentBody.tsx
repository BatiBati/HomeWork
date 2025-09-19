"use client";

import { TaskType } from "@/provider/AuthProvider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { useEffect, useState } from "react";
import { api } from "../../../axios";

export const StudentBody = ({ teacherId }: { teacherId: string }) => {
  const [data, setData] = useState<TaskType[]>([]);
  const getTask = async () => {
    const response = await api.get(`/task/teacher/${teacherId}`);
    setData(response.data);
  };
  useEffect(() => {
    getTask();
  }, []);
  console.log(data, "data");

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((task) => (
        <Card key={task._id}>
          <CardHeader>{task.lessonName}</CardHeader>
          <CardContent>
            <p>{task.taskEndSchedule.toString()} end</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
