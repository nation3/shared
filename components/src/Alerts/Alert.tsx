import React from 'react'

export default function Alert({
  text,
  icon,
  color,
  className,
}: {
  text: string
  icon?: React.ReactElement
  color: string
  className?: string
}) {
  return (
    <div
      className={`flex items-center justify-start w-full p-5 py-4 text-base font-medium rounded-2xl bg-${color} ${className}`}
    >
      {icon && <div className="pr-3">{icon}</div>}
      {text}
    </div>
  )
}
