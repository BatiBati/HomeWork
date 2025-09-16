"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { api } from "../../../../axios";

interface AddStudentFormProps {
  parentname: string;
  setParentname: React.Dispatch<React.SetStateAction<string>>;
  childname: string;
  setChildname: React.Dispatch<React.SetStateAction<string>>;
  teacherId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

export const AddStudentForm: React.FC<AddStudentFormProps> = ({
  parentname,
  setParentname,
  childname,
  setChildname,
  teacherId,
  loading,
  setLoading,
}) => {
  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/student/login", {
        parentname,
        childname,
        teacherId,
      });

      localStorage.setItem("student-token", res.data.token);
      alert(res.data.message);

      setParentname("");
      setChildname("");
    } catch (err) {
      console.error(err);
      alert("Error adding student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleAddStudent}>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Сурагчийн овог
        </label>
        <input
          type="text"
          value={parentname}
          onChange={(e) => setParentname(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          placeholder="Enter parent name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Сурагчийн нэр
        </label>
        <input
          type="text"
          value={childname}
          onChange={(e) => setChildname(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          placeholder="Enter student name"
          required
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-green-500 hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Student"}
        </Button>
      </div>
    </form>
  );
};
