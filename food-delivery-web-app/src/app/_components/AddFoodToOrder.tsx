"use client";
import { Button } from "@/components/ui/button";
import { PlusSvg } from "./assets/PlusSvg";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

type Food = {
  foodId: number;
  foodImage: string;
  foodName: string;
  foodIngredients: string;
  foodPrice: number;
};

type FoodItem = Food & { quantity: number } & { oneFoodTotalPrice: number } & {
  // totalPrice: number;
};

export const AddFoodToOrder = ({
  foodId,
  foodImage,
  foodName,
  foodIngredients,
  foodPrice,
}: Food) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const oneFoodTotalPrice = quantity * foodPrice;
  // const [totalPrice, setTotalPrice] = useState(0);


  const handleMinusFood = () => {
    if (quantity === 0) {
      setQuantity(0);
    }
    if (quantity !== 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCard = () => {
    const newFoodItem: FoodItem = {
      foodId,
      foodName,
      foodIngredients,
      foodPrice,
      foodImage,
      quantity,
      oneFoodTotalPrice,
      // totalPrice,
    };
    if (quantity > 0) {
      try {
        const existing: FoodItem[] = JSON.parse(
          localStorage.getItem("foodOrder") || "[]"
        );

        const existingIndex = existing.findIndex(
          (item) => item.foodName === newFoodItem.foodName
        );

        if (existingIndex !== -1) {
          existing[existingIndex].quantity += newFoodItem.quantity;
          localStorage.setItem("foodOrder", JSON.stringify(existing));
        } else {
          const updated = [...existing, newFoodItem];
          localStorage.setItem("foodOrder", JSON.stringify(updated));
        }

        toast.success("Food is being added to the cart!");
        setOpen(false);
      } catch (error) {
        console.error("Failed to add", error);
        toast.error("Food add failed");
      }
    } else {
      toast.error("Can't order 0 food");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="absolute right-3 bottom-2 w-11 h-11 bg-white rounded-full flex justify-center items-center cursor-pointer"
          variant={"outline"}
        >
          <PlusSvg stroke={"#EF4444"} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[826px] h-[412px]">
        <div className="flex gap-5 h-full">
          <div className="w-[50%] h-full">
            <img
              src={`${foodImage}`}
              alt="FoodImage"
              className="h-full w-full rounded-xl"
            />
          </div>
          <div className="w-[50%] h-full flex flex-col justify-between">
            <DialogHeader>
              <DialogTitle className="text-[30px] text-[#EF4444]">
                {foodName}
              </DialogTitle>
              <div className="w-full">{foodIngredients}</div>
            </DialogHeader>

            <div className="flex flex-col gap-5">
              <div className="w-full flex justify-between items-center">
                <div>
                  <div className="text-[16px] font-normal">Total price</div>
                  <div className="font-semibold text-[24px]">
                    ${oneFoodTotalPrice}
                  </div>
                </div>
                <div className=" flex items-center gap-3">
                  <Button className="rounded-full" onClick={handleMinusFood}>
                    -
                  </Button>
                  <div>{quantity}</div>
                  <Button
                    className="rounded-full"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="bg-black text-white rounded-full w-full"
                  onClick={() => handleAddToCard()}
                >
                  Add to card
                </Button>
              </DialogFooter>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
