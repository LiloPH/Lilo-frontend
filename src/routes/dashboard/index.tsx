import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { analyticsQuery } from "../../options/analyticsQuery";
export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isFetching, error } = useQuery(analyticsQuery());

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Total Users: {data?.data?.users}</div>;
}
