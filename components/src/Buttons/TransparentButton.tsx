import React from 'react'

export default function Button({
  label,
  children,
  disabled,
  onClick,
}: {
  label?: string
  children?: (string | React.ReactElement)[]
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className="flex items-center justify-start w-full p-2 py-3 text-base font-medium transition rounded-lg cursor-pointer hover:bg-gray-200 focus:bg-n3blue"
    >
      {label}
      {children}
    </button>
  )
}
