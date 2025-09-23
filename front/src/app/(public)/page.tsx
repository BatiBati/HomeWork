import { LoginForm } from "@/components/loginForm/LoginForm";
import { SchoolSvg } from "@/components/svg/SchoolSvg";

export default function Home() {
  return (
    <div className="bg-[#f2f2f2] h-screen w-screen">
      <div className="h-full w-full flex justify-center items-center">
        <div className="bg-white flex flex-col justify-center p-5 rounded-xl gap-6 border-[1px]">
          <div className="w-full flex justify-center ">
            <div className="w-fit h-fit p-6 rounded-full bg-[#e6faf9]">
              <SchoolSvg />
            </div>
          </div>
          <div className="w-full flex justify-center px-6">
            <div className="font-semibold text-[24px] opacity-70">
              Homework-Hub
            </div>
          </div>
          <div className="opacity-50 px-6">
            Бүртгэлтэй хаягаар нэвтэрч орно уу.
          </div>
          <div className="px-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
