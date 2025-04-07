import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Palmtree } from "lucide-react";

export const Route = createFileRoute("/_authentication/dashboard/tours")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tours Management</h1>
        <Button onClick={() => navigate({ to: "/dashboard/create-tour" })}>
          <Palmtree /> Create Tour
        </Button>
      </div>
    </div>
  );
}
