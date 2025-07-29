"use client";
import { useEffect, useState } from "react";
import { FoodCard } from "./FoodCard";
import { api } from "../../../axios";

type ResponseOfCategoryType = {
  category: Categries[];
};

type Categries = {
  _id: string;
  categoryName: string;
};

export const HomePageFoodMenu = () => {
  const [categories, setCategories] = useState<Categries[]>([]);

  const getCategoryData = async () => {
    try {
      const response = await api.get<ResponseOfCategoryType>(`/category`);
      setCategories(response.data.category);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  console.log(categories);

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <div className="w-[1440px] flex justify-center bg-[#404040] pb-14">
      <div className="w-[1264px] ">
        {categories.map((category) => {
          return (
            <div
              key={category._id}
              className="text-[30px] font-semibold text-white flex flex-col gap-14 "
            >
              <div className="pt-14"> {category.categoryName}</div>
              <FoodCard id={category._id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
