"use client";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ShoppingBox } from "./assets/ShoppingBox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { UserLastOrder } from "./UserLastOrder";
import { useAuth } from "../_providers/AuthProvider";
import { NoOrderYet } from "./NoOrderYet";
import { toast } from "sonner";
import { api } from "../../../axios";
export type Food = {
  foodId: string;
  foodImage: string;
  foodName: string;
  foodIngredients: string;
  foodPrice: number;
  quantity: number;
  oneFoodTotalPrice: number;
};

type FoodsType = {
  _id: string;
  totalPrice: number;
  status: string;
  user: UserType;
  foodOrderItems: foodOrderItems[];
  deliveryAddress: string;
  createdAt: string;
  updatedAt: string;
};
type UserType = {
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
};
type foodOrderItems = {
  _id: string;
  quantity: number;
  food: OneFood;
};

type OneFood = {
  _id: string;
  price: number;
  ingredients: string;
  image: string;
  foodName: string;
  createdAt: string;
};

type PropsType = {
  deliverAddress: string;
};

export const GetFoodOrderLocalStorage = ({ deliverAddress }: PropsType) => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState("cart");
  const [foodDataFromLocalStorage, setFoodDataFromLocalStorage] =
    useState<Food[]>();
  const [loading, setLoading] = useState(false);
  const shipping = 0.99;
  const [orderData, setOrderData] = useState<FoodsType[]>([]);

  const ITEMS_TOTAL =
    foodDataFromLocalStorage?.reduce(
      (acc, item) => acc + item.foodPrice * item.quantity,
      0
    ) || 0;

  const TOTAL_PRICE = ITEMS_TOTAL + shipping;

  useEffect(() => {
    const existing: Food[] = JSON.parse(
      localStorage.getItem("foodOrder") || "[]"
    );

    setFoodDataFromLocalStorage(existing);
  }, []);

  const handleDeleteFood = (foodId: string) => {
    setLoading(true);
    const updatedData = foodDataFromLocalStorage?.filter(
      (food) => food.foodId !== foodId
    );

    setFoodDataFromLocalStorage(updatedData);
    localStorage.setItem("foodOrder", JSON.stringify(updatedData));
    setLoading(false);
  };

  const handlePlusFood = (foodId: string, foodPrice: number) => {
    let updatedData = [...(foodDataFromLocalStorage || [])];

    updatedData = updatedData.map((item) => {
      if (item.foodId === foodId) {
        return {
          ...item,
          quantity: item.quantity + 1,
          oneFoodTotalPrice: item.quantity * foodPrice + item.foodPrice,
        };
      }
      return item;
    });

    setFoodDataFromLocalStorage(updatedData);

    localStorage.setItem("foodOrder", JSON.stringify(updatedData));
  };

  const handleMinusFood = (foodId: string, foodPrice: number) => {
    let updatedData = [...(foodDataFromLocalStorage || [])];
    updatedData = updatedData.map((item) => {
      if (item.foodId === foodId) {
        return {
          ...item,
          quantity: item.quantity - 1,
          oneFoodTotalPrice: item.quantity * foodPrice - item.foodPrice,
        };
      }
      return item;
    });
    setFoodDataFromLocalStorage(updatedData);

    localStorage.setItem("foodOrder", JSON.stringify(updatedData));
  };

  const foodArray = foodDataFromLocalStorage?.map((item) => ({
    food: item.foodId,
    quantity: item.quantity,
  }));

  const handleOrderFoods = async () => {
    try {
      const { data } = await api.get(`/foodOrder?userId=${user?._id}`);
      setOrderData(data.foodOrder);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    handleOrderFoods();
  }, []);

  const putFoodsRequest = async () => {
    if (deliverAddress === "") {
      toast.error("Please enter deliver address.");
    }
    try {
      const foodOrderOfUser = api.post(`/foodOrder/post`, {
        user: user?._id,
        totalPrice: ITEMS_TOTAL,
        foodOrderItems: foodArray,
        status: "PENDING",
        deliveryAddress: deliverAddress,
      });
      localStorage.removeItem("foodOrder");
      setFoodDataFromLocalStorage([]);
      setSelectedTab("order");
      handleOrderFoods();
      console.log(foodOrderOfUser);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <SheetHeader>
      <SheetTitle>
        <div className="flex w-full gap-3 items-center">
          <ShoppingBox width="24px" height="24px" stroke="#fff" />
          <p className="text-[20px] font-semibold text-white">Order detail</p>
        </div>
      </SheetTitle>
      <div className="flex w-full h-fit">
        <Tabs
          defaultValue="cart"
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 rounded-full w-full">
            <TabsTrigger
              value="cart"
              style={
                selectedTab === "cart"
                  ? { backgroundColor: "#EF4444", color: "white" }
                  : {}
              }
              className="rounded-full"
            >
              Cart
            </TabsTrigger>
            <TabsTrigger
              value="order"
              style={
                selectedTab === "order"
                  ? { backgroundColor: "#EF4444", color: "white" }
                  : {}
              }
              className="rounded-full"
              onClick={() => handleOrderFoods()}
            >
              Order
            </TabsTrigger>
          </TabsList>
          <div>
            <TabsContent value="cart" className="flex flex-col gap-6 w-full">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[20px] font-semibold">
                    My cart
                  </CardTitle>
                </CardHeader>
                {!foodDataFromLocalStorage ? null : foodDataFromLocalStorage.length ===
                  0 ? (
                  <NoOrderYet />
                ) : (
                  <CardContent className="space-y-2">
                    {foodDataFromLocalStorage?.map((food) => {
                      return (
                        <div key={food.foodId}>
                          {loading === true ? (
                            <Loader />
                          ) : (
                            <div className="space-y-1 flex w-full gap-[10px]">
                              <img
                                src={`${food.foodImage}`}
                                alt="FoodImage"
                                className="w-[120px] h-[135px] rounded-xl"
                              />

                              <div className="w-full h-fit flex flex-col gap-2">
                                <div className="flex w-full justify-between">
                                  <div className="text-[#EF4444] font-bold text-[16px]">
                                    {food.foodName}
                                  </div>
                                  <Button
                                    className="rounded-full border-[1px] border-[#EF4444] text-[#EF4444] hover:text-[#EF4444] cursor-pointer"
                                    variant="outline"
                                    onClick={() =>
                                      handleDeleteFood(food.foodId)
                                    }
                                  >
                                    X
                                  </Button>
                                </div>
                                <div>{food.foodIngredients}</div>
                                <div className="w-full flex justify-between items-center">
                                  <div className="flex gap-2 items-center">
                                    <Button
                                      className="rounded-full"
                                      onClick={() =>
                                        handleMinusFood(
                                          food.foodId,
                                          food.foodPrice
                                        )
                                      }
                                    >
                                      -
                                    </Button>
                                    {food.quantity}
                                    <Button
                                      className="rounded-full"
                                      onClick={() =>
                                        handlePlusFood(
                                          food.foodId,
                                          food.foodPrice
                                        )
                                      }
                                    >
                                      +
                                    </Button>
                                  </div>
                                  <div>${food.oneFoodTotalPrice}</div>
                                </div>
                              </div>
                            </div>
                          )}
                          {foodDataFromLocalStorage.length! === 0 ? (
                            ""
                          ) : (
                            <div className="w-full border-[2px] border-dashed mt-5 mb-5"></div>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                )}
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-[20px] font-semibold">
                    Payment info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1 w-full flex flex-col gap-2">
                    <div className="w-full flex justify-between">
                      <div className="text-[#71717A]">Items</div>
                      <div className="text-[#09090B] font-bold text-[16px]">
                        {ITEMS_TOTAL}
                      </div>
                    </div>
                    <div className="w-full flex justify-between">
                      <div className="text-[#71717A]">Shipping</div>
                      <div className="text-[#09090B] font-bold text-[16px]">
                        {foodDataFromLocalStorage?.length === 0
                          ? "$0"
                          : `$${shipping}`}
                      </div>
                    </div>
                    <div className="w-full border-[2px] border-dashed"></div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="text-[#71717A]">Total</div>
                    <div className="text-[#09090B] font-bold text-[16px]">
                      {foodDataFromLocalStorage?.length === 0
                        ? "$0.00"
                        : ` $${TOTAL_PRICE}`}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full rounded-full border-[1px] bg-[#EF4444] hover:bg-[#EF4444] hover:text-white text-white cursor-pointer"
                    onClick={() => putFoodsRequest()}
                    disabled={foodDataFromLocalStorage?.length === 0}
                  >
                    Checkout
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
          <UserLastOrder foodOrder={orderData} />
        </Tabs>
      </div>
    </SheetHeader>
  );
};
