import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard")({
  beforeLoad(ctx) {
    const { isAuthenticated, user } = ctx.context;
    if (!isAuthenticated || !user) {
      throw redirect({ to: "/" });
    }
  },
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div>
      <h1>Header</h1>
      <Outlet />
    </div>
  );
}
