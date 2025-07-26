import Link from "next/link";
import { AdminPageLogo } from "./assets/Logo";
import { useState } from "react";
import { FoodMenu } from "./assets/FoodMenu";
import { Van } from "./assets/Van";
import { Settings } from "./assets/Settings";

export const AdminPageStyleChange = () => {
  const [adminMenu, setAdminMenu] = useState("/AdminPage/foodMenu");
  return (
    <div className="flex flex-col gap-10 h-full w-fit py-9 px-5">
      <div className="flex gap-2">
        <div className="w-[40px] h-[40px]">
          <AdminPageLogo />
        </div>
        <div>
          <div className="text-[18px] font-semibold">NomNom</div>
          <div className="text-[12px] text-[#71717A]">Swift delivery</div>
        </div>
      </div>
      <div className="flex flex-col gap-6 w-[150px] ">
        <Link
          onClick={() => {
            setAdminMenu("/AdminPage/foodMenu");
          }}
          href={"/AdminPage/foodMenu"}
        >
          <div
            className="flex items-center gap-[10px] py-2 px-6 cursor-pointer rounded-full "
            style={
              adminMenu === "/AdminPage/foodMenu"
                ? {
                    background: "#18181B",
                  }
                : {}
            }
          >
            <FoodMenu adminMenu={adminMenu} />
            <div
              className="text-[14px] text-[#09090b]"
              style={
                adminMenu === "/AdminPage/foodMenu" ? { color: "white" } : {}
              }
            >
              Food menu
            </div>
          </div>
        </Link>

        <Link
          onClick={() => {
            setAdminMenu("/AdminPage/orders");
          }}
          href={"/AdminPage/orders"}
        >
          <div
            className="flex items-center gap-[10px] py-2 px-6 cursor-pointer rounded-full "
            style={
              adminMenu === "/AdminPage/orders"
                ? {
                    background: "#18181B",
                    color: "white  ",
                  }
                : {}
            }
          >
            <Van adminMenu={adminMenu} />
            <div
              className="text-[14px] text-[#09090b]"
              style={
                adminMenu === "/AdminPage/orders" ? { color: "white" } : {}
              }
            >
              Orders
            </div>
          </div>
        </Link>

        <Link
          onClick={() => {
            setAdminMenu("/AdminPage/settings");
          }}
          href={"/AdminPage/settings"}
        >
          <div
            className="flex items-center gap-[10px] py-2 px-6 cursor-pointer rounded-full "
            style={
              adminMenu === "/AdminPage/settings"
                ? {
                    background: "#18181B",
                    color: "white  ",
                  }
                : {}
            }
          >
            <Settings adminMenu={adminMenu} />
            <div
              className="text-[14px] text-[#09090b]"
              style={
                adminMenu === "/AdminPage/settings" ? { color: "white" } : {}
              }
            >
              Settings
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
