/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { DropzoneOptions } from "react-dropzone";
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
import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/extension/file-uploader";
import { Image, TreePalm, X } from "lucide-react";
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
import { Upload, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import useImageUpload from "@/hooks/useImageUpload";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const tourSchema = z.object({
  tour_name: z.string().min(1),
  price: z.number(),
  description: z.string().min(1),
  summary: z.string(),
  cover_image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Max image size is 5MB.",
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
    }),
});

const AddTour = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { uploadFiles, loading, error } = useImageUpload();

  const form = useForm<z.infer<typeof tourSchema>>({
    resolver: zodResolver(tourSchema),
  });

  const dropzoneOptions = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif"],
    },
    multiple: true,
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
  } satisfies DropzoneOptions;

  const onSubmit = async (data: z.infer<typeof tourSchema>) => {
    try {
      setIsSubmitting(true);
      if (!files || files.length === 0) {
        toast.error("No images");
        setIsSubmitting(false);
        return;
      }

      const url = await uploadFiles(data.cover_image ?? null);
      const images = await uploadFiles(files);

      const payload = {
        cover_image: url[0],
        images,
        name: data.tour_name,
        description: data.description,
        summary: data.summary,
        price: data.price,
      };

      const tour = await axios.post("/tour", payload);

      console.log(tour.data);

      setIsSubmitting(false);

      form.reset();
      setFiles(null);
      setOpen(false);

      toast.success("Tour added successfully!");
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    toast.error(error);
  }

  const getFilePreview = (file: File, index: number) => {
    if (file.type.startsWith("image/")) {
      return (
        <div className="relative w-full h-full">
          <img
            src={URL.createObjectURL(file) || "/placeholder.svg"}
            alt={file.name}
            className="object-cover rounded-md w-full h-full"
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 rounded-md p-2">
        <Image className="h-8 w-8 text-gray-500" />
        <p className="text-xs mt-1 text-center truncate w-full">{file.name}</p>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <TreePalm className="mr-2" />
          Add Tour
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="flex gap-4 mb-4">
            <TreePalm /> Add Tour
          </DialogTitle>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
            >
              <FormField
                control={form.control}
                name="tour_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Tour Name"
                        type="text"
                        {...field}
                      />
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
                      <Input
                        type="number"
                        placeholder="Enter Price"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
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
                      <Input
                        placeholder="Enter tour description"
                        type="text"
                        {...field}
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
                        placeholder="Enter Summary"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cover_image"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...fieldProps}
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && files.length > 0) {
                            onChange(files[0]);
                          } else {
                            onChange(undefined);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="col-span-1 md:col-span-2">
                <FormLabel>Images</FormLabel>
                <FileUploader
                  value={files}
                  onValueChange={setFiles}
                  dropzoneOptions={dropzoneOptions}
                  className="w-full space-y-4"
                >
                  <FileInput className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Upload className="h-8 w-8 text-gray-500" />
                      <p className="text-sm font-medium">
                        Drag and drop files here or click to browse
                      </p>
                      <p className="text-xs text-gray-500">
                        Support for images, PDFs, and text files up to 5MB
                      </p>
                    </div>
                  </FileInput>
                  {files && files.length > 0 && (
                    <FileUploaderContent className="grid grid-cols-3 gap-2 mt-4">
                      {files.map((file, i) => (
                        <FileUploaderItem
                          key={i}
                          index={i}
                          className="relative h-24 p-0 rounded-md overflow-hidden group"
                        >
                          {getFilePreview(file, i)}
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                const newFiles = [...files];
                                newFiles.splice(i, 1);
                                setFiles(newFiles.length > 0 ? newFiles : null);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </FileUploaderItem>
                      ))}
                    </FileUploaderContent>
                  )}
                </FileUploader>
              </div>

              <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full md:w-auto px-8"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddTour;
