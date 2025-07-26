"use client";

import { useEffect, useState } from "react";
import { LogoCol } from "./assets/LogoCol";
import { motion } from "framer-motion";
import { api } from "../../../axios";

const runningWords = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11];

export type Response = {
  category: Categories[];
};

export type Categories = {
  categoryName: string;
  _id: string;
};

export const Footer = () => {
  const [categories, setCategory] = useState<Categories[]>([]);

  const getCategoryData = async () => {
    try {
      const response = await api.get<Response>(`/category`);
      setCategory(response.data.category);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1440px] h-[755px] bg-[#18181B] text-white relative overflow-hidden">
        <div className="w-full absolute top-[60px]">
          <div className="flex w-screen h-fit text-white overflow-y-scroll top-15 flex-row bg-[#EF4444]">
            <motion.div
              animate={{ x: ["-0%", "-10%", "-20%", "-30%", "-42%"] }}
              transition={{
                duration: 15,
                ease: "linear",
                repeat: Infinity,
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
              className="flex h-15 flex-row text-nowrap  gap-7 justify-start items-center "
            >
              {runningWords.map((_, index) => {
                return (
                  <div className="text-[30px] font-semibold" key={index}>
                    Fresh fast delivered
                  </div>
                );
              })}
            </motion.div>
          </div>

          <div className=" flex justify-center">
            <div className="w-fit flex justify-center absolute top-[228px]">
              <div className="w-[1264px] h-fit relative flex justify-center gap-28">
                <div className="absolute left-0 top-0">
                  <LogoCol />
                </div>
                <div className="w-fit gap-4 flex flex-col">
                  <span className="text-[#71717A]">NOMNOM</span>
                  <span>Home</span>
                  <span>Contact us</span>
                  <span>Delivery zone</span>
                </div>
                <div className="w-fit gap-4 flex flex-col">
                  <span className="text-[#71717A]">Menu</span>
                  <div className="grid grid-cols-3 gap-4">
                    {categories.map((item, index) => {
                      return (
                        <span key={index} className="cursor-pointer">
                          {item.categoryName}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="w-fit flex flex-col gap-4">
                  <span className="text-[#71717A]">Follow us</span>
                  <div className="flex gap-4 py-[5px]  h-fit w-fit ">
                    <img
                      src="/images/Facebook.png"
                      alt="Logo"
                      className="w-7 h-6.5"
                    />
                    <img
                      src="/images/Instagram.png"
                      alt="Logo"
                      className="w-7 h-6.5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-[560px] flex justify-center w-full">
            <div className="w-full flex justify-center">
              <div className="w-[1264px] flex gap-12 pt-8 pb-8 border-t-[1px] border-t-[#71717A]">
                <div className="text-[#71717A]">Copy right © Nomnon LLC</div>
                <div className="text-[#71717A]">Privacy Policy</div>
                <div className="text-[#71717A]">Terms and conditoin</div>
                <div className="text-[#71717A]">Cookie policy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
