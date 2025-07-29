"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { EditSvg } from "./assets/EditSvg";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { DeleteFood } from "./DeleteFood";
import { EditFoodImage } from "./EditFoodImage";
import { UpdateFoodCategory } from "./UpdateFoodCategory";
import { Loader } from "lucide-react";
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
  image: z.string(),
});

type DefaultValuesType = {
  foodId: string;
  categoryId: string;
  categoryName: string;
  foodName: string;
  foodPrice: number;
  foodIngredients: string;
  foodImage: string;
  getFood: () => Promise<void>;
};

export const FoodEditButton = ({
  categoryId,
  foodId,
  foodName,
  foodPrice,
  foodIngredients,
  foodImage,
  getFood,
}: DefaultValuesType) => {
  const [deployedImageUrl, setDeployedImageUrl] = useState(foodImage);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: foodName,
      price: String(foodPrice),
      image: foodImage,
      ingredients: foodIngredients,
      category: categoryId,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const handleCreate = async () => {
      setLoading(true);
      try {
        await api.put(`/food/${foodId}`, {
          foodName: values.foodName,
          price: Number(values.price),
          ingredients: values.ingredients,
          image: deployedImageUrl,
          category: selectedCategoryId,
        });
        await getFood();
        location.reload();
        toast.success("Food updated succesfully.");
        setOpen(false);
      } catch (error) {
        console.error("Failed to update food", error);

        toast.error("Failed to update food.");
      } finally {
        setLoading(false);
      }
    };
    handleCreate();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full cursor-pointer">
          <EditSvg />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dishes info</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
              <FormField
                control={form.control}
                name="foodName"
                render={({ field }) => (
                  <FormItem className="">
                    <div className="flex gap-4">
                      <FormLabel className="w-[40%]">Dish name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter dish name" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-4">
                      <FormLabel className="w-[40%]">Dish category</FormLabel>
                      <FormControl>
                        <UpdateFoodCategory
                          categoryId={categoryId}
                          setSelectedCategoryId={setSelectedCategoryId}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ingredients"
                render={({ field }) => (
                  <FormItem className="">
                    <div className="flex gap-4">
                      <FormLabel className="w-[40%]">Ingredients</FormLabel>
                      <FormControl>
                        <div className="w-full">
                          <Input placeholder="Enter ingredients" {...field} />
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="">
                    <div className="flex gap-4">
                      <FormLabel className="w-[40%]">Enter price</FormLabel>
                      <FormControl className="h-full w-full flex justify-center">
                        <Input placeholder="Enter ingredients" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <EditFoodImage
                deployedImageUrl={deployedImageUrl}
                setDeployedImageUrl={setDeployedImageUrl}
              />
              <div className="flex justify-between">
                <DeleteFood foodId={foodId} getFood={getFood} />
                <DialogFooter>
                  <Button type="submit" disabled={deployedImageUrl === ""}>
                    {loading === false ? "Save changes" : <Loader />}
                  </Button>
                </DialogFooter>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
