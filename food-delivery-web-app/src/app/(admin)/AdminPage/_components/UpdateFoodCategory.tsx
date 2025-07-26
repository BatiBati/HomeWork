"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { api } from "../../../../../axios";

type Response = {
  category: CategoryType[];
};

type CategoryType = {
  _id: string;
  categoryName: string;
};

type CategoryIdType = {
  categoryId: string;
  setSelectedCategoryId: (value: string) => void;
};

export const UpdateFoodCategory = ({
  categoryId,
  setSelectedCategoryId,
}: CategoryIdType) => {
  const [category, setCategory] = useState<CategoryType[]>([]);

  const getCategoryData = async () => {
    try {
      const categoryResponse = await api.get<Response>(`/category/`);

      setCategory(categoryResponse.data.category);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };
  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <Select
      defaultValue={categoryId}
      onValueChange={(value) => setSelectedCategoryId(value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <div className="flex flex-col gap-2">
            {category.map((category) => {
              return (
                <SelectItem
                  value={`${category._id}`}
                  key={category._id}
                  className="bg-[#f4f4f5] rounded-full h-fit w-fit flex justify-center pr-7 "
                >
                  {category.categoryName}
                </SelectItem>
              );
            })}
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
