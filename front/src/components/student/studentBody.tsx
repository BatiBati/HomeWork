"use client";

import { HomeworkType } from "@/provider/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Image from "next/image";
import { format } from "date-fns";
import { Badge, CheckCircle, Clock } from "lucide-react";

export const StudentBody = ({ homeworks }: { homeworks: HomeworkType[] }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {homeworks.map((homework) => {
        const createdAt = homework.createdAt
          ? format(new Date(homework.createdAt), "yyyy.MM.dd HH:mm")
          : "";

        return (
          <Card
            key={homework._id}
            className="rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <CardHeader className="">
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{homework.description}</span>
                {homework.status ? (
                  <Badge className="bg-green-500 flex items-center justify-center gap-1">
                    <CheckCircle size={14} /> Дууссан
                  </Badge>
                ) : (
                  <Badge className="bg-yellow-500 flex items-center justify-center gap-1">
                    <Clock size={14} /> Хийгдээгүй
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {/* Хэрэв зураг байгаа бол харуулах */}
              {homework.image && homework.image.length > 0 && (
                <div className="relative w-full h-40 rounded-xl overflow-hidden">
                  <Image
                    src={homework.image[0]}
                    alt="Homework"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <p className="text-sm text-gray-600">Оруулсан: {createdAt}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
