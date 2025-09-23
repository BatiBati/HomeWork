import { PhoneSvg } from "@/components/svg/PhoneSvg";
import { api } from "../../../../../../axios";
import { toast } from "sonner";
import { useAuth } from "@/provider/AuthProvider";
import { useState } from "react";
import { Input } from "@/components/ui/input";

import { LoadingSvg } from "@/components/svg/LoadingSvg";
import { Button } from "@/components/ui/button";

export const PhoneEdit = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState("");

  const handleChangeDayCareEmail = async () => {
    if (!user) {
      return;
    }
    setLoading(true);
    try {
      await api.patch(`/user/${user?._id}`, {
        ...user,
        phoneNumber: updatedPhoneNumber,
      });

      toast.success(`Утасны дугаар амжилттай шинэчлэгдлээ.`);
      setUpdatedPhoneNumber("");
    } catch {
      toast.error("Утасны дугаар солиход алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 shadow-2xl p-5 rounded-xl w-[50%]">
      <div className="flex  items-center gap-2 text-[13px]">
        <PhoneSvg /> Утасны дугаар
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-[12px]">Одоогийн утасны дугаар:</p>
          <Input
            className="p-5"
            disabled
            value={user?.phoneNumber || ""}
            readOnly
          />
        </div>
        <div>
          <p className="text-[12px]">Утасны дугаар:</p>
          <Input
            maxLength={8}
            placeholder="Дугаар оруулна уу."
            onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
          />
        </div>
        <Button
          disabled={updatedPhoneNumber === ""}
          onClick={handleChangeDayCareEmail}
          className="bg-[#5da19e] text-white hover:bg-[#4d827f] hover:text-white"
        >
          {loading ? <LoadingSvg /> : "Дугаар шинэчлэх"}
        </Button>
      </div>
    </div>
  );
};
