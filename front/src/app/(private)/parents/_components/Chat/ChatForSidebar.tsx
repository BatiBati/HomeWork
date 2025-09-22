import { Dispatch, SetStateAction } from "react";

type Props = {
  setSelectedSidebar: Dispatch<SetStateAction<number>>;
};
export const ChatForSidebar = ({ setSelectedSidebar }: Props) => {
  return (
    <div
      className="w-full  bg-blue-300 cursor-pointer"
      onClick={() => {
        setSelectedSidebar(3);
      }}
    >
      Мессеж
    </div>
  );
};
