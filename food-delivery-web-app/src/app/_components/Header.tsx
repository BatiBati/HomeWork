import { Button } from "@/components/ui/button";
import { Logo } from "./assets/Logo";
import { Aman } from "./assets/Aman";
import Link from "next/link";
import { FoodOrders } from "./FoodOrders";
import { useAuth } from "../_providers/AuthProvider";
import { useState } from "react";
import { EnterDeliveryAddress } from "./EnterDeliveryAddress";
import { SettingsSvg } from "./assets/Settings";

export const Header = () => {
  const { user, signOut } = useAuth();
  const [isUser, setIsUser] = useState<boolean>(false);
  const [deliverAddress, setDeliverAddress] = useState("");

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1440px] h-[68px]  flex justify-between items-center pl-[88px] pr-[88px] bg-[#18181B]">
        <Logo width={146} heigth={44} />
        {!user && (
          <div className="flex gap-3.5">
            <Link href={"/AuthenticationPage/signUp"}>
              <Button className="w-[75px] h-[36px] bg-[#f4f4f5] hover:bg-[#a39c9b] rounded-full text-[#18181B] cursor-pointer">
                Sign up
              </Button>
            </Link>
            <Link href={"/AuthenticationPage/signIn"}>
              <Button
                className="w-[75px] h-[36px] bg-[#EF4444] hover:text-[#EF4444] rounded-full cursor-pointer"
                variant="outline"
              >
                Log in
              </Button>
            </Link>
          </div>
        )}

        {user && (
          <div className="flex gap-5 relative">
            <EnterDeliveryAddress
              deliverAddress={deliverAddress}
              setDeliverAddress={setDeliverAddress}
            />
            <FoodOrders deliverAddress={deliverAddress} />
            <div className="flex  flex-col  z-10 ">
              <Button
                variant="outline"
                className="bg-[#EF4444] hover:bg-[#EF4444] w-9 h-9 rounded-full cursor-pointer "
                onClick={() => setIsUser(!isUser)}
              >
                <Aman />
              </Button>

              {isUser && (
                <div className="absolute -bottom-29 -right-15 w-fit h-[110px] rounded-xl p-4 bg-white flex flex-col justify-center gap-4">
                  <div>{user.email}</div>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={signOut}
                  >
                    Sign out
                  </Button>
                </div>
              )}
            </div>
            {user.role === "ADMIN" && (
              <div className="w-full h- full flex justify-center items-center text-white">
                <Link href={"/AdminPage/foodMenu"}>
                  <SettingsSvg />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
