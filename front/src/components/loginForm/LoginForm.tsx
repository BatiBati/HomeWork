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
const loginSchema = z.object({
  email: z.string().min(2, {
    message: "Багадаа 2 утга оруулна уу.",
  }),
  password: z.string().min(3, { message: "Багадаа 3 үсэг оруулна уу." }),
});

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
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
          <Button className="bg-indigo-600 text-white w-full hover:bg-indigo-500 hover:text-[white] cursor-pointer">
            Нэвтрэх
          </Button>
        </form>
      </Form>
    </div>
  );
};
