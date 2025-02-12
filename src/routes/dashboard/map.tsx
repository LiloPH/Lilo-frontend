import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/map")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/map"!</div>;
}
