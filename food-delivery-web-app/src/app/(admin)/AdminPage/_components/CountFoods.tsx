"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { api } from "../../../../../axios";

type CategoryId = {
  categoryId: string;
  categoryName: string;
};

export const CountFoods = ({ categoryId, categoryName }: CategoryId) => {
  const [foodCount, setFoodCount] = useState();
  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const response = await api.get(`/food/count?categoryId=${categoryId}`);
        setFoodCount(response.data.Count);
      } catch (error) {
        console.error("Error fetching category", error);
      }
    };
    getCategoryData();
  }, []);

  return (
    <Button className="rounded-full">
      <div>{categoryName}</div>
      <div className="bg-black text-white rounded-full px-[10px] py-[2px]">
        {foodCount}
      </div>
    </Button>
  );
};
