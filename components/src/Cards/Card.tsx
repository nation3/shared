import React from 'react'

export default function Card({
  children,
  className,
}: {
  children: React.ReactElement | React.ReactElement[]
  className?: string
}) {
  return (
    <div className={`p-6 bg-white rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  )
}
