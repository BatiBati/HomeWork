"use client";

import { TodayOfferFood } from "../_components/TodayOfferFood";
import { CategoryNames } from "../_components/CategoryNames";
import { HomePageFoodMenu } from "../_components/HomePageFoodMenu";
import { useAuth } from "../_providers/AuthProvider";
import { OrderSuccess } from "../_components/OrderSuccess";

export default function Home() {
  const { orderSuccess } = useAuth();
  return (
    <div className="flex flex-col items-center relative">
      <TodayOfferFood />
      <CategoryNames />
      <HomePageFoodMenu />
      {orderSuccess === true && <OrderSuccess />}
    </div>
  );
}
