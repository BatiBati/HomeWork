"use client";
import { useAuth } from "@/provider/AuthProvider";

export const SidebarParent = ({
  onSelectChild,
}: {
  onSelectChild: (id: string) => void;
}) => {
  const { user } = useAuth();

  return (
    <div className="p-6 border-[1px] w-fit rounded-xl ">
      <div className="flex flex-col gap-3">
        <div>{user?.firstName}</div>
        <div className="text-[12px]">
          <div className="font-semibold">Хүүхэд</div>
          {user?.children.map((child) => {
            return (
              <div
                key={child._id}
                onClick={() => onSelectChild(child._id)}
                className="cursor-pointer hover:underline"
              >
                {child.lastName}.{child.lastName}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
