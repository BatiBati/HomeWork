"use client";
import { PlusSvg } from "@/app/_components/assets/PlusSvg";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { AddFoodImage } from "./AddFoodImage";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../../../axios";

const formSchema = z.object({
  foodName: z
    .string()
    .min(3, { message: "Food name must be at least 3 characters." })
    .max(50, { message: "Max length must be 20 characters" }),
  price: z
    .string()
    .min(1, { message: "Food price must be at least 1 characters." }),

  ingredients: z
    .string()
    .min(3, { message: "Ingredients must be at least 3 characters." }),
  category: z.string(),
});
type CategoryNameType = {
  categoryName: string;
  categoryId: string;
  getFood: () => Promise<void>;
};

export const FoodAddComp = ({
  categoryName,
  categoryId,
  getFood,
}: CategoryNameType) => {
  const [deployedImageUrl, setDeployedImageUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: "aaa",
      price: "0",
      // image: "",
      ingredients: "asdad",
      category: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const handleCreate = async () => {
      setLoading(true);
      try {
        await api.post(`/food`, {
          foodName: values.foodName,
          price: Number(values.price),
          ingredients: values.ingredients,
          image: deployedImageUrl,
          category: categoryId,
        });
        await getFood();
        toast.success("New dish is being added to the menu.");
        form.reset({
          foodName: "",
          price: "",
          ingredients: "",
          category: "",
        });
        setOpen(false);
      } catch (error) {
        console.error("Failed to create food", error);
        toast.error("Failed to create food.");
      } finally {
        setLoading(false);
        setDeployedImageUrl("");
      }
    };

    handleCreate();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-[270px] h-[241px] bg-white rounded-[20px] overflow-hidden flex flex-col justify-center p-4 gap-5 border-dashed border-[3px] border-[#ef4444]"
        >
          <div className="rounded-full p-4 bg-red-500">
            <PlusSvg stroke="white " />
          </div>
          <div className="text-[14px] font-medium w-fit">
            Add new Dish to {categoryName}
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new Dish to Appetizers</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="foodName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Food name</FormLabel>
                        <FormControl>
                          <Input placeholder="Type food name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Food price</FormLabel>
                        <FormControl>
                          <Input placeholder="Type food name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="ingredients"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-4 relative h-[86px]">
                      <FormLabel>Ingredients</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="List of ingredients"
                          {...field}
                          className="h-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <AddFoodImage
                deployedImageUrl={deployedImageUrl}
                setDeployedImageUrl={setDeployedImageUrl}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={deployedImageUrl === ""}
                  className="bg-black text-white"
                >
                  {loading === false ? "Add dish" : <Loader />}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
