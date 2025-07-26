"use client";

import { TodayOfferFood } from "../_components/TodayOfferFood";
import { CategoryNames } from "../_components/CategoryNames";
import { HomePageFoodMenu } from "../_components/HomePageFoodMenu";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <TodayOfferFood />
      <CategoryNames />
      
      <HomePageFoodMenu />
    </div>
  );
}
