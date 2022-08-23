import React, { useState } from 'react'
import { SignInModal } from '../Modals'
import { Connector } from '../Types'
import Button from './Button'

export default function SignInButton({
  connectors,
  onConnect,
}: {
  connectors: Connector[]
  onConnect: (connector: Connector) => void
}) {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <Button label="Sign in" onClick={() => setModalOpen(true)} />

      {modalOpen && (
        <SignInModal
          onClose={() => setModalOpen(false)}
          onConnect={onConnect}
          connectors={connectors}
        />
      )}
    </>
  )
}
