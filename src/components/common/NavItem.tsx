import React from "react";
import { Link } from "@tanstack/react-router";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ href, icon, label }: NavItemProps) => {
  return (
    <Link
      to={href}
      activeProps={{
        className: "bg-yellow-200 border-l-4 border-yellow-400",
      }}
      activeOptions={{ exact: true }}
      className="group flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-yellow-200"
    >
      <span className="text-xl min-w-[1.25rem]">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export default NavItem;
