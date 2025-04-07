/* eslint-disable @typescript-eslint/no-unused-vars */
import { createFileRoute } from "@tanstack/react-router";
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
import { Image, TreePalm, X, Loader2, Upload, Palmtree } from "lucide-react";
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
import CloudinaryUploadWidget from "@/components/extension/upload-widget";

export const Route = createFileRoute("/_authentication/dashboard/create-tour")({
  component: RouteComponent,
});

const tourSchema = z.object({
  tour_name: z.string().min(1),
  price: z.coerce.number().nonnegative(),
  description: z.string().min(1),
  summary: z.string(),
});

function RouteComponent() {
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
      toast.error("Cover Image should contain atleast 1");
      return;
    }

    if (!images || images.length === 0) {
      toast.error("Image should contain atleast 1");
      return;
    }

    const payload = {
      ...data,
      coverImage: coverImage,
      images: images,
    };

    console.log(payload);
    toast.success("Tour Created Successfully");
  };

  const clearForm = () => {
    form.reset();
    setCoverImage(null);
    setImages(null);
  };

  return (
    <div className="p-6">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 "
        >
          {/* Left Column - Text Inputs */}
          <div className="flex flex-col gap-4">
            <div className="">
              <h2 className="text-xl font-semibold mb-2">Tour Details</h2>
              <div className="border-b border-gray-200 "></div>
            </div>

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
                    <Textarea
                      placeholder="Enter description"
                      {...field}
                      className="min-h-[120px]"
                    />
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
                    <Textarea
                      placeholder="Enter summary"
                      {...field}
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          {/* Right Column - Image Inputs */}
          <div className="flex flex-col gap-4">
            <div className="">
              <h2 className="text-xl font-semibold mb-2">Tour Images</h2>
              <div className="border-b border-gray-200 "></div>
            </div>

            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormDescription>
                This will be the main image shown for your tour. Select one
                high-quality image.
              </FormDescription>
              <div className="mb-2">
                {coverImage && (
                  <div className="relative w-full max-w-md mb-4">
                    <img
                      src={coverImage}
                      alt="Cover preview"
                      className="w-full h-48 object-cover rounded-lg shadow-sm"
                      loading="lazy"
                    />
                    <button
                      type="button"
                      onClick={() => setCoverImage(null)}
                      className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
              <CloudinaryUploadWidget
                uwConfig={{
                  cloudName,
                  uploadPreset,
                  multiple: false,
                }}
                onImagesUploaded={(result, secure_url) => {
                  if (secure_url && secure_url.length > 0) {
                    setCoverImage(secure_url[0]);
                  }

                  console.log(secure_url);
                }}
                cloudName={cloudName}
              />
              <FormMessage className="text-red-500" />
            </FormItem>

            <FormItem className="mt-4">
              <FormLabel>Gallery Images</FormLabel>
              <FormDescription>
                Add additional images to showcase your tour. You can select
                multiple images.
              </FormDescription>
              {images && images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setImages(images.filter((_, i) => i !== index))
                        }
                        className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <CloudinaryUploadWidget
                uwConfig={{
                  cloudName,
                  uploadPreset,
                  multiple: true,
                }}
                onImagesUploaded={(result, secure_url) => {
                  if (secure_url && secure_url.length > 0) {
                    setImages(secure_url);
                  }
                  console.log(secure_url);
                }}
                cloudName={cloudName}
              />
              <FormMessage className="text-red-500" />
            </FormItem>
          </div>

          {/* Form Buttons - Full Width */}
          <div className="flex gap-4 mt-6">
            <Button variant="outline" onClick={clearForm} className="flex-1">
              Reset
            </Button>
            <Button type="submit" className="flex-1">
              Create Tour
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
