// Example: EditOwnEmail (same pattern applies to PhoneEdit & DayCareEmailEdit)
"use client";

import { useAuth } from "@/provider/AuthProvider";
import { useState } from "react";
import { api } from "../../../../../../axios";
import { toast } from "sonner";
import { EmailSvg } from "@/components/svg/EmailSvg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSvg } from "@/components/svg/LoadingSvg";

export const EditOwnEmail = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [updateOwnEmail, setUpdateOwnEmail] = useState("");

  const handleChangeOwnEmail = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await api.patch(`/user/${user?._id}`, {
        ...user,
        email: updateOwnEmail,
      });
      toast.success(`И-мэйл хаяг амжилттай шинэчлэгдлээ.`);
    } catch {
      toast.error("И-мэйл хаяг солиход алдаа гарлаа");
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
          <Input className="p-3" disabled value={user?.email || ""} readOnly />
        </div>
        <div>
          <p className="text-xs">И-мэйл хаяг:</p>
          <Input
            placeholder="И-мэйл хаягаа оруулна уу."
            onChange={(e) => setUpdateOwnEmail(e.target.value)}
            defaultValue={user?.daycareEmail || ""}
          />
        </div>
        <Button
          disabled={updateOwnEmail === ""}
          className="bg-[#5da19e] text-white hover:bg-[#4d827f]"
          onClick={handleChangeOwnEmail}
        >
          {loading ? <LoadingSvg /> : "И-мэйл шинэчлэх"}
        </Button>
      </div>
    </div>
  );
};
