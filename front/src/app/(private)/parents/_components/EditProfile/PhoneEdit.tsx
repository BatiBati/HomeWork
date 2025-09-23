"use client";

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

  const handleChangePhoneNumber = async () => {
    if (!user) return;
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
    <div className="flex flex-col gap-4 shadow-lg p-5 rounded-xl w-full sm:w-[300px] md:w-[48%]">
      <div className="flex items-center gap-2 text-sm">
        <PhoneSvg /> Утасны дугаар
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xs">Одоогийн утасны дугаар:</p>
          <Input
            className="p-3"
            disabled
            value={user?.phoneNumber || ""}
            readOnly
          />
        </div>
        <div>
          <p className="text-xs">Утасны дугаар:</p>
          <Input
            maxLength={8}
            placeholder="Дугаар оруулна уу."
            onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
          />
        </div>
        <Button
          disabled={updatedPhoneNumber === ""}
          onClick={handleChangePhoneNumber}
          className="bg-[#5da19e] text-white hover:bg-[#4d827f]"
        >
          {loading ? <LoadingSvg /> : "Дугаар шинэчлэх"}
        </Button>
      </div>
    </div>
  );
};
