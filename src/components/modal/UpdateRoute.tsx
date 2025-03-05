/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface routeData {
  routeNo: number;
  routeName: string;
  routeColor: string;
  _id: string;
}

const formSchema = z.object({
  routeno: z.number().min(0),
  route_name: z.string().min(1),
  route_color: z.string(),
});

export default function UpdateRoute({
  routeNo,
  routeName,
  routeColor,
  _id,
}: routeData) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      routeno: routeNo,
      route_name: routeName,
      route_color: routeColor,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast.success("Route updated successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to update route. Please try again.");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Update Route</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="routeno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Route No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter route number"
                      type="number"
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
              name="route_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Route Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter route name" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="route_color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Route Color</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} className="h-10 w-full" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <DialogTrigger asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogTrigger>
              <Button type="submit">Update Route</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
