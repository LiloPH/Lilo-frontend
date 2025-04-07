import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { refreshToken } from "@/api/auth";

export const Route = createFileRoute("/_authentication")({
  beforeLoad: async (content) => {
    const isAuth = await content.context.isAuthenticated();

    if (!isAuth) {
      const { status } = await refreshToken();

      if (!status) {
        throw redirect({ to: "/" });
      }
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
