import React from 'react'
import Alert from './Alert'
import { XCircleIcon } from '@heroicons/react/outline'

export default function ErrorAlert({
  errorMessage,
  icon,
}: {
  errorMessage: string
  icon?: React.ReactElement
}) {
  return (
    <Alert
      color="red-400"
      text={errorMessage}
      icon={icon ?? <XCircleIcon className="w-5 h-5" />}
    />
  )
}
