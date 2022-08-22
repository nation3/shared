import { ChevronDownIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import Blockies from 'react-blockies'
import AccountModal from '../Modals/AccountModal'
import { Account } from '../Types'

export default function AccountButton({
  account,
  onDisconnect,
}: {
  account: Account
  onDisconnect?: () => void
}) {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        className="relative flex items-center justify-start w-full p-2 py-3 text-gray-800 transition rounded-lg cursor-pointer text-base-400 hover:bg-gray-200"
        onClick={() => setModalOpen(true)}
      >
        <div className="px-3">
          <Blockies
            seed={account?.address}
            size={12}
            className="overflow-hidden rounded-full cursor-pointer"
          />
        </div>
        {account.ensName
          ? account.ensName
          : `${((account.address as string) ?? '').substring(
              0,
              6
            )}...${account.address.slice(-4)}`}
        <ChevronDownIcon className="absolute w-5 h-5 opacity-50 right-4" />
      </button>

      {modalOpen && (
        <AccountModal
          account={account}
          onClose={() => setModalOpen(false)}
          onDisconnect={onDisconnect}
        />
      )}
    </>
  )
}
