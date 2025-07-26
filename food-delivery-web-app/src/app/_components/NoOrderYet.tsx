
import { LogoHand } from "./assets/LogoHand";

export const NoOrderYet = () => {
  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full h-full bg-[#F4F4F5] rounded-xl flex flex-col items-center p-4 gap-1">
        <LogoHand />
        <div>No Orders Yet?</div>
        <div className="w-full flex flex-col items-center">
          🍕 You havent placed any orders yet. Start exploring our menu and
          satisfy your cravings!
        </div>
      </div>
    </div>
  );
};
