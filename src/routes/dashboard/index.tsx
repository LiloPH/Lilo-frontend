import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { analyticsQuery } from "@/options/adminQuery";
import { toast } from "react-toastify";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useQuery(analyticsQuery());

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="animate-pulse bg-gray-200 rounded-lg p-6 w-[200px]">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    toast.error("Error fetching analytics");
  }

  return (
    <div className="container py-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg p-6 shadow-sm ">
          <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
          <p className="mt-4 text-lg">Total Users: {data?.data?.users}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
          <p className="mt-4 text-lg">Total Users: {data?.data?.users}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
          <p className="mt-4 text-lg">Total Users: {data?.data?.users}</p>
        </div>
      </div>
    </div>
  );
}
