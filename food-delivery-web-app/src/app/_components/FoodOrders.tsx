"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBox } from "./assets/ShoppingBox";
import { useEffect, useState } from "react";
import { Food, GetFoodOrderLocalStorage } from "./FoodOrderLocalStorage";
type DeliveryAddressType = {
  deliverAddress: string;
};
export const FoodOrders = ({ deliverAddress }: DeliveryAddressType) => {
  const [orderFoods, setOrderFoods] = useState<Food[]>([]);

  useEffect(() => {
    const existing: Food[] = JSON.parse(
      localStorage.getItem("foodOrder") || "[]"
    );
    console.log(existing);

    setOrderFoods(existing);
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="bg-white w-9 h-9 rounded-full relative cursor-pointer"
          variant={"outline"}
        >
          <ShoppingBox width="100px" height="13px" stroke="#000" />
          {orderFoods.length > 0 && (
            <div className="absolute right-[-10px] top-[-10px] w-[20px] h-[20px] bg-[#ef4444] rounded-full">
              {orderFoods.length}
            </div>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="!w-[520px] !max-w-none bg-[#404040] rounded-tl-[30px] rounded-bl-[30px] border-0 p-5 ">
        <GetFoodOrderLocalStorage deliverAddress={deliverAddress} />
      </SheetContent>
    </Sheet>
  );
};
