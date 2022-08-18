import React from "react";
import { ExternalLinkIcon } from "@heroicons/react/outline";

export default function ExternalNavButton({
  url,
  icon,
  name,
}: {
  url: string;
  icon: React.ReactElement;
  name: string;
}) {
  return (
    <li className="relative py-2 font-display">
      <a
        href={url}
        className="flex items-center p-2 py-4 text-base text-gray-800 rounded-lg cursor-pointer hover:bg-gray-200"
      >
        <div className="px-3">{icon}</div>
        {name}
        <ExternalLinkIcon className="absolute w-5 h-5 opacity-50 right-4" />
      </a>
    </li>
  );
}
