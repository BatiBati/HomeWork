"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "../../../../axios";
import { AxiosError } from "axios";

export function AddTaskForm({
  teacherId,
  token,
}: {
  teacherId: string;
  token: string;
  onCreated?: () => void;
}) {
  const [lessonName, setLessonName] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [homeWork, setHomeWork] = useState("");
  const [taskEndSchedule, setTaskEndSchedule] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages((prev) => [...prev, ...files]);
      setPreviewUrls((prev) => [
        ...prev,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };
  const uploadImagesToCloudinary = async () => {
    const uploadedUrls: string[] = [];
    for (const file of images) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      if (data.secure_url) uploadedUrls.push(data.secure_url);
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherId || !token) return;

    setLoading(true);
    try {
      // Upload images
      const uploadedUrls = await uploadImagesToCloudinary();

      const res = await api.post(
        `task/create`,
        {
          lessonName,
          image: uploadedUrls,
          homeWork,
          taskEndSchedule,
          teacherId, // login-оос ирсэн _id
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 🔑 энд JWT заавал дамжуулна
          },
        }
      );

      console.log("✅ API Response:", res.data);
      toast.success("Task created successfully!");

      // Reset form
      setLessonName("");
      setHomeWork("");
      setTaskEndSchedule("");
      setImages([]);
      setPreviewUrls([]);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error(
        "❌ Error creating task:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Error creating task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1">Хичээлийн нэр</label>
        <select
          value={lessonName}
          onChange={(e) => setLessonName(e.target.value)}
          required
          className="w-full border rounded p-2"
        >
          <option value="" className="text-gray-500">
            -Хичээл сонгох-
          </option>
          <option value="Математик">Математик</option>
          <option value="Англи хэл">Англи хэл</option>
          <option value="Монгол хэл">Монгол хэл</option>
          <option value="Байгалийн ухаан">Байгалийн ухаан</option>
          <option value="Нийгмийн ухаан">Нийгмийн ухаан</option>
        </select>
      </div>

      <div>
        <label>Даалгаварийн дэлгэрэнгүй</label>
        <textarea
          value={homeWork}
          onChange={(e) => setHomeWork(e.target.value)}
          required
          className="w-full border rounded p-1"
        />
      </div>

      <div>
        <label>Даалгавар дуусах хугацаа</label>
        <input
          type="datetime-local"
          value={taskEndSchedule}
          onChange={(e) => setTaskEndSchedule(e.target.value)}
          required
          className="w-full border rounded p-1"
        />
      </div>

      <div>
        <label>Зураг оруулах</label>
        <br />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="cursor-pointer"
        />
      </div>

      {previewUrls.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {previewUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt="preview"
              className="w-24 h-24 object-cover rounded"
            />
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Үүсгэж байна..." : "Даалгавар үүсгэх"}
        </Button>
      </div>
    </form>
  );
}
