import React from "react";
import { Link } from "@tanstack/react-router";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isExpanded: boolean;
}

const NavItem = ({ to, icon, label, isExpanded }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={`group relative flex items-center gap-4 p-2 hover:bg-gray-100 rounded-md ${
        !isExpanded ? "justify-center" : ""
      }`}
    >
      <span className="text-xl min-w-[1.25rem]">{icon}</span>
      {isExpanded ? (
        <span className="text-sm font-medium">{label}</span>
      ) : (
        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {label}
        </span>
      )}
    </Link>
  );
};

export default NavItem;
