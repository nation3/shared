import React from "react";

export default function Button({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center w-full p-2 py-3 text-base font-medium text-white transition rounded-lg cursor-pointer bg-n3blue hover:bg-n3blue-500 focus:scale-90"
    >
      {label}
    </button>
  );
}
