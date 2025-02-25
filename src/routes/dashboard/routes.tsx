import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { routesQuery } from "@/options/adminQuery";
import { queryClient } from "@/lib/react-query";
import { DataTable } from "@/components/table/DataTable";
import RoutesColumns from "@/components/table/RoutesColumns";
import AddRoute from "@/components/modal/AddRoute";

export const Route = createFileRoute("/dashboard/routes")({
  loader: async () => {
    await queryClient.prefetchQuery(routesQuery());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useQuery(routesQuery());

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="py-4">
      <AddRoute />
      <DataTable
        columns={RoutesColumns()}
        data={Array.isArray(data?.data?.routes) ? data?.data?.routes : []}
      />
    </div>
  );
}
