import { Input } from "@/components/ui/input";
import { api } from "../../../../../../axios";
import { useAuth } from "@/provider/AuthProvider";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoadingSvg } from "@/components/svg/LoadingSvg";

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
    <div className="flex gap-3">
      <Input
        className="w-fit"
        onChange={(e) => setUpdatedDaycareEmail(e.target.value)}
        defaultValue={user?.daycareEmail || ""}
      />
      <Button onClick={handleChandeDayCareEmail}>
        {loading ? <LoadingSvg /> : "Хадгалах"}
      </Button>
    </div>
  );
};
