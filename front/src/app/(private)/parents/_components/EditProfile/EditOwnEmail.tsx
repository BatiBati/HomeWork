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
    if (!user) {
      return;
    }
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
    <div className="flex flex-col gap-5 shadow-2xl p-5 rounded-xl w-[50%]">
      <div className="flex  items-center gap-2 text-[13px]">
        <EmailSvg /> Өдөр өнжүүлэх и-мэйл
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-[12px]">Одоогийн и-мэйл хаяг:</p>
          <Input className="p-5" disabled value={user?.email || ""} readOnly />
        </div>
        <div>
          <p className="text-[12px]">И-мэйл хаяг:</p>
          <Input
            placeholder="И-мэйл хаягаа оруулна уу."
            onChange={(e) => setUpdateOwnEmail(e.target.value)}
            defaultValue={user?.daycareEmail || ""}
          />
        </div>
        <Button
          disabled={updateOwnEmail === ""}
          className="bg-[#5da19e] text-white hover:bg-[#4d827f] hover:text-white cursor-pointer"
          onClick={handleChangeOwnEmail}
        >
          {loading ? <LoadingSvg /> : "И-мэйл шинэчлэх"}
        </Button>
      </div>
    </div>
  );
};
