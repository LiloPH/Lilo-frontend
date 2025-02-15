/* eslint-disable @typescript-eslint/no-unused-vars */
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../index.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SideBar from "@/components/common/SideBar";
type RouterContext = {
  isAuthenticated: boolean;
};

const RootComponent = () => {
  return (
    <>
      <SidebarProvider>
        <SideBar />
        <main className="flex-1 overflow-auto p-4">
          <SidebarTrigger />
          <Outlet />
        </main>
        {/* <TanStackRouterDevtools initialIsOpen={false} /> */}
      </SidebarProvider>
    </>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});
