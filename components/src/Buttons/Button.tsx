import React from "react";
import { motion } from "framer-motion";

export default function Button({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      type="button"
      whileTap={{ scale: 0.95 }}
      disabled={disabled}
      className="flex items-center justify-center w-full p-2 py-3 text-base font-medium text-white transition rounded-lg cursor-pointer font-primary bg-n3blue hover:bg-n3blue-500"
    >
      {label}
    </motion.button>
  );
}
