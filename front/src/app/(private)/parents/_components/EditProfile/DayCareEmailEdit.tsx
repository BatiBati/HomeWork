"use client";

import { Input } from "@/components/ui/input";
import { api } from "../../../../../../axios";
import { useAuth } from "@/provider/AuthProvider";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoadingSvg } from "@/components/svg/LoadingSvg";
import { EmailSvg } from "@/components/svg/EmailSvg";

export const DayCareEmailEdit = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [updatedDaycareEmail, setUpdatedDaycareEmail] = useState("");

  const handleChangeDayCareEmail = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await api.patch(`/user/${user?._id}`, {
        ...user,
        daycareEmail: updatedDaycareEmail,
      });
      toast.success(`Өдөр өнжүүлэхийн и-мэйл амжилттай шинэчлэгдлээ.`);
    } catch {
      toast.error("Өдөр өнжүүлэхийн и-мэйл солиход алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 shadow-lg p-5 rounded-xl w-full sm:w-[300px] md:w-[48%]">
      <div className="flex items-center gap-2 text-sm">
        <EmailSvg /> Өдөр өнжүүлэх и-мэйл
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xs">Одоогийн и-мэйл хаяг:</p>
          <Input
            className="p-3"
            disabled
            value={user?.daycareEmail || ""}
            readOnly
          />
        </div>
        <div>
          <p className="text-xs">Шинэ и-мэйл хаяг:</p>
          <Input
            placeholder="И-мэйл хаягаа оруулна уу."
            onChange={(e) => setUpdatedDaycareEmail(e.target.value)}
            defaultValue={updatedDaycareEmail || ""}
          />
        </div>
        <Button
          disabled={updatedDaycareEmail === ""}
          className="bg-[#5da19e] text-white hover:bg-[#4d827f]"
          onClick={handleChangeDayCareEmail}
        >
          {loading ? <LoadingSvg /> : "И-мэйл шинэчлэх"}
        </Button>
      </div>
    </div>
  );
};
