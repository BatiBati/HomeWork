import { Button } from "@/components/ui/button";
import { DeleteSvg } from "./assets/DeleteSvg";
import { toast } from "sonner";
import { api } from "../../../../../axios";
import { useState } from "react";
import { LoadingSvg } from "@/app/_components/assets/LoadingSvg";

type FoodIdType = {
  foodId: string;
  getFood: () => Promise<void>;
};

export const DeleteFood = ({ foodId, getFood }: FoodIdType) => {
  const [loading, setLoading] = useState(false);
  const deleteFood = async () => {
    setLoading(true);
    try {
      await api.delete(`/food/${foodId}`);
      await getFood();
      toast.success("Food deleted succesfully.");
    } catch (error) {
      console.error("Delete food error:", error);
      toast.error("Failed to delete food.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      type="button"
      className="border-red-200 border-[1px]"
      onClick={deleteFood}
    >
      {loading === false ? <DeleteSvg /> : <LoadingSvg />}
    </Button>
  );
};
