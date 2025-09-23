"use client";
import { useAuth } from "@/provider/AuthProvider";
import { Dispatch, SetStateAction, useState } from "react";
import { ChildrenForSidebar } from "./children/ChildrenForSidebar";
import { EditProfileForSidebar } from "./EditProfile/EditProfileForSidebar";
import { ChatForSidebar } from "./Chat/ChatForSidebar";
import { User, Menu } from "lucide-react";

type Props = { setSelectedSidebar: Dispatch<SetStateAction<number>> };

export const Sidebar = ({ setSelectedSidebar }: Props) => {
  const { user: authUser } = useAuth();
  const [active, setActive] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();
  const handleClick = (index: number) => {
    setActive(index);
    setSelectedSidebar(index);
    if (window.innerWidth < 768) setIsOpen(false); // auto close on mobile
  };

  const menuItems = [
    { id: 1, component: ChildrenForSidebar },
    { id: 2, component: EditProfileForSidebar },
    { id: 3, component: ChatForSidebar },
  ];

  return (
    <>
      {/* Hamburger button */}
      <div
        className={`fixed top-4 z-50 md:hidden transition-all duration-300`}
        style={{
          left: isOpen ? "17.5rem" : "0.5rem", // move further to the right when open
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded" // removed bg-white
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen z-40 bg-[#61b3ae] text-white p-6 flex flex-col justify-between transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:w-64 md:h-full`}
      >
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">
                {authUser?.firstName?.[0].toUpperCase()}.{authUser?.lastName}
              </h2>
              <p className="text-sm text-white/80">Эвэг эх</p>
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
          <div className="w-full flex justify-center mt-10">
            <div
              className="flex items-center justify-center gap-3 w-[85%] px-4 py-2 rounded-xl cursor-pointer  bg-white/10 hover:bg-white/20 transition"
              onClick={signOut}
            >
              Гарах
            </div>
          </div>
        </div>

        <div className="text-xs text-white/70 text-center mt-auto">
          © {new Date().getFullYear()} Homework Hub
        </div>
      </div>
    </>
  );
};
