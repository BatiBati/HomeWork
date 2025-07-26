"use client";

import { DataTable, FoodOrderType, Response } from "./DataTable";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { useEffect, useState } from "react";
import { api } from "../../../../../axios";

export const Order = () => {
  const [orderLength, setOrderLength] = useState<FoodOrderType[]>([]);

  const getFoodOrder = async () => {
    try {
      const response = await api.get<Response>(`/foodOrder`);
      setOrderLength(response.data.foodOrder);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getFoodOrder();
  }, [orderLength]);
  return (
    <div className="flex flex-col gap-2 ">
      <div className="w-full flex justify-end">
        <img src="/images/AdminAvatar.png" alt="Avatar" />
      </div>
      <div className="h-full w-full bg-white rounded-lg overflow-hidden">
        <div className=" p-4 flex justify-between items-center bg-[#f4f4f5]">
          <div>
            <div className="text-[20px] font-bold">Orders</div>
            <div className="text-[12px] font-medium text-[#71717A]">
              {orderLength.length} items
            </div>
          </div>
          <div className="flex gap-3 ">
            <DatePickerWithRange />
          </div>
        </div>
        <div>
          <DataTable />
        </div>
      </div>
    </div>
  );
};
