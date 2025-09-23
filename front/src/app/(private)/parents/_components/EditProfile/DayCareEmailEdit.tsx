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

  const handleChandeDayCareEmail = async () => {
    if (!user) {
      return;
    }
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
    <div className="flex flex-col gap-5 shadow-2xl p-5 rounded-xl w-full">
      <div className="flex  items-center gap-2">
        <EmailSvg /> Өдөр өнжүүлэхийн и-мэйл
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-[12px]">Одоогийн и-мэйл</p>
          <Input disabled value={user?.email || ""} readOnly />
        </div>
        <Input
          onChange={(e) => setUpdatedDaycareEmail(e.target.value)}
          defaultValue={user?.daycareEmail || ""}
        />
        <Button onClick={handleChandeDayCareEmail}>
          {loading ? <LoadingSvg /> : "Хадгалах"}
        </Button>
      </div>
    </div>
  );
};
