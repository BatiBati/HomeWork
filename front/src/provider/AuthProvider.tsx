"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../axios";

export type HomeworkType = {
  _id: string;
  taskId: string;
  studentId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  image: string[];
  lessonName: string;
};
export type TaskType = {
  _id: string;
  lessonName: string;
  image: string;
  homeworks: HomeworkType[];
  taskEndSchedule: Date;
  updatedAt: Date;
  createdAt: Date;
  teacherId: string;
};
export type TeacherType = {
  _id: string;
  email: string;
  teacherName: string;
  password: string;
  school: string;
  grade: string;
  students: StudentType[];
  tasks: TaskType[];
  createdAt: Date;
  updatedAt: Date;
};
export type StudentType = {
  _id: string;
  parentname: string;
  teacherId: TeacherType;
  childname: string;
  homeworks: HomeworkType[];
  createdAt: Date;
  updatedAt: Date;
};
interface AuthContextType {
  teacher: TeacherType | null;
  token: string | null;
  login: () => Promise<void>;
  logout: () => void;
  updateTeacher: (teacherId: string) => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [teacher, setTeacher] = useState<TeacherType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  console.log("Auth recher", teacher?.tasks);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedTeacher = localStorage.getItem("teacher");
    if (savedToken) setToken(savedToken);
    if (savedTeacher) setTeacher(JSON.parse(savedTeacher));
  }, []);

  const login = async () => {
    try {
      const res = await api.post("/teacher/login", {
        email: "test@gmail.com", // хатуу email
        password: "teacher123", // хатуу password
      });

      const token = res.data.token;
      setToken(token);
      setTeacher(res.data.teacher);

      localStorage.setItem("token", token);
      localStorage.setItem("teacher", JSON.stringify(res.data.teacher));

      router.push("/teacher"); // dashboard руу чиглүүлэх
    } catch (err) {
      console.error("Login failed", err);
      alert("Нэвтрэхэд алдаа гарлаа");
    }
  };

  const logout = () => {
    setTeacher(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("teacher");
    router.push("/");
  };

  const updateTeacher = async (teacherId: string) => {
    const res = await api.put(`/teacher/${teacherId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTeacher(res.data);
  };

  return (
    <AuthContext.Provider
      value={{ teacher, token, login, logout, updateTeacher }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
