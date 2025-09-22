"use client";
import { LoadingSvg } from "@/components/svg/LoadingSvg";
import { useAuth } from "@/provider/AuthProvider";
import { DayCare } from "./DayCare";

type Props = {
  onSelectChild: (id: number) => void;
  selectedChildId: number;
};

export const SidebarParent = ({ onSelectChild, selectedChildId }: Props) => {
  const { user: authUser, loading } = useAuth();

  return (
    <div className="p-6 border-[1px] w-fit rounded-xl ">
      <div className="flex flex-col gap-3">
        {loading ? (
          <LoadingSvg />
        ) : (
          <>
            <div>{authUser?.firstName ?? ""}</div>
            <div>
              <div className="font-semibold">Хүүхэд</div>
              {(authUser?.children ?? []).map((child, i) => (
                <div
                  key={child._id}
                  onClick={() => onSelectChild(i + 1)}
                  className="cursor-pointer hover:underline"
                >
                  {child.lastName}
                </div>
              ))}
            </div>
          </>
        )}

        {selectedChildId === 3 && <DayCare onSelectChild={onSelectChild} />}
      </div>
    </div>
  );
};
