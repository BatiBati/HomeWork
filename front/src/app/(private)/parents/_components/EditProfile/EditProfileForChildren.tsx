"use client";

import { useAuth } from "@/provider/AuthProvider";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const EditProfileForChildren = () => {
  const { user } = useAuth();
  const [previewMap, setPreviewMap] = useState<Record<string, string>>({});
  const [fileMap, setFileMap] = useState<Record<string, File | null>>({});
  const [nameMap, setNameMap] = useState<Record<string, string>>({});

  const handleFileChange = (childId: string, file: File) => {
    setFileMap((prev) => ({ ...prev, [childId]: file }));
    setPreviewMap((prev) => ({
      ...prev,
      [childId]: URL.createObjectURL(file),
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {user?.children?.map((child) => {
        const preview = previewMap[child._id] || child.profilePicture || "";

        return (
          <div
            key={child._id}
            className="flex flex-col gap-4 shadow-lg p-5 rounded-xl w-full"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              👶 {child.firstName} {child.lastName}
            </div>

            <div className="flex flex-col items-center gap-3">
              {preview ? (
                <img
                  src={preview}
                  alt="child avatar"
                  className="w-20 h-20 rounded-full object-cover border"
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 text-xs">
                  No Avatar
                </div>
              )}
              <div className="flex flex-col items-center gap-2">
                <input
                  id={`file-${child._id}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileChange(child._id, e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor={`file-${child._id}`}
                  className="cursor-pointer bg-[#5da19e] text-white px-3 py-1 rounded-md hover:bg-[#4d827f] text-sm"
                >
                  Зураг сонгох
                </label>
                {fileMap[child._id] && (
                  <p className="text-xs text-gray-500">
                    {fileMap[child._id]?.name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs mb-1">Шинэ нэр:</p>
              <Input
                placeholder={child.firstName}
                value={nameMap[child._id] || ""}
                onChange={(e) =>
                  setNameMap((prev) => ({
                    ...prev,
                    [child._id]: e.target.value,
                  }))
                }
              />
            </div>

            <Button
              disabled={
                (!nameMap[child._id] || nameMap[child._id] === "") &&
                !fileMap[child._id]
              }
              className="bg-[#5da19e] text-white hover:bg-[#4d827f] text-sm"
            >
              Хүүхдийн мэдээлэл шинэчлэх
            </Button>
          </div>
        );
      })}
    </div>
  );
};
