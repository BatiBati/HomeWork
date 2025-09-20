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
  image: string[];
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
  parentEmail: string;
  createdAt: Date;
  updatedAt: Date;
};

interface AuthContextType {
  teacher: TeacherType | null;
  token: string | null;
  logout: () => void;
  getMe: (tokenParam?: string) => Promise<void>;
  setTeacher: React.Dispatch<React.SetStateAction<TeacherType | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [teacher, setTeacher] = useState<TeacherType | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const getMe = async (tokenParam?: string) => {
    const authToken = tokenParam || token;
    if (!authToken) return;

    try {
      const res = await api.get("/teacher/me", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setTeacher(res.data.teacher);
    } catch (err) {
      console.error("Failed to fetch teacher:", err);
      setTeacher(null);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      getMe(savedToken); // <-- pass token manually
    }
  }, []);

  const logout = () => {
    setToken(null);
    setTeacher(null);
    localStorage.removeItem("token");
    router.push("/");
  };

  const login = () => {};

  return (
    <AuthContext.Provider
      value={{ teacher, token, setTeacher, setToken, logout, getMe }}
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
