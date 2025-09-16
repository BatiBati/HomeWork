import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../../axios";

interface Teacher {
  _id: string;
  teacherName: string;
  school: string;
  grade: string;
}

interface AuthContextType {
  teacher: Teacher | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = async (teacherName: string, password: string) => {
    const res = await api.post("/teacher/login", {
      teacherName,
      password,
    });
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
    setTeacher(res.data.teacher);
  };

  const logout = () => {
    setTeacher(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (token) {
      api
        .get("/teacher/getme", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setTeacher(res.data))
        .catch(() => logout());
    }
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
