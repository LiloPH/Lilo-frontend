import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/routes")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/routes"!</div>;
}
