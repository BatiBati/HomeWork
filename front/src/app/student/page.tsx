"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "../../../axios";
import { StudentType } from "@/provider/AuthProvider";

export default function StudentTaskView() {
  const router = useRouter();

  const [students, setStudents] = useState<StudentType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const getStudents = async () => {
    const response = await api.get("/student");
    setStudents(response.data);
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(true);
  };

  const filteredStudents = students.filter((student) =>
    student.childname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStudentSelect = (student: StudentType) => {
    setSearchTerm(student.childname);
    setShowDropdown(false);

    router.push(`/student/${student._id}`);
  };
  console.log(students);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-2 sm:p-4">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="text-center bg-white/95 backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl sm:text-3xl mb-3 sm:mb-4">
            📝
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
            Homework Hub
          </h1>
          <p className="text-base sm:text-lg text-gray-600">Сурагчийн хуудас</p>
        </div>

        {/* Student Selection */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-center">
              Өөрийн нэрээ сонгоно уу
            </CardTitle>
            <CardDescription className="text-center text-sm sm:text-base">
              Жагсаалтаас өөрийн нэрийг олж сонгоно уу
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Нэрээ сонгоно уу эсвэл хайна уу..."
                value={searchTerm}
                onChange={handleInputChange}
                className="w-full h-10 sm:h-12 text-sm sm:text-lg rounded-lg sm:rounded-xl border-2"
                onFocus={() => setShowDropdown(true)}
              />

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg sm:rounded-xl shadow-lg z-10 max-h-48 sm:max-h-60 overflow-y-auto">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <div
                        key={student._id}
                        onClick={() => handleStudentSelect(student)}
                        className="px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-lg hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        {student.childname} ({student.parentname})
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 sm:px-4 sm:py-3 text-center text-gray-500 text-sm sm:text-base">
                      Хайлтын үр дүн олдсонгүй
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
