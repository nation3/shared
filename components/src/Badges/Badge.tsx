import React from 'react'

export default function Badge({
  text,
  bgColor,
  textColor,
}: {
  text: string
  bgColor: string
  textColor: string
}) {
  return (
    <span
      className={`bg-${bgColor} text-${textColor} font-semibold mr-2 px-2.5 py-0.5 rounded`}
    >
      {text}
    </span>
  )
}
