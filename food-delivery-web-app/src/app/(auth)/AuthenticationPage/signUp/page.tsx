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
import { toast } from "sonner";
import Link from "next/link";

import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z
  .object({
    email: z
      .string()
      .min(3, {
        message: "Username must be at least 2 characters.",
      })
      .email(),
    password: z.string().min(3, { message: "Character at least 3." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Those password didn't match, Try again.",
    path: ["confirmPassword"],
  });

export default function Home() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (step === 1) {
      setStep((prev) => prev + 1);
    }
    if (step === 2) {
      signUp(values.email, values.password);
      toast.success("Created user. Log in and HF :)")
      router.push("/AuthenticationPage/signIn");
    }
  }

  const handleNext = () => {
    if (step === 1) {
      setStep((prev) => prev + 1);
    }
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[24px] font-semibold">
                    Create your account
                  </FormLabel>
                  <FormDescription>
                    Sign up to explore your favorite dishes.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[24px] font-semibold">
                      Create a strong password
                    </FormLabel>
                    <FormDescription>
                      Create a strong password with letters, numbers.
                    </FormDescription>
                    <FormControl>
                      {showPassword === true ? (
                        <Input placeholder="Confirm"
                          {...field}
                        />) : (
                        <Input placeholder="Confirm"
                          {...field}
                          type="password"
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {showPassword === true ? (
                        <Input placeholder="Confirm"
                          {...field}
                        />) : (
                        <Input placeholder="Confirm"
                          {...field}
                          type="password"
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-2 w-full ">

                <Checkbox id="terms" onClick={() => setShowPassword(!showPassword)} />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show password
                </label>
              </div>
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
            <p> Already have an account?</p>
            <Link href={"/AuthenticationPage/signIn"}>
              <p className="text-blue-500 underline">Log in</p>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
