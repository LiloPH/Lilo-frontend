import { HiX, HiViewGrid, HiMenu } from "react-icons/hi";
import NavItem from "./NavItem";
import logoFull from "../../assets/Lilo.png";
import { FaBars } from "react-icons/fa";
import { FaRoute, FaUser } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "@tanstack/react-router";

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  // Subscribe to route changes
  const currentRoute = router.state.location.pathname;
  const isDashboard = currentRoute.includes("dashboard");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Force re-render when route changes
    if (isDashboard) {
      setIsExpanded(true); // Reset sidebar state on dashboard entry
    }
  }, [currentRoute, isDashboard]);

  const navItems = [
    { to: "/dashboard/", icon: <HiViewGrid />, label: "Dashboard" },
    { to: "/dashboard/routes", icon: <FaRoute />, label: "Routes" },
    { to: "/dashboard/user", icon: <FaUser />, label: "User" },
  ];

  const sidebarClass = isMobile
    ? `fixed top-0 left-0 h-full w-full bg-white transform transition-transform duration-200 ease-in-out ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      } z-50`
    : `${
        isExpanded ? "w-72" : "w-20"
      } h-screen bg-white transition-all duration-300 border-r`;

  const handleLogout = async () => {
    await logout();
    router.navigate({ to: "/" });
  };

  if (!isDashboard) return null;

  return (
    <>
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50 px-4">
          <div className="h-full flex flex-row items-center justify-between">
            <img src={logoFull} alt="Logo" className="h-8" />
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <HiMenu className="text-xl" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={sidebarClass}>
        {!isMobile && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute right-2 top-2 p-2 rounded-lg hover:bg-gray-100"
          >
            <FaBars
              className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                !isExpanded && "rotate-180"
              }`}
            />
          </button>
        )}

        <div className="flex flex-col h-full px-4 py-3">
          <div>
            <div className="flex items-center justify-between w-full">
              <img
                src={logoFull}
                alt="Logo"
                className="w-32 transition-all duration-300"
              />
              {isMobile && (
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100"
                >
                  <HiX className="h-5 w-5 text-gray-500" />
                </button>
              )}
            </div>

            <nav className="mt-6 space-y-1">
              {navItems.map((item, index) => (
                <NavItem
                  key={index}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  isExpanded={isExpanded}
                />
              ))}
            </nav>
          </div>

          <div className="mt-auto pt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              <BiLogOut className="text-xl" />
              {isExpanded && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
