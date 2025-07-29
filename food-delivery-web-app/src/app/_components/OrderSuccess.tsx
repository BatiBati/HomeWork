import { Button } from "@/components/ui/button";
import { useAuth } from "../_providers/AuthProvider";

export const OrderSuccess = () => {
  const { setOrderSuccess } = useAuth();
  return (
    <div className="absolute top-[100px] w-[800px] h-fit p-4 bg-white rounded-2xl flex flex-col justify-center items-center">
      <div>
        {" "}
        <div>
          <h1 className="font-bold text-[20px]">
            Your order has been successfully placed !
          </h1>
        </div>
        <div>
          <img src="/images/Boy.png" />
        </div>
      </div>
      <div>
        <Button
          className="p-5 px-8 rounded-full cursor-pointer"
          onClick={() => setOrderSuccess(false)}
        >
          Close
        </Button>
      </div>
    </div>
  );
};
