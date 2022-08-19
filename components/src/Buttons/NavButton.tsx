import React from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";

export default function NavButton({
  route,
  icon,
  name,
  onRoute,
  isActive,
}: {
  route: string;
  icon: React.ReactElement;
  name: string;
  onRoute: (href: string) => void;
  isActive?: boolean;
}) {
  return (
    <li className="relative py-2 font-display">
      <a
        onClick={() => onRoute(route)}
        className={`flex items-center p-2 py-4 text-base rounded-lg cursor-pointer ${
          isActive ? "bg-n3blue text-white" : "hover:bg-gray-200 text-gray-800"
        }`}
      >
        <div className="px-3">{icon}</div>
        {name}
        <ChevronRightIcon className="absolute w-5 h-5 opacity-50 right-4" />
      </a>
    </li>
  );
}
