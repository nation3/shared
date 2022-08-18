import React from "react";

export default function Alert({
  text,
  icon,
  color,
}: {
  text: string;
  icon?: React.ReactElement;
  color: string;
}) {
  return (
    <div
      className={`flex items-center justify-start w-full p-2 py-4 text-base font-medium rounded-2xl bg-${color}`}
    >
      {icon && <div className="px-3">{icon}</div>}
      {text}
    </div>
  );
}
