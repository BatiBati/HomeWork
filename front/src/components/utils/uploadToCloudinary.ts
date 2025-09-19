// utils/uploadToCloudinary.ts
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const UPLOAD_PRESENT = "foodWeb";
  const CLOUD_NAME = "dhamxqczz";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESENT);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Cloudinary upload failed");

  const data = await res.json();
  return data.secure_url;
};
