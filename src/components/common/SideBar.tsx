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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaHome, FaRoute, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/authStore";
import { Skeleton } from "../ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
          <img
            src={logo}
            alt="logo"
            width={state === "collapsed" ? 50 : 100}
            height={state === "collapsed" ? 50 : 100}
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
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
                        </TooltipTrigger>
                        {state === "collapsed" && (
                          <TooltipContent side="right">
                            <p>{item.label}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarGroup>
            <SidebarGroupContent>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`flex items-center gap-2 ${state === "collapsed" ? "justify-start ml-[0.3rem]" : ""}`}
                    >
                      {user ? (
                        <>
                          <Avatar
                            className={
                              state === "collapsed" ? "size-[1.2rem]" : "size-9"
                            }
                          >
                            <AvatarImage src={user?.picture} alt={user?.name} />
                            <AvatarFallback>
                              {state === "collapsed" ? (
                                <Skeleton className="rounded-full size-[1.2rem] bg-gray-300" />
                              ) : (
                                user?.name?.charAt(0)
                              )}
                            </AvatarFallback>
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
                          <Avatar>
                            <Skeleton
                              className={`rounded-full ${state === "collapsed" ? "w-6 h-6" : "w-9 h-9"} bg-gray-300`}
                            />
                          </Avatar>
                          {state !== "collapsed" && (
                            <div className="flex flex-col gap-2">
                              <Skeleton className="w-24 h-3 bg-gray-300" />
                              <Skeleton className="w-24 h-3 bg-gray-300" />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </TooltipTrigger>
                  {state === "collapsed" && user && (
                    <TooltipContent side="right">
                      <div className="flex flex-col">
                        <span className="font-medium">{user?.name}</span>
                        <span className="text-xs text-gray-500">
                          {user?.email}
                        </span>
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
              <SidebarMenu>
                <SidebarMenuItem>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          onClick={handleLogout}
                          variant="outline"
                          className=" hover:bg-yellow-400 transition duration-200 w-full "
                        >
                          <FaSignOutAlt />
                          {state !== "collapsed" && <span>Logout</span>}
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      {state === "collapsed" && (
                        <TooltipContent side="right">
                          <p>Logout</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default SideBar;
