"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/provider/AuthProvider";
import { api } from "../../../../../axios";
import { AxiosError } from "axios";

interface AddStudentFormProps {
  parentEmail: string; // kept for backward compatibility (will be email)
  setParentEmail: React.Dispatch<React.SetStateAction<string>>; // will hold email
  childname: string;
  setChildname: React.Dispatch<React.SetStateAction<string>>;
  teacherId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  onCreated?: () => void;
}

export const AddStudentForm: React.FC<AddStudentFormProps> = ({
  parentEmail,
  setParentEmail,
  childname,
  setChildname,
  teacherId,
  loading,
  setLoading,
  onCreated,
}) => {
  const { getMe } = useAuth();
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<
    Array<{ _id: string; email: string; firstName?: string; lastName?: string }>
  >([]);

  const [selectedParentId, setSelectedParentId] = useState<string>("");

  const searchAbortRef = useRef<AbortController | null>(null);
  const handleSearchParentByEmail = async (query: string) => {
    const email = query.trim().toLowerCase();
    if (!email) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    try {
      if (searchAbortRef.current) searchAbortRef.current.abort();
      searchAbortRef.current = new AbortController();
      const res = await api.post<{
        message: string;
        user: Array<{
          _id: string;
          email: string;
          firstName?: string;
          lastName?: string;
        }>;
      }>(
        "/user/email",
        { email },
        { signal: searchAbortRef.current.signal as unknown as AbortSignal }
      );
      const users = res.data.user || [];
      setSearchResults(users);
    } catch (err) {
      console.error("Parent search error", err);
      toast.error("Хайлтын алдаа");
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      void handleSearchParentByEmail(parentEmail);
    }, 300);
    return () => clearTimeout(id);
  }, [parentEmail]);

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!selectedParentId) {
        toast.error("Эцэг эхийг сонгоно уу");
        setLoading(false);
        return;
      }

      const [first] = childname.trim().split(/\s+/);
      const selectedParent = searchResults.find(
        (p) => p._id === selectedParentId
      );
      const parentLastName = selectedParent?.lastName || "";
      const payload = {
        firstName: parentLastName,
        lastName: first || childname,
        profilePicture: "",
        parentId: selectedParentId,
        teacherId,
      };

      const res = await api.post("/children", payload);

      toast.success(res.data.message || "Child created successfully");

      setParentEmail("");
      setChildname("");
      setSearchResults([]);

      setSelectedParentId("");

      onCreated?.();
    } catch (err: unknown) {
      const error = err as AxiosError<{
        message?: string;
        error?: string;
      }>;
      console.error("Add student error:", error);
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Error adding student";
      toast.error(msg);
    } finally {
      setLoading(false);
      getMe();
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleAddStudent}>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Эцэг эхийн и-мэйл
        </label>
        <input
          type="email"
          value={parentEmail}
          onChange={(e) => setParentEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm sm:text-base p-2 sm:p-3"
          placeholder="parent@email.com"
          required
        />
        <div className="flex gap-2 mt-2 text-sm text-gray-600">
          {searching
            ? "Хайж байна..."
            : parentEmail
            ? "Автоматаар хайж байна"
            : "И-мэйлээ оруулна уу"}
        </div>
        {searchResults.length > 0 && (
          <div className="mt-3 border rounded-md divide-y">
            {searchResults.map((u) => {
              const isSelected = selectedParentId === u._id;
              return (
                <button
                  key={u._id}
                  type="button"
                  onClick={() => {
                    if (selectedParentId === u._id) {
                      setSelectedParentId("");

                      return;
                    }

                    setSelectedParentId(u._id);
                    setParentEmail(u.email);
                  }}
                  className={`w-full text-left p-2 text-sm ${
                    isSelected ? "bg-green-50" : "hover:bg-gray-50"
                  } flex items-center justify-between`}
                >
                  <div>
                    <div className="font-medium">{u.email}</div>
                    {(u.firstName || u.lastName) && (
                      <div className="text-gray-500">
                        {`${u.firstName || ""} ${u.lastName || ""}`.trim()}
                      </div>
                    )}
                  </div>
                  {isSelected && (
                    <span className="text-green-600 text-base ml-2">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Сурагчийн нэр
        </label>
        <input
          type="text"
          value={childname}
          onChange={(e) => setChildname(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm sm:text-base p-2 sm:p-3"
          placeholder="Сурагчийн нэр"
          required
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base px-4 py-2"
          disabled={loading || !selectedParentId || !childname.trim()}
        >
          {loading ? "Adding..." : "Add Student"}
        </Button>
      </div>
    </form>
  );
};
