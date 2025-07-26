"use client";
import { useEffect, useState } from "react";
import { api } from "../../../../../axios";

type CatIdType = {
  categoryId: string;
};

type Response = {
  Count: number;
};

export const FoodCount = ({ categoryId }: CatIdType) => {
  const [foodCount, setFoodCount] = useState<number>(0);
  const getFoodCount = async () => {
    try {
      const countRespone = await api.get<Response>(
        `/food/count?categoryId=${categoryId}`
      );
      setFoodCount(countRespone.data.Count);
    } catch (error) {
      console.error("Error foodCount category", error);
    }
  };
  useEffect(() => {
    getFoodCount();
  }, []);

  return (
    <div>
      {foodCount !== 0 && (
        <div
          key={categoryId}
          className="py-[2px] px-[10px] bg-[#18181b] rounded-full text-white"
        >
          {foodCount}
        </div>
      )}
    </div>
  );
};
