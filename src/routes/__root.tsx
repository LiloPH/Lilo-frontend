import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import SideBar from "../components/common/SideBar";
import { HiMenu } from "react-icons/hi";
import "../index.css";
import logoFull from "../assets/Lilo.png";
import { useSidebarStore } from "../store/sidebarStore";
import { useAuthStore } from "../store/authStore";
import "../api/axios";

type RouterContext = {
  isAuthenticated: boolean;
};

const RootComponent = () => {
  const toggleMobile = useSidebarStore((state) => state.toggleMobile);
  const isMobile = useSidebarStore((state) => state.isMobile);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const pathname = window.location.pathname;
  const isDashboard =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  return (
    <>
      {!isMobile && isAuthenticated && isDashboard && <SideBar />}
      {isMobile && isAuthenticated && isDashboard && <SideBar isMobile />}

      {isMobile && isAuthenticated && isDashboard && (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-10 px-4">
          <div className="h-full flex flex-row items-center justify-between">
            <img src={logoFull} alt="Logo" className="h-8" />
            {isAuthenticated && (
              <button
                onClick={toggleMobile}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <HiMenu className="text-xl" />
              </button>
            )}
          </div>
        </div>
      )}

      <main className={`flex-1 overflow-auto ${isMobile ? "mt-16" : ""}`}>
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
