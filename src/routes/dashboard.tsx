import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  beforeLoad(ctx) {
    const isAuthenticated = ctx.context.isAuthenticated;
    if (!isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
});
