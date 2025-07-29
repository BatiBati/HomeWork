"use client";

import { useEffect, useState } from "react";
import { DatePickerWithRange } from "../_components/DatePickerWithRange";
import { DataTable, FoodOrderType, Response } from "../_components/DataTable";
import { PaginationPage } from "../_components/PaginationPage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "../../../../../axios";

export default function Order() {
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
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-[#F4F4F5] p-10 w-full h-fit">
      <div className="w-full flex justify-end">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="h-full w-full bg-white rounded-lg overflow-hidden ">
        <div className=" p-4 flex justify-between items-center">
          <div>
            <div className="text-[20px] font-bold">Orders</div>
            <div className="text-[12px] font-medium text-[#71717A]">
              {orderLength.length} items
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <DatePickerWithRange />
          </div>
        </div>
        <div>
          <DataTable />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <PaginationPage orderLength={orderLength} />
      </div>
    </div>
  );
}
