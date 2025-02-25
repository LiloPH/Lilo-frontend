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
import { PlusCircle } from "lucide-react";

const formSchema = z.object({
  routeno: z.number().min(0),
  route_name: z.string().min(1),
  route_color: z.string(),
});

export default function AddRoute() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      routeno: 0,
      route_name: "",
      route_color: "#000000",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast.success("Route added successfully!");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to add route. Please try again.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Route
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Add New Route</DialogTitle>
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
              <Button type="submit">Add Route</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
