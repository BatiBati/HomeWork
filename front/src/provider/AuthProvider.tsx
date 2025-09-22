"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { api, setAuthToken } from "../../axios";
import { LessonType } from "@/app/(private)/teacher/page";

interface LoginValues {
  email: string;
  password: string;
}

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
  lastName: string;
  firstName: string;
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
export type ChildrenType = {
  _id: string;
  firstName: string;
  lastName: string;
  teacher: string;
  parents: string;
  grade: string;
  school: string;
  createdAt: Date;
  updatedAt: Date;
};
export type AssignmentTypeee = {
  _id: string;
  teacher: TeacherType;
  childrens: ChildrenType[];
  lessons: LessonType[];
  taskEndSchedule: Date;
  images: string[];
  publicLinks: Array<{
    token: string;
    sharedBy: "Teacher" | "Parent";
    expireAt: Date;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
};

interface UserType {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  daycareEmail: string | null;
  school: string | null;
  grade: string | null;
  role: "parents" | "teacher";
  children: ChildrenType[];
}
interface AuthContextType {
  user: UserType | null;
  teacher: TeacherType | null;
  token: string | null;
  login: (values: LoginValues) => Promise<UserType>;
  getMe: () => Promise<UserType>;
  setTeacher: React.Dispatch<React.SetStateAction<TeacherType | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [teacher, setTeacher] = useState<TeacherType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      setToken(token);
      api
        .get<{ user: UserType }>("/auth/me")
        .then((res) => setUser(res.data.user))
        .catch(() => {
          localStorage.removeItem("token");
          setAuthToken(null);
          setToken(null);
        });
    }
  }, []);

  const login = async (values: LoginValues): Promise<UserType> => {
    try {
      const res = await api.post<{ token: string; user: UserType }>(
        "/auth/login",
        values
      );
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      setAuthToken(token);
      setUser(user);

      return user;
    } catch {
      throw new Error("Login error");
    }
  };

  const getMe = async (): Promise<UserType> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");

    setAuthToken(token);
    const res = await api.get<{ user: UserType }>("/auth/me");
    setUser(res.data.user);
    return res.data.user;
  };

  return (
    <AuthContext.Provider
      value={{ user, teacher, token, setTeacher, setToken, login, getMe }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
