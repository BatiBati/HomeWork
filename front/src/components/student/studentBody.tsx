"use client";

import { TaskType } from "@/provider/AuthProvider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { useEffect, useState } from "react";
import { api } from "../../../axios";

export const StudentBody = ({ teacherId }: { teacherId: string }) => {
  const [data, setData] = useState<TaskType[]>([]);
  const [selected, setSelected] = useState<TaskType | null>(null);

  const getTask = async () => {
    const response = await api.get(`/task/teacher/${teacherId}`);
    setData(response.data);
  };

  useEffect(() => {
    getTask();
  }, []);

  const groupedByDay = data.reduce((acc: Record<string, TaskType[]>, task) => {
    const date = new Date(task.createdAt);
    const dayKey = date.toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!acc[dayKey]) acc[dayKey] = [];
    acc[dayKey].push(task);
    return acc;
  }, {});

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Даалгаврын жагсаалт</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {Object.entries(groupedByDay)
            .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
            .map(([day, tasks]) => (
              <div key={day}>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  {day}
                </h3>
                <div className="space-y-2">
                  {[...tasks].reverse().map((task) => (
                    <Card
                      key={task._id}
                      className={`cursor-pointer border ${
                        selected?._id === task._id
                          ? "border-blue-500 bg-blue-50"
                          : "hover:border-gray-400"
                      }`}
                      onClick={() => setSelected(task)}
                    >
                      <CardHeader className="font-medium">
                        {task.lessonName}
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">
                          Дуусах:{" "}
                          {new Date(task.taskEndSchedule).toLocaleDateString(
                            "mn-MN",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <div className="border rounded-lg p-4 bg-gray-50">
          {selected ? (
            <>
              <h3 className="text-lg font-semibold">{selected.lessonName}</h3>
              <p className="text-sm text-gray-600 mt-2">
                Дуусах хугацаа:{" "}
                {new Date(selected.taskEndSchedule).toLocaleDateString(
                  "mn-MN",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            </>
          ) : (
            <p className="text-gray-400 text-sm">
              Харах даалгавараа сонгоно уу
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
