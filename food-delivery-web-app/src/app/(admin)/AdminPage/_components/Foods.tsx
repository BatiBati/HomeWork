"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FoodResponse, FoodType } from "../foodMenu/page";
import { FoodAddComp } from "./FoodAddComp";
import { FoodEditButton } from "./FoodEditButton";
import { api } from "../../../../../axios";

export type FoodsProps = {
  categoryId: string;
  categoryName: string;
  setFoodNameInput: Dispatch<SetStateAction<string>>;
  foodNameInput: string;
};

export const Foods = ({ categoryId, categoryName }: FoodsProps) => {
  const [foods, setFoods] = useState<FoodType[]>([]);

  const getFood = async () => {
    try {
      const foodResponse = await api.get<FoodResponse>(
        `/food?categoryId=${categoryId}`
      );
      setFoods(foodResponse.data.foods);
    } catch (error) {
      console.error("Error fetching foods", error);
    }
  };
  useEffect(() => {
    getFood();
  }, []);

  return (
    <div className="flex flex-wrap gap-5 w-full ">
      <div className="w-full text-[20px] font-semibold">
        {categoryName} ({foods.length})
      </div>
      <FoodAddComp
        categoryName={categoryName}
        categoryId={categoryId}
        getFood={getFood}
        foods={foods}
      />
      {foods.map((food) => {
        return (
          <div
            className="w-[270px] h-[241px] bg-white rounded-[20px] overflow-hidden flex flex-col p-4 gap-5 border-[1px]"
            key={food._id}
          >
            <div className="rounded-xl overflow-hidden h-[210px] relative ">
              <img
                src={`${food.image}`}
                alt="Food image"
                className="h-full w-full rounded-xl"
              />
              <div className="absolute right-[10px] bottom-[5px] w-11 h-11 rounded-full flex justify-center items-center">
                <FoodEditButton
                  categoryId={categoryId}
                  categoryName={categoryName}
                  foodId={food._id}
                  foodName={food.foodName}
                  foodPrice={food.price}
                  foodIngredients={food.ingredients}
                  foodImage={food.image}
                  getFood={getFood}
                />
              </div>
            </div>

            <div className="w-full gap-2 h-fit flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="text-[#EF4444] font-medium">{food.foodName}</p>
                <p className="text-black text-[12px] font-normal">
                  $ {food.price}
                </p>
              </div>
              <p className="text-black text-[12px] font-normal">
                {food.ingredients}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
