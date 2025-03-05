import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { routesQuery } from "@/options/adminQuery";
import { queryClient } from "@/lib/react-query";
import { DataTable } from "@/components/table/DataTable";
import RoutesColumns from "@/components/table/RoutesColumns";
import AddRoute from "@/components/modal/AddRoute";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/dashboard/routes")({
  loader: async () => {
    await queryClient.prefetchQuery(routesQuery());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useQuery(routesQuery());
  const [globalFilter, setGlobalFilter] = useState("");

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-72">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search routes..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8 w-full"
          />
        </div>
        <AddRoute />
      </div>
      <DataTable
        columns={RoutesColumns()}
        data={Array.isArray(data?.data?.routes) ? data?.data?.routes : []}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
}
