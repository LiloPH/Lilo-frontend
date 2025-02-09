import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/map")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/map"!</div>;
}
