import React from 'react'
import Alert from './Alert'
import { InformationCircleIcon } from '@heroicons/react/solid'

export default function InfoAlert({
  message,
  icon,
}: {
  message: string
  icon?: React.ReactElement
}) {
  return (
    <Alert
      color="n3blue-500"
      text={message}
      className="bg-opacity-20 text-n3blue-500"
      icon={icon ?? <InformationCircleIcon className="w-5 h-5" />}
    />
  )
}
