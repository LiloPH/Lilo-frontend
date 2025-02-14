import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import SideBar from "../components/common/SideBar";
import "../index.css";

type RouterContext = {
  isAuthenticated: boolean;
};

const RootComponent = () => {
  return (
    <>
      <SideBar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-4">
          <Outlet />
        </div>
      </main>
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});
