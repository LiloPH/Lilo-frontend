import { HiX, HiViewGrid } from "react-icons/hi";
import NavItem from "./NavItem";
import logoFull from "../../assets/Lilo.png";
import { FaBars } from "react-icons/fa";
import { useSidebarStore } from "../../store/sidebarStore";
import { FaRoute, FaUser } from "react-icons/fa6";

interface SideBarProps {
  isMobile?: boolean;
}

const SideBar = ({ isMobile }: SideBarProps) => {
  const {
    isExpanded,
    isMobileOpen,
    toggleExpanded,
    toggleMobile,
    closeMobile,
  } = useSidebarStore();

  const navItems = [
    { to: "/dashboard/", icon: <HiViewGrid />, label: "Dashboard" },
    { to: "/dashboard/routes", icon: <FaRoute />, label: "Routes" },
    { to: "/dashboard/user", icon: <FaUser />, label: "User" },
  ];

  const sidebarClass = isMobile
    ? `fixed top-0 left-0 h-full w-64 bg-white transform transition-transform duration-200 ease-in-out ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      } z-50`
    : `${
        isExpanded ? "w-72" : "w-20"
      } h-screen bg-white transition-all duration-300 border-r`;

  return (
    <>
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobile}
        />
      )}

      <div className={sidebarClass}>
        {!isMobile && (
          <button
            onClick={toggleExpanded}
            className="absolute right-2 top-2 p-2 rounded-lg hover:bg-gray-100"
          >
            <FaBars
              className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                !isExpanded && "rotate-180"
              }`}
            />
          </button>
        )}

        <div className="px-4 py-3">
          <div className="flex items-center justify-between w-full">
            <img
              src={logoFull}
              alt="Logo"
              className="w-32 transition-all duration-300"
            />
            {isMobile && (
              <button
                onClick={toggleMobile}
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
      </div>
    </>
  );
};

export default SideBar;
