"use client";
import { useEffect, useState } from "react";
import { Foods } from "./Foods";
import { api } from "../../../../../axios";
import { useAuth } from "@/app/_providers/AuthProvider";

type Response = {
  category: CategoryType[];
};

type CategoryType = {
  categoryName: string;
  _id: string;
};

export const CategoryCompBot = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const { food } = useAuth();
  const [foodNameInput, setFoodNameInput] = useState("");
  const getCategoryData = async () => {
    try {
      const response = await api.get<Response>(`/category`);
      setCategories(response.data.category);
    } catch (error) {
      console.error("Error fetching category", error);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <div className="flex flex-col gap-5 ">
      {categories.map((category) => {
        return (
          <div
            className="w-full bg-white p-5 rounded-xl flex gap-5"
            key={category._id}
          >
            <div className="w-full flex ">
              <Foods
                categoryId={category._id}
                categoryName={category.categoryName}
                setFoodNameInput={setFoodNameInput}
                foodNameInput={foodNameInput}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
