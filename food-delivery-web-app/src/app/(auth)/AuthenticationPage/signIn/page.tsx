"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RightArrow } from "@/app/_components/assets/RightArrow";
import { useAuth } from "@/app/_providers/AuthProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .min(3, {
      message: "Username must be at least 2 characters.",
    })
    .email(),
  password: z.string().min(3, { message: "Character at least 3." }),
});

export default function Home() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { user, signIn } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (user?.role === "ADMIN") router.push("/AdminPage")
    if (step === 1) {
      setStep((prev) => prev + 1);
    }
    if (step === 2) {
      signIn(values.email, values.password);
      router.push("/");

    }
  }

  const handleNext = () => {

    setStep((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (step === 1) router.push("/");
    if (step === 2) setStep((prev) => prev - 1);
  };

  return (
    <div className="w-[416px] h-[288px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Button className="rotate-180" onClick={handlePrev}>
            <RightArrow width="20px" height="20px" />
          </Button>
          {step === 1 && (
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[24px] font-semibold">
                      Log in
                    </FormLabel>
                    <FormDescription>
                      Log in to enjoy your favorite dishes.
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        {...field}
                      />
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
                    <FormControl>
                      <Input placeholder="Password" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="underline">Forgot password ?</div>
            </div>
          )}

          <Button
            type="submit"
            variant="outline"
            className="w-full justify-center"
            onClick={handleNext}
          >
            Lets Go
          </Button>
          <div className="flex gap-3 justify-center">
            <p> Dont have an account?</p>
            <Link href={"/AuthenticationPage/signUp"}>
              <p className="text-blue-500 underline">Sign up</p>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
