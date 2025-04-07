/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Image, TreePalm, X, Loader2, Upload } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import CloudinaryUploadWidget from "../extension/upload-widget";

const tourSchema = z.object({
  tour_name: z.string().min(1),
  price: z.coerce.number().nonnegative(),
  description: z.string().min(1),
  summary: z.string(),
});

const CreateTour = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[] | null>(null);

  const form = useForm<z.infer<typeof tourSchema>>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      tour_name: "",
      price: 0,
      description: "",
      summary: "",
    },
  });

  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUD_PRESET;

  const onSubmit = (data: z.infer<typeof tourSchema>) => {
    if (!coverImage || coverImage === null) {
      toast.error("Cover Image cannot be null");
      return;
    }

    console.log("Form Data:", data);
    toast.success("Tour Created Successfully");
    setOpen(false);
  };

  const clearForm = () => {
    form.reset();
    setCoverImage(null);
    setImages(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <TreePalm className="mr-2" />
          Add Tour
        </Button>
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className="bg-white"
        style={{ zIndex: 10 }}
      >
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="tour_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter tour name" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter price" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter summary" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <CloudinaryUploadWidget
                uwConfig={{
                  cloudName,
                  uploadPreset,
                }}
                onImagesUploaded={(result, secure_url) => {
                  console.log(secure_url);
                }}
                cloudName={cloudName}
              />
              <FormMessage className="text-red-500" />
            </FormItem>

            <DialogFooter className="flex gap-2">
              <Button type="submit">Create Tour</Button>
              <DialogClose asChild onClick={clearForm}>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTour;
