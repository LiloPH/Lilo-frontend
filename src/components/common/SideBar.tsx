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
  SidebarTrigger,
} from "../ui/sidebar";
import logo from "@/assets/Lilo.png";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaHome, FaRoute, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/authStore";
import { Skeleton } from "../ui/skeleton";

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
    label: "Users",
    icon: <FaUser />,
    href: "/dashboard/user",
  },
];

const SideBar = () => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const { state } = useSidebar();

  const handleLogout = async () => {
    await logout(() => {
      navigate({ to: "/" });
    });
  };

  return (
    <>
      <Sidebar collapsible="icon">
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
                          className:
                            "bg-yellow-100 border-l-4 border-yellow-400",
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
              {state === "collapsed" && <SidebarTrigger />}
              <div
                className={`flex items-center space-x-4 p-2 ${state === "collapsed" ? "justify-center" : ""}`}
              >
                {user ? (
                  <>
                    <Avatar>
                      <AvatarImage src={user?.picture} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {state !== "collapsed" && (
                      <div className="flex flex-col">
                        <span className="font-medium">{user?.name}</span>
                        <span className="text-xs text-gray-500">
                          {user?.email}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <Skeleton className="rounded-full w-9 h-9" />
                    {state !== "collapsed" && (
                      <div className="flex flex-col space-y-2">
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-3 w-[160px]" />
                      </div>
                    )}
                  </>
                )}
              </div>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleLogout}
                    variant="outline"
                    className=" hover:bg-yellow-400 transition duration-200 w-full "
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
      {state !== "collapsed" && <SidebarTrigger />}
    </>
  );
};

export default SideBar;
