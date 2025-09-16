import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../../axios";

export type HomeworkType = {
  taskId: string;
  studentId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: Boolean;
};
export type TaskType = {
  lessonName: string;
  image: string;
  homeWork: string;
  taskEndSchedule: Date;
  updatedAt: Date;
  createdAt: Date;
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
  parentname: string;
  teacherId: string;
  childname: string;
  homeworks: HomeworkType;
  createdAt: Date;
  updatedAt: Date;
};
interface AuthContextType {
  teacher: TeacherType | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [teacher, setTeacher] = useState<TeacherType | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = async (email: string, password: string) => {
    const res = await api.post("/teacher/login", { email, password });
    const token = res.data.token;
    setToken(token);
    localStorage.setItem("token", token);
    setTeacher(res.data.teacher);
  };

  const logout = () => {
    setTeacher(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const getMe = async () => {
    if (!token) return;
    try {
      const res = await api.get("/teacher/getme", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeacher(res.data.teacher);
    } catch (err) {
      console.error("GetMe error:", err);
      logout();
    }
  };

  useEffect(() => {
    getMe();
  }, [token]);

  return (
    <AuthContext.Provider value={{ teacher, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
