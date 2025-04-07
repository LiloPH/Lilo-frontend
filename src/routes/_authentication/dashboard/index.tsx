import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authentication/dashboard/")({
  component: RouteComponent,
  loader: () => {
    throw redirect({
      to: "/dashboard/analytics",
    });
  },
});

function RouteComponent() {
  return null;
}
