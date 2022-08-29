import React from 'react'

export default function Card({
  children,
}: {
  children: React.ReactElement | React.ReactElement[]
}) {
  return <div className="p-6 bg-white rounded-lg shadow-md ">{children}</div>
}
