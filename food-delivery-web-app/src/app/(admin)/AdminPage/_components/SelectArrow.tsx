import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { DownArrow } from "./assets/DownArrow";
import { FoodType } from "./DataTable";
import { useState } from "react";

type Props = {
  foodOrderItems: FoodsTypes[];
};

type FoodsTypes = {
  food: FoodType;
  quantity: number;
};

export const SelectArrow = ({ foodOrderItems }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="w-full h-full flex justify-center items-center">
          <Button className="bg-white hover:bg-white w-4 h-4">
            <DownArrow />
          </Button>
        </div>
      </PopoverTrigger>
      {open && (<PopoverContent className="p-3 gap-3 rounded-md w-[300px] h-fit flex flex-col">
        {foodOrderItems.map((food) => {
          return (
            <div
              className="w-full h-fit flex items-center justify-between gap-[20px]"
              key={food.food._id}
            >
              <div className="flex gap-[10px] items-center">
                <div className="rounded-sm overflow-hidden ">
                  <img
                    src={food.food.image}
                    alt="Food image"
                    className="w-[50px] h-[42px]"
                  />
                </div>
                <div className="text-[12px]">{food.food?.foodName}</div>
              </div>
              <div className="flex gap-1">
                {food.quantity && <div>x</div>}
                {food.quantity}
              </div>
            </div>
          );
        })}
      </PopoverContent>)}
    </Popover>
  );
};
