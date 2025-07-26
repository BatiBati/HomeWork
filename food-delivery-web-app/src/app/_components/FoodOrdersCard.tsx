import { Coffee } from "./assets/Coffee";
import { OneFood } from "./UserLastOrder";

type FoodOrdersCardProps = {
  orderFoods: foodOrderItems[];
};
type foodOrderItems = {
  food: OneFood;
  quantity: number;
  _id: string;
};

export const FoodOrdersCard = ({ orderFoods }: FoodOrdersCardProps) => {
  // console.log(orderFoods.map((item) => item.food?.foodName));

  return (
    <div>
      {orderFoods.map((item) => {
        return (
          <div className="flex w-full justify-between" key={item._id}>
            <div className="text-[#71717A] text-[12px] flex gap-3">
              <Coffee /> {item.food.foodName}
            </div>
            <div>x {item.quantity}</div>
          </div>
        );
      })}
    </div>
  );
};
