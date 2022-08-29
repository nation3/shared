import { ViewGridIcon } from '@heroicons/react/outline'
import React from 'react'
import { DefaultSidebar } from '../Sidebars'

export default function DefaultLayout({
  sidebar,
  children,
}: {
  sidebar: React.ReactElement
  children?: React.ReactElement | React.ReactElement[]
}) {
  return (
    <div className="flex mx-auto bg-n3bg font-display">
      <div className="h-screen">{sidebar}</div>
      <div className="flex flex-col items-center w-full h-screen p-24 overflow-y-scroll font-body">
        {children}
      </div>
    </div>
  )
}
