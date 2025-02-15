import {
  Sidebar,
  SidebarHeader,
  SidebarGroup,
  SidebarContent,
  SidebarFooter,
  SidebarMenuItem,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarGroupLabel,
  useSidebar,
} from "../ui/sidebar";
import logo from "@/assets/Lilo.png";
import icon from "@/assets/icon.png";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaHome, FaRoute, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "@tanstack/react-router";

const items = [
  {
    label: "Home",
    icon: <FaHome />,
    href: "/dashboard",
  },
  {
    label: "Routes",
    icon: <FaRoute />,
    href: "/dashboard/routes",
  },
  {
    label: "Profile",
    icon: <FaUser />,
    href: "/dashboard/profile",
  },
];

const SideBar = () => {
  const user = {
    name: "Sample User",
    email: "user@example.com",
  };

  const { state } = useSidebar();

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <Sidebar collapsible="icon" className=" ">
      <SidebarHeader>
        <img src={logo} alt="logo" width={100} height={100} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.href}
                      className="hover:bg-yellow-100 transition-colors duration-200"
                      activeProps={{
                        className: "bg-yellow-100 border-l-4 border-yellow-400",
                      }}
                      activeOptions={{ exact: true }}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <div
              className={`flex items-center space-x-4 p-2 ${state === "collapsed" ? "justify-center" : ""}`}
            >
              <Avatar>
                <AvatarImage src={icon} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {state !== "collapsed" && (
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
              )}
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="hover:bg-yellow-400 transition duration-200 w-full p-2"
                >
                  <FaSignOutAlt />
                  {state !== "collapsed" && <span>Logout</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
