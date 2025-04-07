import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { usersQuery } from "@/options/adminQuery";
import { queryClient } from "@/lib/react-query";
import { UserColumns, TableSkeleton } from "@/components";
import { DataTable } from "@/components/table/DataTable";
import { toast } from "react-toastify";

export const Route = createFileRoute("/_authentication/dashboard/user")({
  loader: async () => {
    await queryClient.prefetchQuery(usersQuery());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useQuery(usersQuery());

  if (error) {
    toast.error("Error fetching users");
  }

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="container p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users Management</h1>
      </div>
      <DataTable
        columns={UserColumns({
          users: Array.isArray(data?.data) ? data.data : [],
        })}
        data={Array.isArray(data?.data) ? data.data : []}
      />
    </div>
  );
}
