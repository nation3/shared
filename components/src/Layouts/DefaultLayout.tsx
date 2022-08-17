import { ViewGridIcon } from "@heroicons/react/outline";
import React from "react";
import { DefaultSidebar } from "../Sidebars";

export default function DefaultLayout({
  sidebar,
}: {
  sidebar: React.ReactElement;
}) {
  return (
    <div className="mx-auto bg-n3bg font-display">
      <div className="h-screen">{sidebar}</div>
    </div>
  );
}
