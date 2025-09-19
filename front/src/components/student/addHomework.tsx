"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { api } from "../../../axios";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

export const AddHomework = ({
  fetchStudent,
  studentId,
  taskId,
}: {
  fetchStudent: () => void;
  studentId: string;
  taskId: string;
}) => {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const uploadedUrls: string[] = [];
      for (const file of images) {
        const url = await uploadToCloudinary(file);
        uploadedUrls.push(url);
      }

      const body = {
        studentId,
        taskId,
        description,
        status: true,
        image: uploadedUrls,
      };

      await api.post("/homework", body);

      alert("Даалгавар илгээгдлээ!");
      setOpen(false);
      setDescription("");
      setImages([]);
      fetchStudent();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Алдаа гарлаа!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-2">Даалгавар оруулах</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Шинэ даалгавар оруулах</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Textarea
            placeholder="Даалгаврын тайлбар..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />

          <div className="flex gap-2 flex-wrap">
            {images.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Илгээж байна..." : "Илгээх"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
