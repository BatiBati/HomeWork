"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { CategoryCompBot } from "../_components/CategoryCompBot";
import { CategoryCompTop } from "../_components/CategoryCompTop";
import { api } from "../../../../../axios";

export type FoodResponse = {
  foods: FoodType[];
};

export type FoodType = {
  _id: string;
  price: number;
  ingredients: string;
  image: string;
  foodName: string;
  createdAt: string;
  updatedAt: string;
  category: CategoryType;
};

type CategoryType = {
  categoryName: string;
  _id: string;
};

export default function Home() {
  const [foods, setFoods] = useState<FoodType[]>([]);

  const getFood = async () => {
    try {
      const foodResponse = await api.get<FoodResponse>(`/food/`);
      setFoods(foodResponse.data.foods);
    } catch (error) {
      console.error("Error fetching foods", error);
    }
  };

  useEffect(() => {
    getFood();
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-[#F4F4F5] p-10 w-full h-fit ">
      <div className="w-full flex justify-end">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full flex flex-col gap-4 p-6 bg-white rounded-xl">
        <div className=" text-[20px] font-semibold">Dish Category</div>
        <div className="w-full flex  gap-3 items-center">
          <CategoryCompTop foodsLength={foods.length} />
        </div>
      </div>

      <CategoryCompBot />
    </div>
  );
}
