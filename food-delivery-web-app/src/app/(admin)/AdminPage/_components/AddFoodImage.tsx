"use client";
import axios from "axios";
import { AddPictureSvg } from "./assets/AddPictureSvg";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const UPLOAD_KEY = "Food_images";
const IMAGE_API_KEY = "dazhij9zy";

type AddFoodImageType = {
  setDeployedImageUrl: (value: string) => void;
  deployedImageUrl: string;
};
export const AddFoodImage = ({
  setDeployedImageUrl,
  deployedImageUrl,
}: AddFoodImageType) => {
  const [loading, setLoading] = useState(false);

  const uploadImageFunction = async (file: File | undefined) => {
    if (!file) {
      return null;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_KEY);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${IMAGE_API_KEY}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = response.data.url;
      return result;
    } catch (error) {
      console.error("failed to upload image", error);
    }
  };

  const deployImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setLoading(true);
      const result = await uploadImageFunction(files[0]);
      setDeployedImageUrl(result);
      setLoading(false);
    }
  };

  return (
    <div>
      {!deployedImageUrl && (
        <div className="w-full h-[140px] relative flex justify-center items-center bg-[#dee6f9] rounded-xl border-[4px] border-dotted border-[#c3c9f5]">
          <input
            type="file"
            className="w-full h-full flex flex-col justify-center items-center absolute text-[#dee6f9] z-10"
            onChange={deployImg}
          />
          {loading ? (
            <Loader />
          ) : (
            <div className="absolute flex flex-col items-center justify-start  gap-5">
              <div className="p-3 rounded-full bg-white ">
                <AddPictureSvg />
              </div>
              <div className="text-[#6e7289]">
                Choose a file or drag & drop it here
              </div>
            </div>
          )}
        </div>
      )}

      {deployedImageUrl && (
        <div className="relative">
          <img
            src={`${deployedImageUrl}`}
            alt="DeployedImageUrl"
            className="w-full h-[138px] rounded-xl"
          />
          <Button
            className="absolute right-3 top-3 rounded-full "
            onClick={() => {
              setDeployedImageUrl("");
            }}
          >
            X
          </Button>
        </div>
      )}
    </div>
  );
};
