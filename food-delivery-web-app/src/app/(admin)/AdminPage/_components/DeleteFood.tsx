import { Button } from "@/components/ui/button";
import { DeleteSvg } from "./assets/DeleteSvg";
import { toast } from "sonner";
import { api } from "../../../../../axios";

type FoodIdType = {
  foodId: string;
  getFood: () => Promise<void>;
};

export const DeleteFood = ({ foodId, getFood }: FoodIdType) => {
  const deleteFood = async () => {
    try {
      await api.delete(`/food/${foodId}`);
      await getFood();
      toast.success("Food deleted succesfully.");
    } catch (error) {
      console.error("Delete food error:", error);
      toast.error("Failed to delete food.");
    }
  };
  return (
    <Button
      type="submit"
      className="border-red-200 border-[1px]"
      onClick={deleteFood}
    >
      <DeleteSvg />
    </Button>
  );
};
