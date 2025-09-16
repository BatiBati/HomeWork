"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Student {
  id: string;
  childName: string;
  parentName: string;
  homework: { taskId: string; completed: boolean }[];
}

export default function StudentTaskView() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;

  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const mockStudents: Student[] = [
      {
        id: "student-1",
        childName: "Батбаяр",
        parentName: "Батбаатар",
        homework: [
          { taskId: "task-1", completed: true },
          { taskId: "task-2", completed: true },
          { taskId: "task-3", completed: false },
        ],
      },
      {
        id: "student-2",
        childName: "Сара",
        parentName: "Сараа",
        homework: [
          { taskId: "task-1", completed: false },
          { taskId: "task-2", completed: false },
        ],
      },
      {
        id: "student-3",
        childName: "Төмөр",
        parentName: "Төмөрбаатар",
        homework: [],
      },
      {
        id: "student-4",
        childName: "Цагаан",
        parentName: "Цагаанбат",
        homework: [],
      },
      {
        id: "student-5",
        childName: "Оюун",
        parentName: "Оюунцэцэг",
        homework: [],
      },
      {
        id: "student-6",
        childName: "Батцэцэг",
        parentName: "Батбаатар",
        homework: [],
      },
      {
        id: "student-7",
        childName: "Энхбаяр",
        parentName: "Энхбаатар",
        homework: [],
      },
      {
        id: "student-8",
        childName: "Мөнхбаяр",
        parentName: "Мөнхбаатар",
        homework: [],
      },
      {
        id: "student-9",
        childName: "Цэцэг",
        parentName: "Цэцэгмаа",
        homework: [],
      },
      {
        id: "student-10",
        childName: "Батбат",
        parentName: "Батбаатар",
        homework: [],
      },
      {
        id: "student-11",
        childName: "Сайхан",
        parentName: "Сайханбаатар",
        homework: [],
      },
      {
        id: "student-12",
        childName: "Алтанцэцэг",
        parentName: "Алтанбаатар",
        homework: [],
      },
      {
        id: "student-13",
        childName: "Мөнхбат",
        parentName: "Мөнхбаатар",
        homework: [],
      },
      {
        id: "student-14",
        childName: "Цагаанбат",
        parentName: "Цагаанбаатар",
        homework: [],
      },
      {
        id: "student-15",
        childName: "Баттулга",
        parentName: "Батбаатар",
        homework: [],
      },
      {
        id: "student-16",
        childName: "Энхтуяа",
        parentName: "Энхбаатар",
        homework: [],
      },
      {
        id: "student-17",
        childName: "Мөнхцэцэг",
        parentName: "Мөнхбаатар",
        homework: [],
      },
      {
        id: "student-18",
        childName: "Батмөнх",
        parentName: "Батбаатар",
        homework: [],
      },
      {
        id: "student-19",
        childName: "Цэцэгмаа",
        parentName: "Цэцэгбаатар",
        homework: [],
      },
      {
        id: "student-20",
        childName: "Батбаатар",
        parentName: "Батбаатар",
        homework: [],
      },
      {
        id: "student-21",
        childName: "Энхжаргал",
        parentName: "Энхбаатар",
        homework: [],
      },
      {
        id: "student-22",
        childName: "Мөнхцэцэг",
        parentName: "Мөнхбаатар",
        homework: [],
      },
      {
        id: "student-23",
        childName: "Батбаяр",
        parentName: "Батбаатар",
        homework: [],
      },
      {
        id: "student-24",
        childName: "Сараа",
        parentName: "Сараабаатар",
        homework: [],
      },
      {
        id: "student-25",
        childName: "Төмөрбаатар",
        parentName: "Төмөрбаатар",
        homework: [],
      },
    ];

    setStudents(mockStudents);
    setFilteredStudents(mockStudents);
    setLoading(false);
  }, []);

  // Filter students based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter((student) => {
        const formattedName = formatStudentName(student);
        return formattedName.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredStudents(filtered);
    }
  }, [searchTerm, students]);

  const formatStudentName = (student: Student) => {
    const parentInitial = student.parentName.charAt(0);
    return `${parentInitial}.${student.childName}`;
  };

  const handleStudentSelect = (formattedName: string) => {
    setSelectedStudentId(formattedName);
    setSearchTerm(formattedName);
    setShowDropdown(false);
    // Navigate to student's personal page using formatted name
    console.log(formattedName);
    router.push(`/student/${formattedName}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(true);
    setSelectedStudentId("");
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    // Delay hiding dropdown to allow clicking on items
    setTimeout(() => setShowDropdown(false), 200);
  };

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
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="w-full h-10 sm:h-12 text-sm sm:text-lg rounded-lg sm:rounded-xl border-2"
              />

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg sm:rounded-xl shadow-lg z-10 max-h-48 sm:max-h-60 overflow-y-auto">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <div
                        key={student.id}
                        onClick={() =>
                          handleStudentSelect(formatStudentName(student))
                        }
                        className="px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-lg hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        {formatStudentName(student)}
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
