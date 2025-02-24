import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/map/$routeId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/map/$routeId"!</div>;
}
