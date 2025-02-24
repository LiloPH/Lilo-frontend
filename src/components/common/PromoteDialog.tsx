import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  confirmation: z
    .string()
    .min(3, "Confirmation text must be at least 3 characters"),
});

interface User {
  _id: string;
  name: string;
  email: string;
  picture: string;
}

export function PromoteDialog({ user }: { user: User }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmation: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted", {
      id: user._id,
      ...data,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-white hover:scale-105 transition duration-200"
        >
          Promote to Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="confirmation"
              render={({ field }) => (
                <FormItem className="p-2">
                  <FormLabel>
                    To confirm, type{" "}
                    <span className="font-bold">{user.name}-PROMOTE</span> in
                    the input box below.
                  </FormLabel>
                  <FormControl className="mt-4">
                    <Input
                      {...field}
                      className={
                        errors.confirmation
                          ? "border-2border-red-500 outline-red-500"
                          : ""
                      }
                      placeholder="Type the confirmation text"
                      autoFocus
                    />
                  </FormControl>
                  {errors.confirmation && (
                    <FormMessage className="text-red-500">
                      {errors.confirmation.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-4 w-full bg-yellow-400 hover:bg-yellow-200 transition duration-200"
              size="lg"
            >
              Confirm Promotion
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
