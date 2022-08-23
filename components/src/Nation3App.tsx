import React from 'react'

export default function Nation3App({
  children,
}: {
  children: React.ReactElement | React.ReactElement[]
}) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      />
      {children}
    </>
  )
}
