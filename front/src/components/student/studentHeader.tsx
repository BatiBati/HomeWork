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
  const [showEmailInput, setShowEmailInput] = useState(false);

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
        // Hide the input after successful save
        setShowEmailInput(false);
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
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between text-center bg-white/95 backdrop-blur rounded-xl p-4 lg:p-6 shadow-lg gap-4 lg:gap-0">
      <Button
        onClick={() => router.back()}
        className="flex items-center gap-2 px-3 py-2 lg:px-4 border-0 text-sm lg:text-base"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Буцах</span>
      </Button>

      <div className="flex flex-col text-center rounded-xl p-2 lg:p-6 flex-1">
        <div className="flex flex-col items-center justify-between mb-2">
          <div className="flex items-center gap-2 lg:gap-3">
            <User className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
            <span className="text-xl lg:text-3xl font-bold text-gray-800">
              {student.parentname.charAt(0)}.{student.childname}
            </span>
          </div>
        </div>
        <p className="text-sm lg:text-lg text-gray-600">
          Бүх даалгавруудын жагсаалт
        </p>
      </div>

      <div className="flex flex-col items-center lg:items-end gap-2 w-full lg:w-auto">
        {!showEmailInput ? (
          <Button
            onClick={() => setShowEmailInput(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 lg:px-4 text-xs lg:text-sm flex items-center gap-1 lg:gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg w-full lg:w-auto"
          >
            <User className="w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-200" />
            <span className="hidden sm:inline">
              {student.parentEmail ? "Имэйл засах" : "Имэйл нэмэх"}
            </span>
            <span className="sm:hidden">
              {student.parentEmail ? "Засах" : "Нэмэх"}
            </span>
          </Button>
        ) : (
          <div className="bg-white/95 backdrop-blur rounded-xl p-3 lg:p-4 shadow-lg animate-in slide-in-from-right-5 fade-in duration-300 ease-out w-full lg:w-auto">
            <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
              Эцэг эхийн имэйл хаяг
            </label>
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full lg:w-48 transition-all duration-200"
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveEmail}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 lg:px-4 text-xs lg:text-sm disabled:opacity-50 transition-all duration-200 hover:scale-105 flex-1 lg:flex-none"
                >
                  {loading ? "Хадгалаж байна..." : "Хадгалах"}
                </Button>
                <Button
                  onClick={() => {
                    setShowEmailInput(false);
                    setEmail(student.parentEmail || "");
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 lg:px-4 text-xs lg:text-sm transition-all duration-200 hover:scale-105 flex-1 lg:flex-none"
                >
                  Цуцлах
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1 animate-in fade-in duration-500 delay-100">
              Шинэ даалгавар ирэхэд мэдэгдэл хүлээн авах
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
