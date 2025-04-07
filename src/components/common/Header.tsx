import React from "react";
import logo from "@/assets/Lilo.png";
import { useLocation } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const Header = () => {
  const { toggleSidebar, state } = useSidebar();
  const location = useLocation();

  const isDashboardRoute = location.pathname.includes("dashboard");

  return (
    <header
      className={clsx(
        "flex flex-row items-center justify-between py-2 md:py-4 px-4 bg-amber-200",
        { "flex-row": isDashboardRoute }
      )}
    >
      {isDashboardRoute && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="transition duration-200"
        >
          {state === "collapsed" ? (
            <Menu className="w-4 h-4" />
          ) : (
            <X className="w-4 h-4" />
          )}
        </Button>
      )}
      <img
        src={logo}
        alt="logo"
        className="aspect-auto w-15 h-10 md:w-20 md:h-10 "
      />
      {!isDashboardRoute && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </header>
  );
};

export default Header;
