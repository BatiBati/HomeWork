"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { LoadingSvg } from "../svg/LoadingSvg";
import { toast } from "sonner";
import { useState } from "react";
const loginSchema = z.object({
  email: z.string().min(2, {
    message: "Багадаа 2 утга оруулна уу.",
  }),
  password: z.string().min(3, { message: "Багадаа 3 үсэг оруулна уу." }),
});

export const LoginForm = () => {
  const { login, getMe } = useAuth();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      setLoading(true);
      const user = await login(values);

      // optional: fetch fresh data

      if (user.role === "parents") {
        router.push("/parents");
      } else {
        router.push("/teacher");
      }
      await getMe();
      toast.success("Амжилттай нэвтэрлээ.");
    } catch (error) {
      console.error(error);
      toast.error("Нэвтрэхэд алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="opacity-70">И-мэйл</FormLabel>
                <FormControl>
                  <Input placeholder="И-мэйл оруулна уу." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="opacity-70">Нууц үг</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Нууц үг оруулна уу."
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-[#61b3ae] text-white w-full hover:bg-[#50928e] hover:text-[white] cursor-pointer"
          >
            {/* Нэвтрэх */}
            {loading ? <LoadingSvg /> : "Нэвтрэх"}
          </Button>
        </form>
      </Form>
      <div className="w-full flex flex-col gap-2 ">
        <div className="border-[2px] p-3 rounded-xl">
          <span className="font-semibold"> Parents information</span>
          <div className="ml-[10px]">Email: tamirbulgan621@gmail.com</div>
          <div className="ml-[10px]">Password: 12345678</div>
        </div>
        <div className="border-[2px] p-3 rounded-xl">
          <span className="font-semibold"> Teacher information</span>
          <div className="ml-[10px]">Email: codecatalysts2025@gmail.com</div>
          <div className="ml-[10px]">Password: 12345678</div>
        </div>
      </div>
    </div>
  );
};
