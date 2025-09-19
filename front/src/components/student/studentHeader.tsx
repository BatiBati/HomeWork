"use client";
import { StudentType } from "@/provider/AuthProvider";
import { ArrowLeft, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../../axios";

export const StudentHeader = ({ student }: { student: StudentType }) => {
  const router = useRouter();
  const [email, setEmail] = useState(student.parentEmail || "");
  const [loading, setLoading] = useState(false);

  const handleSaveEmail = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Зөв имэйл хаяг оруулна уу");
      return;
    }

    setLoading(true);
    try {
      const response = await api.put(
        `/student/${student._id}`,
        {
          parentEmail: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("student-token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Имэйл хаяг амжилттай хадгалагдлаа!");
        // Update local state
        student.parentEmail = email;
      } else {
        toast.error("Имэйл хадгалахад алдаа гарлаа");
      }
    } catch (error) {
      console.error("Error saving email:", error);
      toast.error("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-start justify-between text-center bg-white/95 backdrop-blur rounded-xl p-6 shadow-lg">
      <Button
        onClick={() => router.back()}
        className="flex items-center gap-2 px-4 py-2 border-0"
      >
        <ArrowLeft className="w-4 h-4" />
        Буцах
      </Button>
      <div className="flex flex-col text-center rounded-xl p-6 ">
        <div className="flex flex-col items-center justify-between mb-2 ">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">
              {student.parentname.charAt(0)}.{student.childname}
            </span>
          </div>
          <div className="w-12"></div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Миний даалгаврууд
        </h1>
        <p className="text-lg text-gray-600">Бүх даалгавруудын жагсаалт</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Эцэг эхийн имэйл хаяг
          </label>
          <div className="flex items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-48"
            />
            <Button
              onClick={handleSaveEmail}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm disabled:opacity-50"
            >
              {loading ? "Хадгалаж байна..." : "Хадгалах"}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Шинэ даалгавар ирэхэд мэдэгдэл хүлээн авах
          </p>
        </div>
      </div>
    </div>
  );
};
