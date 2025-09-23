"use client";
import { useAuth } from "@/provider/AuthProvider";
import { Dispatch, SetStateAction, useState } from "react";
import { ChildrenForSidebar } from "./children/ChildrenForSidebar";
import { EditProfileForSidebar } from "./EditProfile/EditProfileForSidebar";
import { ChatForSidebar } from "./Chat/ChatForSidebar";
import { User } from "lucide-react";

type Props = {
  setSelectedSidebar: Dispatch<SetStateAction<number>>;
};

export const Sidebar = ({ setSelectedSidebar }: Props) => {
  const { user: authUser } = useAuth();
  const [active, setActive] = useState<number>(1);

  const handleClick = (index: number) => {
    setActive(index);
    setSelectedSidebar(index);
  };

  const menuItems = [
    { id: 1, component: ChildrenForSidebar },
    { id: 2, component: EditProfileForSidebar },
    { id: 3, component: ChatForSidebar },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-indigo-500 to-blue-600 text-white shadow-xl rounded-r-2xl p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">
              {authUser?.firstName} {authUser?.lastName}
            </h2>
            <p className="text-sm text-white/80">{authUser?.role}</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map(({ id, component: Component }) => (
            <div
              key={id}
              onClick={() => handleClick(id)}
              className={`rounded-xl p-3 transition cursor-pointer ${
                active === id
                  ? "bg-white/20 shadow-md"
                  : "hover:bg-white/10 text-white/80"
              }`}
            >
              <Component setSelectedSidebar={setSelectedSidebar} />
            </div>
          ))}
        </nav>
      </div>

      <div className="text-xs text-white/70 text-center">
        © {new Date().getFullYear()} Homework Hub
      </div>
    </div>
  );
};
