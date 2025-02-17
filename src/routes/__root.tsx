/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createRootRouteWithContext,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../index.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import SideBar from "@/components/common/SideBar";
import "@/api/axios";

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
}

type RouterContext = {
  isAuthenticated: boolean;
  user: User | null | undefined;
};

const RootComponent = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      <SidebarProvider>
        {isDashboardRoute && <SideBar />}
        <main className="flex-1 overflow-auto pl-4">
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
