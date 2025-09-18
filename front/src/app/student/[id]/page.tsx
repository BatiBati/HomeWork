"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "../../../../axios";
import { StudentType } from "@/provider/AuthProvider";
import { StudentHeader } from "@/components/student/studentHeader";
import { StudentBody } from "@/components/student/studentBody";
export default function StudentPage() {
  const params = useParams();
  const studentId = params.id;
  const [student, setStudent] = useState<StudentType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`/student/${studentId}`);

        setStudent(res.data);
      } catch (error) {
        console.error(error);
        setStudent(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
        <div className="text-white text-2xl font-bold">Ачааллаж байна...</div>
      </div>
    );
  }
  console.log(student, "student");

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 via-pink-500 to-purple-600">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur text-center">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Сурагч олдсонгүй
            </h1>
            <p className="text-gray-600">
              Энэ холбоос буруу эсвэл сурагч устгагдсан байна.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <StudentHeader student={student} />
        <StudentBody homeworks={student.homeworks} />
      </div>
    </div>
  );
}
