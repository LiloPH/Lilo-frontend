/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createRootRouteWithContext,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../index.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SideBar, Header } from "@/components";
import "@/api/axios";

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
}

type RouterContext = {
  isAuthenticated: () => Promise<boolean>;
  user: User | null | undefined;
};

const RootComponent = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      <SidebarProvider>
        {isDashboardRoute && <SideBar />}
        <main className="flex-1 overflow-auto">
          <Header />
          <div>
            <Outlet />
          </div>
        </main>

        {/* <TanStackRouterDevtools initialIsOpen={false} /> */}
      </SidebarProvider>
    </>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});
